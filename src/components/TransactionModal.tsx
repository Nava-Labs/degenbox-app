import { Button } from '@/components/ui/button';
import { DialogDescription } from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Spinner from '@/public/spinner.svg';
import { useEffect, useState } from 'react';

export function TransactionModal({ txHash }: { txHash?: `0x${string}` }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (txHash) {
      setOpen(true);
    }
  }, [txHash]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="sm:max-w-[425px]">
        <DrawerHeader>
          <h1 className="font-black text-center text-4xl h4-shadow text-primary-200 leading-none">
            Processing Transaction
          </h1>
          <DialogDescription className="font-bold mx-6">
            You can leave the page if you want. The transaction will keep
            processing.
          </DialogDescription>
        </DrawerHeader>
        <Spinner className="flex h-32 w-32 mx-auto text-primary-300 my-8" />
        <DrawerFooter className="flex items-center p-2">
          <Link href={`https://www.cctpscan.xyz/tx/${txHash}`} target="_blank">
            <Button className="text-lg">
              Check transaction on explorer{' '}
              <ExternalLink className="w-10 h-10" />
            </Button>
          </Link>
          <Button
            className="text-lg text-primary-600 h-10"
            variant={'link'}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
