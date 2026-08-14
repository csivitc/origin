'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import SectionHeader from './SectionHeader';
import AsciiBackground from './AsciiBackground';
import Image from 'next/image';

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const spotlightCards = [
    { num: '01', title: 'TITLE SPONSOR', subtitle: 'STITCH', logo: '/assets/stitch.png', asciiVariant: 'dragonfly' as const, btnLabel: 'VIEW', link: 'https://www.stitch.co/', isPrimaryOrange: false },
    { num: '02', title: 'POWERED BY', subtitle: 'ELEVENLABS', logo: '/assets/eleven-labs.png', asciiVariant: 'globe' as const, btnLabel: 'VIEW', link: 'https://elevenlabs.io/', isPrimaryOrange: false },
    { num: '03', title: 'TOOLING PARTNER', subtitle: 'CODECRAFTERS', logo: '/assets/code_crafters.png', asciiVariant: 'matrix' as const, btnLabel: 'VIEW', link: 'https://codecrafters.io/', isPrimaryOrange: false },
    { num: '04', title: 'INFRASTRUCTURE', subtitle: 'NEXUS', logo: '/assets/nexusx.jpeg', asciiVariant: 'dots' as const, btnLabel: 'VIEW', link: 'https://www.nexusxpos.com/', isPrimaryOrange: false },
  ];

  useEffect(() => {
    // Removed scroll reveal effect
  }, []);

  return (
    <section ref={sectionRef} id="sponsors" className="py-16 md:py-24 border-b border-[#2A2A2A] relative overflow-hidden bg-[#050505]">
      <AsciiBackground variant="dots" opacity={0.04} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">
        <SectionHeader secCode="SEC-05" numeral="05" title="SPONSORS" subtitle="BACKED BY PREMIER INSTITUTIONS & VENTURE INFRASTRUCTURE BUILDERS" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#2A2A2A] bg-[#070707] my-8 md:my-12 shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {spotlightCards.map((card, idx) => (
            <div key={idx} ref={el => { cardRefs.current[idx] = el; }} className="flex flex-col border-b md:border-b-0 border-r border-[#2A2A2A] last:border-r-0 group bg-[#070707] hover:bg-[#0A0A0A] transition-colors">
              <div className="p-2 md:p-4 flex items-center justify-between border-b border-[#1A1A1A]">
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#FF4D1C] shrink-0" />
                <span className="font-mono-custom text-[9px] md:text-xs text-[#8A8A8A] tracking-widest">{card.num}</span>
                <span className="font-mono-custom text-[9px] md:text-xs text-[#3A3A3A] group-hover:text-[#FF4D1C] transition-colors">+</span>
              </div>
              <div className="relative w-full h-[160px] md:h-[280px] flex flex-col justify-end p-3 md:p-6 overflow-hidden">
                <AsciiBackground variant={card.asciiVariant} opacity={0.3} />
                <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center pt-4 pb-8 md:pt-8 md:pb-16 px-4 md:px-6">
                  <div className="relative w-full max-w-[100px] md:max-w-[180px] h-16 md:h-24"><Image src={card.logo} alt={card.subtitle} fill className="object-contain opacity-90 drop-shadow-2xl" /></div>
                </div>
                <div className="relative z-20 text-center flex flex-col items-center"><span className="font-sans font-bold text-[10px] md:text-sm uppercase text-[#F2F0EB] tracking-wider mb-0.5 md:mb-1">{card.title}</span><span className="font-mono-custom text-[8px] md:text-xs text-[#8A8A8A] tracking-widest uppercase">{card.subtitle}</span></div>
              </div>
              <div>
                <a href={card.link} target="_blank" rel="noopener noreferrer" className="w-full py-2.5 md:py-4 px-2 md:px-4 bg-[#0A0A0A] hover:bg-[#121212] hover:text-[#FF4D1C] border-t border-[#2A2A2A] text-[#F2F0EB] font-mono-custom font-bold text-[8px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase flex items-center justify-between transition-colors cursor-pointer group/btn">
                  <span className="mx-auto pl-2 md:pl-4">{card.btnLabel}</span>
                  <span className="font-mono-custom text-[9px] md:text-xs text-[#8A8A8A] group-hover/btn:text-[#FF4D1C] group-hover/btn:translate-x-1 transition-all">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
