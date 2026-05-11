import React from "react";
import BlurIn from "@/components/ui/blur_in";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <BlurIn>
      <h1 className="text-center mt-8 mb-12 text-6xl md:text-8xl lg:text-9xl font-black bg-linear-0 from-blue-700 via-blue-400 to-cyan-200 bg-clip-text text-transparent w-fit mx-auto italic uppercase tracking-tighter leading-tight drop-shadow-xl p-4">
        {title}
      </h1>
    </BlurIn>
  );
}
