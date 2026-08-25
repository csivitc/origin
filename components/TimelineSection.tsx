'use client';

import React from 'react';
import { Calendar, Users, Megaphone, CheckCircle2, PlayCircle } from 'lucide-react';
import SectionHeader from './SectionHeader';

import { Timeline } from '@/components/ui/timeline';

const timelineData = [
  {
    title: "2 Aug – 10 Aug",
    content: (
      <div>
        <h4 className="font-display text-2xl mb-2 text-[#F2F0EB] uppercase">Registrations Open</h4>
        <p className="font-mono-custom text-[#8A8A8A] text-xs md:text-sm font-normal mb-8">
          The portal opens. Gather your team of innovators, developers, and designers.
        </p>
      </div>
    ),
  },
  {
    title: "12 Aug",
    content: (
      <div>
        <h4 className="font-display text-2xl mb-2 text-[#F2F0EB] uppercase">Release of the Tracks</h4>
        <p className="font-mono-custom text-[#8A8A8A] text-xs md:text-sm font-normal mb-8">
          Release of the Tracks and PPT template.
        </p>
      </div>
    ),
  },
  {
    title: "13 Aug – 14 Aug",
    content: (
      <div>
        <h4 className="font-display text-2xl mb-2 text-[#F2F0EB] uppercase">PPT Submission & Shortlisting Round</h4>
        <p className="font-mono-custom text-[#8A8A8A] text-xs md:text-sm font-normal mb-8">
          Submit your presentation and idea for the shortlisting phase.
        </p>
      </div>
    ),
  },
  {
    title: "15 Aug – 16 Aug",
    content: (
      <div>
        <h4 className="font-display text-2xl mb-2 text-[#F2F0EB] uppercase">Shortlist Announcement & RSVP Confirmation</h4>
        <p className="font-mono-custom text-[#8A8A8A] text-xs md:text-sm font-normal mb-8">
          Shortlisted teams will be announced and required to confirm their participation.
        </p>
      </div>
    ),
  },
  {
    title: "27 Aug",
    content: (
      <div>
        <h4 className="font-display text-2xl mb-2 text-[#F2F0EB] uppercase">Vit chennai EventHub Registration</h4>
        <p className="font-mono-custom text-[#8A8A8A] text-xs md:text-sm font-normal mb-8">
          Confirmed teams will complete their official event registration.
        </p>
      </div>
    ),
  },
  {
    title: "28 Aug",
    content: (
      <div>
        <h4 className="font-display text-2xl mb-2 text-[#F2F0EB] uppercase">Check-in, Inauguration & Hackathon Kickoff</h4>
        <p className="font-mono-custom text-[#8A8A8A] text-xs md:text-sm font-normal mb-8">
          On-site registration, opening ceremony, and the start of the 24-hour build phase.
        </p>
      </div>
    ),
  },
  {
    title: "28 Aug – 29 Aug",
    content: (
      <div>
        <h4 className="font-display text-2xl mb-2 text-[#F2F0EB] uppercase">24-Hour Offline Hackathon</h4>
        <p className="font-mono-custom text-[#8A8A8A] text-xs md:text-sm font-normal mb-8">
          Build, innovate, and compete at CSI ORIGIN 2026.
        </p>
      </div>
    ),
  },
  {
    title: "29 Aug",
    content: (
      <div>
        <h4 className="font-display text-2xl mb-2 text-[#F2F0EB] uppercase">Final Presentations & Prize Distribution</h4>
        <p className="font-mono-custom text-[#8A8A8A] text-xs md:text-sm font-normal mb-8">
          Pitch your projects to the judges and celebrate the winners.
        </p>
      </div>
    ),
  }
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="relative overflow-hidden bg-[#0A0A0A]">
      {/* 1. Subtle Dot-Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff15_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />
      {/* 2. Soft Vignette/Glow around the edges to blend the dot grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none z-0" />
      
      <div className="relative z-10 w-full">
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
