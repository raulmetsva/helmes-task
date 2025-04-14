import { cn } from '@/lib/utils';

export const H1 = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn('text-[36px] leading-[36px] font-semibold tracking-normal text-black', className)}
    {...props}
  />
);
