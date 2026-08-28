'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import SectionHeader from './SectionHeader';
import AsciiBackground from './AsciiBackground';

interface TracksSectionProps { onSelectTrack: (trackName: string) => void; }

// ── Procedural ASCII generators ──────────────────────────────────────────
// Each track gets a distinct generated texture instead of sharing a static block.

const ASCII_ROWS = 40;
const ASCII_COLS = 122;

/** Agentic Finance — a node/edge graph, evoking autonomous agents talking to each other. */
function makeNeuralNet(rows: number, cols: number): string {
  const nodesNorm: [number, number][] = [
    [0.5, 0.12], [0.22, 0.3], [0.78, 0.3],
    [0.36, 0.5], [0.64, 0.5],
    [0.5, 0.68], [0.16, 0.7], [0.84, 0.7],
    [0.5, 0.9],
  ];
  const pts = nodesNorm.map(([nx, ny]) => [nx * cols, ny * rows] as [number, number]);
  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 4],
    [3, 5], [4, 5], [1, 6], [2, 7], [5, 6], [5, 7], [5, 8],
  ];

  const lines: string[] = [];
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < cols; c++) {
      let ch = ' ';

      for (const [px, py] of pts) {
        const d = Math.hypot(c - px, (r - py) * 1.7);
        if (d < 1.6) { ch = '#'; break; }
        if (d < 3.2 && ch === ' ') ch = '+';
        if (d < 4.6 && ch === ' ') ch = '.';
      }

      if (ch === ' ') {
        for (const [a, b] of edges) {
          const [x1, y1] = pts[a];
          const [x2, y2] = pts[b];
          const dx = x2 - x1, dy = y2 - y1;
          const len2 = dx * dx + dy * dy || 1;
          let t = ((c - x1) * dx + (r - y1) * dy) / len2;
          t = Math.max(0, Math.min(1, t));
          const nx = x1 + t * dx, ny = y1 + t * dy;
          const dist = Math.hypot(c - nx, (r - ny) * 1.7);
          if (dist < 0.55) { ch = '+'; break; }
        }
      }
      line += ch;
    }
    lines.push(line);
  }
  return lines.join('\n');
}

/** Web3 & DeFi — a hex/diamond lattice suggesting linked blocks in a chain. */
function makeHexLattice(rows: number, cols: number): string {
  const tile = [
    '    ++    ',
    '   +##+   ',
    '  +####+  ',
    '--+####+--',
    '  +####+  ',
    '   +##+   ',
  ];
  const tw = tile[0].length;
  const shifted = tile.map(t => t.slice(tw / 2) + t.slice(0, tw / 2));

  const lines: string[] = [];
  for (let r = 0; r < rows; r++) {
    const cycle = Math.floor(r / tile.length);
    const rowTile = (cycle % 2 === 1 ? shifted : tile)[r % tile.length];
    const repeated = rowTile.repeat(Math.ceil(cols / rowTile.length)).slice(0, cols);
    lines.push(repeated);
  }
  return lines.join('\n');
}

/** Supply Chain Finance — diagonal chevrons streaming across the frame, like flow through a pipeline. */
function makeFlowPipeline(rows: number, cols: number): string {
  const lines: string[] = [];
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < cols; c++) {
      const phase = ((c - r * 2) % 16 + 16) % 16;
      if (phase < 3) line += '>';
      else if (phase < 5) line += '+';
      else if (phase === 9) line += '-';
      else line += ' ';
    }
    lines.push(line);
  }
  return lines.join('\n');
}

/** FinSec & Cyber Finance — a shield silhouette with a carved lock glyph. */
function makeShield(rows: number, cols: number): string {
  const cx = cols / 2;
  const lines: string[] = [];
  for (let r = 0; r < rows; r++) {
    const t = r / (rows - 1);
    let halfWidth: number;
    if (t < 0.15) halfWidth = (t / 0.15) * cols * 0.3;
    else if (t < 0.55) halfWidth = cols * 0.3;
    else halfWidth = cols * 0.3 * (1 - (t - 0.55) / 0.45);

    let line = '';
    for (let c = 0; c < cols; c++) {
      const dx = Math.abs(c - cx);
      if (dx > halfWidth) { line += ' '; continue; }

      const edgeDist = halfWidth - dx;
      const inLockBody = t > 0.28 && t < 0.42 && dx < cols * 0.07;
      const inLockShackle = t > 0.2 && t <= 0.28 && dx < cols * 0.04;

      if (inLockBody || inLockShackle) line += '#';
      else if (edgeDist < 2) line += '+';
      else if (edgeDist < 5) line += '#';
      else line += (Math.floor((r + c) / 3) % 5 === 0) ? '+' : '.';
    }
    lines.push(line);
  }
  return lines.join('\n');
}

const asciiNeural = makeNeuralNet(ASCII_ROWS, ASCII_COLS);
const asciiWeb3 = makeHexLattice(ASCII_ROWS, ASCII_COLS);
const asciiFlow = makeFlowPipeline(ASCII_ROWS, ASCII_COLS);
const asciiShield = makeShield(ASCII_ROWS, ASCII_COLS);

// ── Track data ────────────────────────────────────────────────────────────

const TRACKS_DATA = [
  { code: 'TRACK-01', category: 'FINTECH', name: 'Agentic Finance', desc: 'Build autonomous AI-powered financial systems capable of reasoning, planning, and executing complex financial workflows.', ascii: asciiNeural },
  { code: 'TRACK-02', category: 'FINTECH', name: 'Web3 & DeFi', desc: 'Build decentralized and programmable financial solutions using blockchain, smart contracts, or decentralized infrastructure.', ascii: asciiWeb3 },
  { code: 'TRACK-03', category: 'FINTECH', name: 'Supply Chain Finance', desc: 'Build intelligent financial solutions for supply chains, addressing credit, trade finance, working capital, payments, or supplier risk.', ascii: asciiFlow },
  { code: 'TRACK-04', category: 'FINTECH', name: 'FinSec & Cyber Finance', desc: 'Build solutions that detect, prevent, investigate, or respond to financial cyber threats, fraud, and digital risks.', ascii: asciiShield },
];

export default function TracksSection({ onSelectTrack }: TracksSectionProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'bottom 30%', scrub: 0.8 }
      });
      cardRefs.current.forEach((el, index) => {
        if (el) {
          const direction = index % 2 === 0 ? -40 : 40;
          tl.fromTo(el, { opacity: 0, x: direction }, { opacity: 1, x: 0, duration: 0.8 }, index * 0.1);
        }
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tracks" className="py-20 md:py-28 border-b border-[#2A2A2A] relative overflow-hidden bg-[#070707]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">
        <SectionHeader secCode="SEC-01" numeral="01" title="TRACKS" subtitle="EXPLORE THE SPECIALIZED HACKING DOMAINS" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-10">
          {TRACKS_DATA.map((track, idx) => (
            <div key={track.code} ref={el => { cardRefs.current[idx] = el; }} onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)} onClick={() => onSelectTrack(track.name)} className="group cursor-pointer flex flex-col">
              <div className="relative w-full h-[220px] sm:h-[300px] md:h-[340px] bg-[#0A0A0A] border border-[#2A2A2A] group-hover:border-[#FF4D1C]/60 transition-colors overflow-hidden flex items-center justify-center">
                <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 px-2 py-0.5 md:px-2.5 md:py-1 bg-[#121212]/90 border border-[#2A2A2A] font-mono-custom text-[9px] md:text-[10px] text-[#8A8A8A] group-hover:text-[#FF4D1C] group-hover:border-[#FF4D1C]/40 transition-colors uppercase tracking-widest">{track.code} // {track.category}</div>
                <div className="absolute top-2 right-2 md:top-3 md:right-3 z-20 font-mono-custom text-xs text-[#8A8A8A]/40 group-hover:text-[#FF4D1C] transition-colors">+</div>
                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity">
                  <pre className="font-mono-custom text-[3px] sm:text-[3.5px] md:text-[4px] text-[#F2F0EB] leading-[1.1] inline-block pointer-events-none">
                    {track.ascii}
                  </pre>
                </div>
              </div>
              <div className="mt-4 md:mt-5 flex flex-col">
                <div className="flex items-center gap-2 mb-1.5 md:mb-2"><span className="w-1.5 h-1.5 bg-[#FF4D1C]/60 group-hover:bg-[#FF4D1C] transition-colors" /><h3 className="font-mono-custom text-sm md:text-base font-semibold uppercase text-[#F2F0EB] group-hover:text-[#FF4D1C] transition-colors tracking-wide">{track.name}</h3></div>
                <p className="font-body-custom text-xs md:text-sm text-[#8A8A8A] leading-relaxed line-clamp-2 pl-3 md:pl-3.5 border-l border-[#2A2A2A] group-hover:border-[#FF4D1C]/40 transition-colors">{track.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}