import { NextResponse } from 'next/server'
import { PriceServiceConnection } from '@pythnetwork/price-service-client'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const priceServiceConnection = new PriceServiceConnection('https://hermes.pyth.network', { priceFeedRequestConfig: { binary: true } }
)

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  // Get box data from Supabase
  let { data: boxes, error } = await supabase
    .from('boxes')
    .select('*')
    // .limit(1)
    // .single()
  if (error || !boxes) {
    return NextResponse.json({ error: 'Box not found', message: error }, { status: 404 })
  }
  // console.log("boxes.length ", boxes.length)
  try {
    // Get all prices in parallel
    for (let i = 0; i < boxes.length; i++) {
    // for (let i = 0; i < 1; i++) {
      let box = boxes[i];
      // let pricePromises = [];
      let feed_ids = []
      let tokenListLength = box.token_list.length;
      for (let j = 0; j < tokenListLength; j++) {
        feed_ids.push(box.token_list[j].feed_id)
      }
      // console.log("feed id", feed_ids)
      const priceFeeds = await priceServiceConnection.getLatestPriceFeeds(feed_ids);
      // console.log("price feeeeeedds ", priceFeeds)
      if (priceFeeds) {
        for (let j = 0; j < tokenListLength; j++) {
          let price = priceFeeds[j].getPriceUnchecked();
          // Convert price to actual value and then to decimal 18
          // Current: price.price * 10^(price.expo) -> actual price
          // Then multiply by 10^18 for desired decimals
          let normalizedPrice = (BigInt(price.price) * BigInt(10 ** (18 + Number(price.expo)))).toString();
          boxes[i].token_list[j].pricePerToken = normalizedPrice;
          boxes[i].token_list[j].totalUSDValue = (BigInt(normalizedPrice) * BigInt(boxes[i].token_list[j].amount) / BigInt(10 ** 18)).toString();
          if (boxes[i].token_list[j].totalUSDValue) {
            const formattedUSDValue = BigInt(boxes[i].token_list[j].totalUSDValue);
            boxes[i].token_list[j].formattedUSDValue = (Number(formattedUSDValue) / 10 ** 18).toString();
          }

          if (boxes[i].token_list[j].pricePerToken) {
            const formattedPricePerToken = BigInt(boxes[i].token_list[j].pricePerToken);
            boxes[i].token_list[j].formattedPricePerToken = (Number(formattedPricePerToken) / 10 ** 18).toString();
          }
        }
        let boxPrice = BigInt(0);
        for (let j = 0; j < tokenListLength; j++) {
          let tokenAmount = BigInt(boxes[i].token_list[j].amount);
          let tokenPrice = BigInt(boxes[i].token_list[j].pricePerToken);
          boxPrice += (tokenAmount * tokenPrice)/ BigInt(10 ** 18);
        }
        boxes[i].boxPrice = boxPrice.toString();
      }

      // Convert boxPrice from decimal 18 to readable format
      if (boxes[i].boxPrice) {
        const rawPrice = BigInt(boxes[i].boxPrice);
        boxes[i].formattedBoxPrice = (Number(rawPrice) / 10 ** 18).toString();
      }

    }

    console.log("boxes ", boxes)
    // console.log("boxes ", boxes[0].token_list)

    return NextResponse.json({
      boxes: boxes
    })
  } catch (error) {
    console.error('Error fetching prices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    )
  }
}
