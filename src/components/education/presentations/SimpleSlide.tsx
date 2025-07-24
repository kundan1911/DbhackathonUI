import { motion } from 'framer-motion';
import React from 'react';

interface SimpleSlideProps {
  content: {
    title: string;
    body: string;
    image?: string;
    bullets?: string[];
  };
  isActive: boolean;
}

export default function SimpleSlide({ content, isActive }: SimpleSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : { opacity: 0 }}
      className="bg-white text-black p-8 rounded-lg min-h-[60vh] flex flex-col max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
        {content.title}
      </h2>
      
      <div className="flex flex-col items-center gap-8 flex-1">
        {content.image && (
          <div className="w-full max-w-lg">
            <img
              src={content.image}
              alt="Slide visual"
              className="rounded-lg object-contain w-full"
            />
          </div>
        )}
        
        <div className="space-y-6 text-center">
          <p className="text-xl leading-relaxed text-gray-700">{content.body}</p>
          {content.bullets && (
            <ul className="space-y-4 text-left max-w-2xl mx-auto">
              {content.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-4 text-lg"
                >
                  <span className="text-2xl text-blue-600">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}
