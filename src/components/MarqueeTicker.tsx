import React from 'react';

interface MarqueeTickerProps {
  text?: string;
  className?: string;
  speed?: 'normal' | 'fast' | 'slow';
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  text = 'GANDHI CHOWK · VARANGAON · PREMIUM STREETWEAR · EST. 1994',
  className = 'bg-[#fff9ed] text-[#1d1c14] border-y border-[#1d1c14]'
}) => {
  // Repeat text block to ensure seamless continuous ticker loop
  const repeatArray = [0, 1, 2, 3, 4, 5];

  return (
    <div
      className={`w-full overflow-hidden py-2.5 font-mono-custom text-xs uppercase tracking-widest flex items-center select-none ${className}`}
    >
      <div className="animate-marquee gap-8 items-center">
        {repeatArray.map((i) => (
          <React.Fragment key={i}>
            <span>{text}</span>
            <span className="text-[#a53c1b]">·</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
