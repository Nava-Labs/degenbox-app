import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/lib/utiles';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-black gap-2 whitespace-nowrap rounded-md text-xl font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary-400 text-white border border-primary-600 border-b-[8px] hover:bg-primary-500 hover:translate-y-0 active:border-b active:translate-y-1 transition-all duration-75 ease-in-out',
        destructive:
          'bg-[#F5C2C3] text-[#72191A] border border-b-4 border-[#72191A] hover:bg-[#F5C2C3]/90 hover:translate-y-0 active:border-b active:translate-y-1 transition-all duration-75 ease-in-out',
        outline:
          'bg-white text-primary-700 border border-primary-600 border-b-4 hover:bg-slate-100 hover:translate-y-0 active:border-b active:translate-y-1 transition-all duration-75 ease-in-out',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'w-full h-16 px-4 py-2 rounded-2xl',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-11 rounded-lg border-b-4 active:translate-y-0.5 rounded-2xl',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
