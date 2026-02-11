import React from "react";
import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";
import GallerySection from "../components/landing/GallerySection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import ScheduleSection from "../components/landing/ScheduleSection";
import PricingSection from "../components/landing/PricingSection";
import FooterSection from "../components/landing/FooterSection";

export default function Home() {
  return (
    <div className="bg-[#0d1b2a]">
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <ScheduleSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
}