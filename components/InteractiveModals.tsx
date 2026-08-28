'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalsProps {
  selectedTrackName: string | null;
  onCloseTrack: () => void;
}

const TRACK_DETAILS: Record<string, string> = {
  'Agentic Finance': 'Must demonstrate Reason → Plan → Act, execute at least one meaningful financial action, and include appropriate human oversight or safety mechanisms. Simple AI chatbots do not qualify.',
  'Web3 & DeFi': 'Must include meaningful on-chain financial logic and address relevant security, trust, or economic considerations. Wallet/token-only projects do not qualify.',
  'Supply Chain Finance': 'Must involve at least 3 stakeholders and demonstrate a meaningful financial decision, optimization, or risk assessment. Simple invoice/OCR solutions do not qualify.',
  'FinSec & Cyber Finance': 'Must demonstrate Threat → Detection → Response, using simulated, public, or authorized data. Simple fraud-classification models do not qualify.'
};

export default function InteractiveModals({
  selectedTrackName,
  onCloseTrack,
}: ModalsProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>

      {/* Track Specification Modal */}
      <AnimatePresence>
        {selectedTrackName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={onCloseTrack}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-[#FF4D1C] p-8 max-w-xl w-full relative shadow-[0_0_35px_rgba(255,77,28,0.2)]"
            >
              <div className="flex justify-between items-center mb-6 border-b border-[#2A2A2A] pb-4">
                <span className="font-mono-custom text-xs text-[#FF4D1C] font-bold tracking-widest uppercase">
                  TRACK SPECIFICATION // {selectedTrackName}
                </span>
                <button
                  onClick={onCloseTrack}
                  className="font-mono-custom text-xs text-[#8A8A8A] hover:text-[#FF4D1C]"
                >
                  [ ESC ]
                </button>
              </div>

              <div className="space-y-6 font-mono-custom text-xs">
                <h3 className="font-display text-3xl text-[#F2F0EB]">
                  {selectedTrackName}
                </h3>

                <div className="p-4 bg-[#0A0A0A] border border-[#2A2A2A] space-y-3">
                  <div className="text-[#FF4D1C] uppercase font-bold">TRACK SPECIFIC CONSTRAINTS:</div>
                  <p className="text-[#F2F0EB]">
                    {TRACK_DETAILS[selectedTrackName] || "Refer to the official track details on Devfolio."}
                  </p>
                </div>

                <div className="p-4 bg-[#0A0A0A] border border-[#2A2A2A] space-y-3">
                  <div className="text-[#8A8A8A] uppercase font-bold">COMMON CONSTRAINTS:</div>
                  <ul className="space-y-1.5 text-[#F2F0EB]">
                    <li>• Must solve a real or meaningful financial problem.</li>
                    <li>• Must deliver a working prototype with an end-to-end workflow.</li>
                    <li>• Public, open-source, or synthetic data only.</li>
                    <li>• API/LLM wrappers and basic CRUD applications do not qualify.</li>
                    <li>• Solutions must consider security, privacy, scalability, and real-world constraints.</li>
                  </ul>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => handleCopy(`https://csiorigin2026.vit.ac.in/tracks/${selectedTrackName.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="flex-1 py-3 bg-[#FF4D1C] text-[#0A0A0A] font-bold tracking-widest uppercase hover:bg-[#4A1E0F] hover:text-[#F2F0EB] transition-colors"
                  >
                    DOWNLOAD PPT TEMPLATE & SPEC
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
