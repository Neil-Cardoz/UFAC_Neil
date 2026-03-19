'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <motion.div
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-semibold text-foreground mb-4">UFAC Engine</h3>
            <p className="text-sm text-foreground/70">
              Streamlining farmer eligibility assessment with AI-powered insights.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/eligibility" className="text-foreground/70 hover:text-accent transition-colors">
                  Check Eligibility
                </Link>
              </li>
              <li>
                <Link href="/agent-flow" className="text-foreground/70 hover:text-accent transition-colors">
                  Agent Flow
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex items-center justify-between text-sm text-foreground/60">
          <p>&copy; {currentYear} UFAC Engine. All rights reserved.</p>
          <p>PM-KISAN Eligibility Assistant</p>
        </div>
      </motion.div>
    </footer>
  );
}
