'use client';

import React, { useState } from 'react';
import EducationPreviewCard from '@/components/education/EducationPreviewCard';
import PresentationModal from '@/components/education/PresentationModal';

const SAMPLE_CONTENT = {
  genz: {
    title: "Digital Banking 101",
    slides: [
      {
        title: "Welcome to Modern Banking 🚀",
        body: "Let's explore how banking works in the digital age - quick, easy, and totally secure!",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000",
        bullets: [
          "24/7 access to your money",
          "Super secure transactions",
          "Send money instantly to friends"
        ]
      },
      {
        title: "Mobile Banking Apps 📱",
        body: "Your bank in your pocket - manage everything from your phone!",
        image: "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=1000",
        bullets: [
          "Check your balance instantly",
          "Get real-time notifications",
          "Pay friends with just a tap"
        ]
      }
    ]
  },
  elderly: {
    title: "Online Banking Made Simple",
    slides: [
      {
        title: "Getting Started with Online Banking",
        body: "Learn how to safely manage your money online from the comfort of your home.",
        image: "https://images.unsplash.com/photo-1599050751795-6cdaafbc2319?q=80&w=1000",
        bullets: [
          "Access your account securely",
          "View your balance and transactions",
          "Pay bills easily online"
        ]
      },
      {
        title: "Staying Safe Online",
        body: "Important tips to keep your money safe while banking online.",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1000",
        bullets: [
          "Create strong passwords",
          "Spot suspicious activity",
          "Protect your personal information"
        ]
      }
    ]
  }
};

export default function EducationPage() {
  const [selectedContent, setSelectedContent] = useState<null | {
    content: typeof SAMPLE_CONTENT.genz | typeof SAMPLE_CONTENT.elderly;
    audience: 'genz' | 'elderly';
  }>(null);

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Financial Education
        </h1>
        <p className="text-muted-foreground">
          Choose your learning path and master digital banking at your own pace
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <EducationPreviewCard
          title="Digital Banking for Gen Z"
          description="Master modern banking with interactive lessons designed for young adults. Learn about mobile payments, digital wallets, and smart money management."
          thumbnail="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000"
          difficulty="beginner"
          audience="genz"
          onClick={() => setSelectedContent({
            content: SAMPLE_CONTENT.genz,
            audience: 'genz'
          })}
        />
        
        <EducationPreviewCard
          title="Online Banking Essentials"
          description="A comprehensive guide to understanding online banking for seniors. Learn at your own pace with clear, step-by-step instructions."
          thumbnail="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000"
          difficulty="beginner"
          audience="elderly"
          onClick={() => setSelectedContent({
            content: SAMPLE_CONTENT.elderly,
            audience: 'elderly'
          })}
        />

        <EducationPreviewCard
          title="Advanced Digital Finance"
          description="Take your banking skills to the next level with advanced topics like investments, cryptocurrency, and personal finance management."
          thumbnail="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000"
          difficulty="intermediate"
          audience="genz"
          onClick={() => setSelectedContent({
            content: SAMPLE_CONTENT.genz,
            audience: 'genz'
          })}
        />
      </div>

      {selectedContent && (
        <PresentationModal
          content={selectedContent.content}
          audience={selectedContent.audience}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </div>
  );
}
