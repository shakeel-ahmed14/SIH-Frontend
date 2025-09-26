// src/components/Layout.tsx
import React from "react";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* left column for nav (fixed width) */}
      <aside className="w-56 hidden md:block border-r border-base-200">
        <Navigation />
      </aside>

      {/* main content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
