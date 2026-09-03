import * as React from 'react'; import { cn } from '@/lib/utils';
export type TextareaProps=React.TextareaHTMLAttributes<HTMLTextAreaElement>;
const Textarea=React.forwardRef<HTMLTextAreaElement,TextareaProps>(({className,...props},ref)=><textarea ref={ref} className={cn('flex min-h-28 w-full resize-y rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#8f9dff] focus:ring-2 focus:ring-[#8f9dff]/25',className)} {...props}/>); Textarea.displayName='Textarea'; export {Textarea};
