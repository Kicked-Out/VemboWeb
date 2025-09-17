import React from 'react';
import { cn } from '../../lib/utils';
import '../../styles/settings/components/button.css';

interface VemboButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const VemboButton = React.forwardRef<HTMLButtonElement, VemboButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn('vbtn', `vbtn--${variant}`, `vbtn--${size}`, className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

VemboButton.displayName = 'VemboButton';

export default VemboButton;
