import { NextResponse } from 'next/server'
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'

// Dummy data to simulate boxes database
const boxes = {
  '1': {
    name: 'DeFi Blue Chips',
    assets: ['BTC', 'ETH', 'SOL'],
    amounts: [0.01, 0.15, 1.0],
    addresses: [
      'GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU', // BTC/USD
      'JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB', // ETH/USD
      'H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG'  // SOL/USD
    ]
  },
  '2': {
    name: 'Stablecoin Mix',
    assets: ['USDT', 'USDC', 'DAI'],
    amounts: [33.33, 33.33, 33.34],
    addresses: [
      'Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD', // USDT/USD
      '5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7', // USDC/USD
      'GqmV7VMDvRePY5tqdhvWpLwLB7yTigYmwHEh5rgiQ3J7'  // DAI/USD
    ]
  }
}

// Replace dummy getPythPrice with real Pyth integration
const getPythPrice = async (pythPriceId: string) => {
  const connection = new EvmPriceServiceConnection(
    'https://hermes.pyth.network'  // Use mainnet endpoint
  )
  
  try {
    const priceFeeds = await connection.getLatestPriceFeeds([pythPriceId])
    if (!priceFeeds || priceFeeds.length === 0) {
      throw new Error('Price feed not found')
    }
    
    const price:any = priceFeeds[0]
    console.log("ini price ", price);
    return price * Math.pow(10, -price.expo)
  } catch (error) {
    console.error(`Error fetching price for ${pythPriceId}:`, error)
    return 0
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id || !boxes[id as keyof typeof boxes]) {
    return NextResponse.json(
      { error: 'Box not found' },
      { status: 404 }
    )
  }

  const box = boxes[id as keyof typeof boxes]
  let totalPrice = 0

  // Modified price calculation loop
  for (let i = 0; i < box.assets.length; i++) {
    const price = await getPythPrice(box.addresses[i])
    totalPrice += price * box.amounts[i]
  }

  return NextResponse.json({
    id,
    name: box.name,
    assets: box.assets,
    amounts: box.amounts,
    totalPrice: totalPrice
  })
}
