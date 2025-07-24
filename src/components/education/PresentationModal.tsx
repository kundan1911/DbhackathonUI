import { motion } from 'framer-motion';
import React, { useState } from 'react';
import ModernSlide from './presentations/ModernSlide';
import SimpleSlide from './presentations/SimpleSlide';

interface PresentationModalProps {
  content: {
    title: string;
    slides: Array<{
      title: string;
      body: string;
      image?: string;
      bullets?: string[];
    }>;
  };
  audience: 'genz' | 'elderly';
  onClose: () => void;
}

export default function PresentationModal({ content, audience, onClose }: PresentationModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const SlideComponent = audience === 'genz' ? ModernSlide : SimpleSlide;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-8"
    >
      <div className="w-full max-w-6xl">
        <SlideComponent
          content={content.slides[currentSlide]}
          isActive={true}
        />
        
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
          >
            Previous
          </button>
          
          <span className="text-lg">
            {currentSlide + 1} / {content.slides.length}
          </span>
          
          <div className="space-x-4">
            <button
              onClick={() => setCurrentSlide(prev => Math.min(content.slides.length - 1, prev + 1))}
              disabled={currentSlide === content.slides.length - 1}
              className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
            >
              Next
            </button>
            
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
