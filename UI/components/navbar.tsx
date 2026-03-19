'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Navbar() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Eligibility', href: '/eligibility' },
    { label: 'Agent Flow', href: '/agent-flow' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold">
              U
            </div>
            <span className="hidden font-semibold text-foreground sm:inline">UFAC Engine</span>
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
