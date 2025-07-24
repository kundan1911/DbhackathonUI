import { motion } from 'framer-motion';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';

interface EducationPreviewCardProps {
  title: string;
  description: string;
  thumbnail: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  audience: 'genz' | 'elderly';
  onClick: () => void;
}

export default function EducationPreviewCard({
  title,
  description,
  thumbnail,
  difficulty,
  audience,
  onClick
}: EducationPreviewCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden border-2 border-border/50 bg-gradient-to-br from-card/50 to-card h-full">
        <div className="relative h-48">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute top-4 right-4 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              audience === 'genz' 
                ? 'bg-purple-500/90 text-white' 
                : 'bg-blue-500/90 text-white'
            }`}>
              {audience === 'genz' ? '🚀 Gen Z' : '👥 Senior Friendly'}
            </span>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1
              ${difficulty === 'beginner' ? 'bg-green-500/90' : 
                difficulty === 'intermediate' ? 'bg-yellow-500/90' : 
                'bg-red-500/90'} text-white`}>
              <Star className="w-3 h-3" />
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
        </div>
        
        <CardHeader className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
        
        <CardFooter>
          <motion.div 
            className="flex items-center text-sm text-primary font-medium"
            whileHover={{ x: 5 }}
          >
            Start Learning
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
