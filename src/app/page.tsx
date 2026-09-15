import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { AccountCheckerSection } from '@/components/landing/AccountCheckerSection';
import { ValuePropSection } from '@/components/landing/ValuePropSection';
import { ExampleAnalysis } from '@/components/landing/ExampleAnalysis';
import { StepGuideSection } from '@/components/landing/StepGuideSection';
import { DetectionCategories } from '@/components/landing/DetectionCategories';
import { FinalCtaSection } from '@/components/landing/FinalCtaSection';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <AccountCheckerSection />
      <ValuePropSection />
      <ExampleAnalysis />
      <StepGuideSection />
      <DetectionCategories />
      <FinalCtaSection />
    </div>
  );
}
