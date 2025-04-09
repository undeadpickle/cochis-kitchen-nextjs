import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  titleClass?: string;
  subtitleClass?: string;
  hasDecoration?: boolean;
}

const SectionTitle = ({
  subtitle,
  title,
  className,
  align = 'center',
  titleClass,
  subtitleClass,
  hasDecoration = true
}: SectionTitleProps) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('mb-12', alignmentClasses[align], className)}>
      {subtitle && (
        <span
          className={cn(
            'subtitle inline-block text-cochi-accent mb-3 animate-slide-down-fade',
            subtitleClass
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          'font-display text-3xl md:text-4xl lg:text-5xl font-bold relative animate-slide-up-fade',
          align === 'center' && 'mx-auto',
          titleClass
        )}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
