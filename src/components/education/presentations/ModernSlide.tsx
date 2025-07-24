import { motion } from 'framer-motion';
import React from 'react';

interface ModernSlideProps {
  content: {
    title: string;
    body: string;
    image?: string;
    bullets?: string[];
  };
  isActive: boolean;
}

export default function ModernSlide({ content, isActive }: ModernSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      className="bg-gradient-to-br from-purple-900 to-blue-900 p-8 rounded-2xl min-h-[60vh] flex flex-col"
    >
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
        {content.title}
      </h2>
      
      <div className="grid grid-cols-2 gap-8 flex-1">
        <div className="space-y-4">
          <p className="text-lg text-slate-200">{content.body}</p>
          {content.bullets && (
            <ul className="space-y-2">
              {content.bullets.map((bullet, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <span className="text-pink-400">→</span>
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
        {content.image && (
          <div className="relative">
            <img
              src={content.image}
              alt="Slide visual"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
