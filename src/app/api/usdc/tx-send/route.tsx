import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET all transaction statuses
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('transaction_statuses')
      .select('*')
      .eq('status', 'pending')  // Add this filter

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
