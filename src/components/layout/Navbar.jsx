"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, User } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, isCheckingAuth, checkSession } =
    useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <header className="sticky top-0 z-50 w-full bg-blueprint-base/90 backdrop-blur-md border-b border-blueprint-line">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-azure rounded-sm"
        >
          <div className="relative w-8 h-8 flex items-center justify-center bg-blueprint-surface border border-blueprint-line group-hover:border-blueprint-azure transition-colors">
            <Image
              src="/logo.png"
              alt="POE - Prompt Optimizer and Executor"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="font-mono font-bold tracking-widest text-blueprint-text uppercase">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-blueprint-muted hover:text-blueprint-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-azure rounded-sm px-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {isCheckingAuth ? (
            <div className="h-9 w-32 bg-blueprint-surface animate-pulse border border-blueprint-line"></div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-6">
              {/* User Avatar & Name */}
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blueprint-line bg-blueprint-surface">
                  {user?.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt={user.username || "User avatar"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blueprint-muted">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <span className="text-sm text-blueprint-muted font-mono">
                  {user?.username}
                </span>
              </div>

              {/* Workspace Button */}
              <Link
                href="/workspace"
                className="corner-brackets bg-blueprint-surface border border-blueprint-line px-4 py-2 text-sm font-medium text-blueprint-text hover:border-blueprint-azure hover:text-blueprint-azure transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-azure"
              >
                Workspace <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-blueprint-muted hover:text-blueprint-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-azure rounded-sm px-2 py-1"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="corner-brackets bg-blueprint-azure/10 border border-blueprint-azure text-blueprint-azure px-4 py-2 text-sm font-medium hover:bg-blueprint-azure hover:text-blueprint-base transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-azure focus-visible:ring-offset-2 focus-visible:ring-offset-blueprint-base"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden p-2 text-blueprint-muted hover:text-blueprint-text focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-azure"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-blueprint-line bg-blueprint-surface p-6 flex flex-col gap-4 shadow-2xl">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-blueprint-muted hover:text-blueprint-text"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="h-px bg-blueprint-line my-4" />

          {isAuthenticated ? (
            <div className="flex flex-col gap-6">
              {/* Mobile User Profile */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-blueprint-azure/30 bg-blueprint-base">
                  {user?.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt={user.username || "User avatar"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blueprint-muted">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <span className="text-lg text-blueprint-text font-mono">
                  {user?.username}
                </span>
              </div>

              {/* Mobile Workspace Button */}
              <Link
                href="/workspace"
                className="flex items-center justify-between bg-blueprint-azure text-blueprint-base px-4 py-3 font-medium rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Open Workspace <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                href="/login"
                className="text-lg font-medium text-blueprint-text px-2 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="text-lg font-medium text-blueprint-azure border border-blueprint-azure/30 bg-blueprint-azure/5 px-4 py-3 text-center rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
