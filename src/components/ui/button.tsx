import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const buttonVariants=cva('inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f9dff] disabled:opacity-50',{variants:{variant:{default:'bg-[#ff745e] text-white hover:bg-[#ff8b78]',outline:'border border-white/20 bg-white/5 text-white hover:bg-white/10'},size:{default:'',icon:'h-11 w-11 p-0'}},defaultVariants:{variant:'default',size:'default'}});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants>{asChild?:boolean}
const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(({className,variant,size,asChild=false,...props},ref)=>{const Comp=asChild?Slot:'button';return <Comp ref={ref} className={cn(buttonVariants({variant,size,className}))}{...props}/>}); Button.displayName='Button';
export {Button,buttonVariants};
