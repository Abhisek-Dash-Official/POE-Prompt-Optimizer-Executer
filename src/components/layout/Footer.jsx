"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-blueprint-line bg-blueprint-base mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-azure rounded-sm mb-4 w-fit"
            >
              <div className="relative w-8 h-8 flex items-center justify-center bg-blueprint-surface border border-blueprint-line group-hover:border-blueprint-azure transition-colors">
                <Image
                  src="/logo.png"
                  alt="POE Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="font-mono font-bold tracking-widest text-blueprint-text uppercase">
                {siteConfig.name}_
              </span>
            </Link>
            <p className="text-blueprint-muted text-sm max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold text-blueprint-text tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/workspace"
                  className="text-sm text-blueprint-muted hover:text-blueprint-azure transition-colors focus-visible:ring-2 focus-visible:ring-blueprint-azure rounded-sm"
                >
                  Workspace
                </Link>
              </li>
              {siteConfig.navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-blueprint-muted hover:text-blueprint-azure transition-colors focus-visible:ring-2 focus-visible:ring-blueprint-azure rounded-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold text-blueprint-text tracking-wider uppercase mb-4">
              Legal & Support
            </h3>
            <ul className="flex flex-col gap-3">
              {siteConfig.legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-blueprint-muted hover:text-blueprint-azure transition-colors focus-visible:ring-2 focus-visible:ring-blueprint-azure rounded-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-blueprint-line flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-blueprint-muted font-mono">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-blueprint-muted font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blueprint-success animate-pulse"></span>
              SYS: ONLINE
            </span>
            <span>VER: 1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
