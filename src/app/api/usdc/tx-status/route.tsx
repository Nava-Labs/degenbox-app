import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { ethers } from 'ethers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Add these constants at the top with other imports
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
const CONTRACT_ABI = [
  'function swapAndSend(bytes memory attestation)'
];

// Add this helper function
async function callSwapAndSend(attestation: string) {
  const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

  const tx = await contract.swapAndSend(attestation);
  return await tx.wait();
}

// GET all transaction statuses
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('transaction_statuses')
      .select('*')
      .eq('status', 'pending')

    if (!data) return;
    
    // Create array of promises for all pending transactions
    const updatePromises = data.map(async (transaction) => {
      try {
        const response = await fetch(
          `https://iris-api.circle.com/messages/6/${transaction.tx_hash}`
        );
        const attestationData = await response.json();
        
        if (attestationData.messages?.[0]?.attestation) {
          // Return both the supabase update promise and the transaction data
          callSwapAndSend(attestationData.messages?.[0]?.attestation) //no need to await
          return {
            updatePromise: supabase
              .from('transaction_statuses')
              .update({ status: 'completed' })
              .eq('id', transaction.id),
            transaction
          };
        }
        return null;
      } catch (fetchError) {
        console.error(`Error checking attestation for tx_hash ${transaction.tx_hash}:`, fetchError);
        return null;
      }
    });

    // Wait for all fetch operations to complete
    const results = await Promise.all(updatePromises);
    
    // Update local data array for successful attestations
    results.forEach(result => {
      if (result) {
        const { transaction } = result;
        transaction.status = 'completed';
      }
    });

    if (error) throw error
    return NextResponse.json(data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }




}

// POST new transaction status
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data, error } = await supabase
      .from('transaction_statuses')
      .insert(body)
      .select()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

// PUT/UPDATE transaction status
export async function PUT(request: Request) {
  try {
    const { id, ...updateData } = await request.json()
    const { data, error } = await supabase
      .from('transaction_statuses')
      .update(updateData)
      .eq('id', id)
      .select()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

// DELETE transaction status
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const { error } = await supabase
      .from('transaction_statuses')
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ message: 'Successfully deleted' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
