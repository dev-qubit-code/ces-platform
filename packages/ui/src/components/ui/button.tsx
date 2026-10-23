import {Button as ButtonPrimitive} from '@base-ui/react/button';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from './../../lib/utils';

const buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/80',
      outline: 'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
      ghost: 'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
      destructive: 'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
      link: 'text-primary underline-offset-4 hover:underline',
      'website-primary': 'px-4! py-5 bg-[#1670B8] shadow-[0_6px_0_#0E4E84,inset_10px_10px_20px_rgba(255,255,255,0.258824),inset_-10px_-12px_22px_rgba(6,58,104,0.4)] rounded-[22px] text-white',
      'website-white': 'px-4! py-5 bg-[#EEF5FA] shadow-[0_5px_0_#C7DAEA,inset_4px_4px_8px_rgba(255,255,255,0.8)] rounded-[15px] text-[#1C2A39]',
      'website-secondary': 'bg-website-secondary text-website-secondary-foreground hover:bg-website-secondary/80',
      'website-destructive': 'bg-website-destructive text-website-destructive-foreground hover:bg-website-destructive/80',
      'website-ice-cream': 'px-4! py-5 bg-[#F7D774] drop-shadow-[0_5px_1px_#CFA52A] shadow-md shadow-[#BE8C0A47] rounded-2xl text-black',
      'website-vanilla': 'px-4! py-5 bg-[#FFB79C] drop-shadow-[0_5px_1px_#DB7653] shadow-md shadow-[#D7644147] rounded-2xl text-black',
      'website-purple': 'px-4! py-5 bg-[#5B3FC4] drop-shadow-[0_5px_1px_#3E2896] shadow-md shadow-[#FFFFFF33] rounded-2xl text-white'
    },
    size: {
      default: 'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2',
      xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3",
      sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3.5",
      lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2',
      icon: 'size-8',
      'icon-xs': "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
      'icon-sm': 'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
      'icon-lg': 'size-9'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

function Button({className, variant = 'default', size = 'default', ...props}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot='button' className={cn(buttonVariants({variant, size, className}))} {...props} />;
}

export {Button, buttonVariants};
