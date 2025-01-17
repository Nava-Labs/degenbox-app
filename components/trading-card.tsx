import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BoxIcon from '@/public/icons/box.svg';
import CopyIcon from '@/public/icons/copy.svg';

const BOX_DATA = [
  {
    name: "Murad's Big Bet",
    box_balance: 5,
    box_address: 'xion1d5n809spzdg73vgc6c7gq9zkk87c5xunqe6yla',
    box_logo_url: 'https://twitter.com/MustStopMurad/photo',
    box_price: 0.01,
    box_balance_in_usd: 0.05,
    average_entry: 0.001,
  },
  {
    name: 'The Big 5',
    box_balance: 3,
    box_address: 'xion10nt859yvg2hhc687u440r98c64m8pmnv0wsg9w',
    box_logo_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROjfDTghEmMns99jBtOkpQrfBN19Xfw4W2Kg&s',
    box_price: 0.05,
    box_balance_in_usd: 0.15,
    average_entry: 0.08,
  },
];

export function TradingCard() {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const copyAddress = () => {
    navigator.clipboard.writeText('0xbF8A...C637');
  };

  return (
    <>
      {BOX_DATA.map((item) => (
        <Card key={item.box_address} className="w-full p-3 mt-4">
          <div className="flex justify-between mb-5">
            <div className="flex w-full justify-between gap-1 items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primary-100 size-12 flex items-center justify-center rounded-lg overflow-hidden">
                  <BoxIcon
                    src="/icons/box.svg"
                    className="w-8 h-8 stroke-primary-600"
                    alt="Box icon"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <h2 className="text-lg text-primary-800 font-bold">
                      {item.name}
                    </h2>
                    <span className="h-5 w-7 font-bold text-xs bg-[#C2E6F5] text-primary-900 rounded-full text-center align-middle border border-primary-900">
                      x{item.box_balance}
                    </span>
                  </div>
                  <div
                    onClick={copyAddress}
                    className="flex items-center text-sm text-primary-200 font-bold"
                  >
                    <span className="truncate max-w-32">
                      {item.box_address}
                    </span>
                    <CopyIcon className="w-4 h-4 !text-primary-200" />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary-900">
                  ${item.box_balance_in_usd}
                </div>
                <div className="text-xs text-primary-200 font-bold">
                  ${item.box_price} each
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-primary-900 text-xs font-bold self-end">
              <span>Avg. Entry: </span>
              <span>${item.box_price}</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-1 items-center justify-end space-x-2">
                <Button
                  className="text-lg px-2 h-8 w-8"
                  variant={'outline'}
                  size="sm"
                  onClick={() => decrementQuantity()}
                >
                  -
                </Button>
                <div className="font-bold text-lg text-primary-900">
                  {quantity}
                </div>
                <Button
                  className="text-sm px-2 h-8 w-8"
                  variant={'outline'}
                  size="sm"
                  onClick={() => incrementQuantity()}
                >
                  +
                </Button>
              </div>
              <Button
                className="text-md px-4"
                variant={'destructive'}
                size="lg"
              >
                Sell {quantity} Box
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
