'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import SectionHeader from './SectionHeader';
import AsciiBackground from './AsciiBackground';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem { id: string; code: string; category: 'REGISTRATION' | 'LOGISTICS' | 'TEAMS' | 'TRACKS'; question: string; answer: string; }

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqs: FaqItem[] = [
    { id: 'q-01', code: 'Q01', category: 'REGISTRATION', question: 'Is there any registration fee for CSI ORIGIN 2026?', answer: 'No. Registration for CSI ORIGIN 2026 is 100% free of cost for all participants. Food, high-speed WiFi, developer swag, and 24-hour workspace facilities at VIT Chennai are provided free to selected teams.' },
    { id: 'q-02', code: 'Q02', category: 'TEAMS', question: 'Who is eligible to participate? Can non-VIT students apply?', answer: 'Yes! CSI ORIGIN 2026 is a nationwide hackathon open to undergraduate, postgraduate, and diploma students from all universities, colleges, and institutes across India (both VIT and non-VIT students).' },
    { id: 'q-03', code: 'Q03', category: 'TEAMS', question: 'What is the required team size?', answer: 'Teams must consist of 2 to 4 members. Solo participation is not permitted to ensure collaborative engineering dynamics under real-time constraints.' },
    { id: 'q-04', code: 'Q04', category: 'LOGISTICS', question: 'Is CSI ORIGIN 2026 an in-person hackathon?', answer: 'Yes. Round 1 (PPT screening & architecture review) is online. The top selected finalist teams will attend the 24-hour live hackathon on-campus at VIT Chennai on 18–19 August 2026.' },
    { id: 'q-05', code: 'Q05', category: 'LOGISTICS', question: 'What items should participants bring to the venue?', answer: 'Finalists should bring valid college ID cards, laptops, chargers, extension boards, government ID (Aadhaar/PAN), personal items, and any specialized hardware (if relevant to your track).' },
    { id: 'q-06', code: 'Q06', category: 'TRACKS', question: 'How does track selection and problem statement allocation work?', answer: 'Problem statements across Agentic Finance, Web3 & DeFi, Supply Chain Finance, and FinSec & Cyber Finance will be officially released on 12 August. Teams select their preferred track during Round 1 submission.' },
    { id: 'q-07', code: 'Q07', category: 'REGISTRATION', question: 'Where will official announcements and finalist updates be posted?', answer: 'All official announcements, schedule adjustments, and campus entry details will be published in the official CSI ORIGIN 2026 WhatsApp Group and Devfolio portal.' },
  ];

  const categories = ['ALL', 'REGISTRATION', 'TEAMS', 'LOGISTICS', 'TRACKS'];
  const filteredFaqs = activeFilter === 'ALL' ? faqs : faqs.filter(f => f.category === activeFilter);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', end: 'bottom 20%', scrub: 0.8 } })
        .fromTo(itemRefs.current.filter(Boolean), { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: { each: 0.08 }, duration: 0.5 }, 0);
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-16 md:py-24 border-b border-[#2A2A2A] relative overflow-hidden bg-[#070707]">
      <AsciiBackground variant="stream" opacity={0.05} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">
        <SectionHeader secCode="SEC-06" numeral="06" title="FAQ" subtitle="FREQUENTLY ASKED TECHNICAL & LOGISTICAL INQUIRIES" />
        <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-6 md:mb-8 border-b border-[#2A2A2A] pb-4 md:pb-6">
          <span className="font-mono-custom text-[9px] md:text-xs text-[#8A8A8A] mr-2 md:mr-4 hidden sm:inline">{filteredFaqs.length} ITEMS</span>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)} className={`font-mono-custom text-[10px] md:text-[11px] px-2.5 md:px-3.5 py-1 md:py-1.5 uppercase tracking-wider transition-colors ${activeFilter === cat ? 'bg-[#FF4D1C] text-[#0A0A0A] font-bold' : 'bg-[#121212] text-[#8A8A8A] border border-[#2A2A2A] hover:text-[#F2F0EB] hover:border-[#FF4D1C]/60'}`}>{cat}</button>
          ))}
        </div>
        <div className="w-full flex flex-col border-t border-[#2A2A2A]">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} ref={el => { itemRefs.current[idx] = el; }} className="border-b border-[#2A2A2A] hover:bg-[#101010] transition-colors group cursor-pointer" onClick={() => setOpenId(isOpen ? null : faq.id)}>
                <div className="py-4 md:py-6 px-2 md:px-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <span className="font-mono-custom text-[10px] md:text-xs text-[#8A8A8A] shrink-0 pt-0.5">{faq.code}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans font-bold text-xs md:text-base text-[#F2F0EB] group-hover:text-[#FF4D1C] transition-colors uppercase tracking-wide leading-snug mb-1">{faq.question}</h3>
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="font-mono-custom text-[9px] md:text-[10px] text-[#8A8A8A] tracking-widest uppercase">{faq.category}</span>
                        {!isOpen && <p className="text-[10px] md:text-xs text-[#8A8A8A]/60 font-body-custom leading-relaxed line-clamp-1">{faq.answer}</p>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 shrink-0 mt-1">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#FF4D1C]" />
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#FF4D1C]" />
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="pb-4 md:pb-6 px-4 md:px-8 pt-0 flex flex-col gap-2">
                        <p className="font-body-custom text-[11px] md:text-sm text-[#F2F0EB]/80 leading-relaxed">{faq.answer}</p>
                        <span className="font-mono-custom text-[9px] md:text-[10px] text-[#8A8A8A] tracking-widest">• CLICK TO COLLAPSE</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
