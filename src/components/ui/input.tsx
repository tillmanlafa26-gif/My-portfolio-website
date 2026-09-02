import * as React from 'react';
import { cn } from '@/lib/utils';
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
const Input=React.forwardRef<HTMLInputElement,InputProps>(({className,type,...props},ref)=><input type={type} className={cn('flex min-h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#8f9dff] focus:ring-2 focus:ring-[#8f9dff]/25 disabled:opacity-50',className)} ref={ref} {...props}/>);
Input.displayName='Input'; export { Input };
