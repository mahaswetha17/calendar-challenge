"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import Image from "next/image";

export default function CalendarWidget() {
  // Shared state to coordinate the Grid and the Notes section
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden relative border border-gray-200"
    >
      {/* 1. HERO IMAGE (Visual Anchor) */}
      <div className="relative w-full h-64 md:h-80">
        <Image 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000" 
          alt="Calendar Landscape Hero" 
          fill 
          className="object-cover"
          priority 
        />
        {/* Aesthetic diagonal overlay to emulate the physical design in the inspiration image */}
        <div 
          className="absolute bottom-0 left-0 w-full h-16 bg-white" 
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 50% 100%, 0 0)" }}
        ></div>
      </div>

      {/* 2. INTERACTIVE CONTENT (Responsive Grid & Notes) */}
      <div className="flex flex-col md:flex-row min-h-[480px]">
        {/* The Grid handles the Day Range Selector requirement */}
        <div className="w-full md:w-2/3 border-r border-gray-50">
          <CalendarGrid selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        
        {/* The Notes Panel handles the Integrated Notes Section requirement */}
        <div className="w-full md:w-1/3 bg-gray-50/50">
          <NotesPanel selectedDate={selectedDate} />
        </div>
      </div>
      
      {/* 3. PHYSICAL DETAILS (Wall Calendar Rings) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-4 -mt-3">
        {[1, 2, 3, 4, 5, 6].map((ring) => (
          <div 
            key={ring} 
            className="w-2.5 h-7 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-md border border-gray-500"
          ></div>
        ))}
      </div>

      {/* Branding / Creative Label */}
      <div className="absolute top-4 right-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/30">
        Premium Edition 2026
      </div>
    </motion.div>
  );
}