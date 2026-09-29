import React from "react";
import Image from "next/image";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children?: React.ReactNode;
}

export default function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b-2 border-frame bg-white px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
      {/* Left: Branding & Logos */}
      <div className="flex items-center gap-3 self-start lg:self-center">
        <div className="flex items-center gap-2">
          {/* DevFest & GDG Logos */}
          <div className="flex items-center gap-1.5 border-r-2 border-subtle pr-3 mr-1">
            <img
              src="/GDG_Logo.svg"
              alt="GDG Logo"
              className="h-6 w-auto object-contain"
            />
            <img
              src="/GDG-Nashik_Logo.svg"
              alt="GDG Nashik"
              className="h-6 w-auto object-contain hidden sm:block"
            />
            <img
              src="/DevFest-26_Logo.svg"
              alt="DevFest 26"
              className="h-6 w-auto object-contain"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-wider text-frame uppercase">
                {APP.name}
              </span>
              <span className="font-mono text-[10px] font-bold border border-frame px-1.5 py-0.2 bg-canvas">
                {APP.version}
              </span>
              <span className="hidden md:inline-block font-mono text-[10px] font-bold text-accent bg-red-50 border border-accent/40 px-1.5 py-0.2 uppercase">
                Desi Edition
              </span>
            </div>
            <p className="font-mono text-[11px] text-gray-500 hidden sm:block">
              {APP.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Right: Controls passed as children */}
      <div className="w-full lg:w-auto flex justify-end">{children}</div>
    </header>
  );
}
