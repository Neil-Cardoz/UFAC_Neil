'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedParticles } from '@/components/animated-particles';
import { TypewriterText } from '@/components/typewriter-text';
import { CountupStat } from '@/components/countup-stat';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { Button } from '@/components/ui/button';
import { Leaf, CheckCircle2, Zap } from 'lucide-react';

export default function Home() {
  return (
    <LayoutWrapper>
      <div className="relative">
        <AnimatedParticles />

        {/* Hero Section */}
        <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Leaf className="mx-auto w-16 h-16 text-accent mb-4" />
            </motion.div>

            <TypewriterText
              text="Empower Farmers with AI-Driven Eligibility Assessment"
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
              speed={30}
            />

            <motion.p
              className="text-lg md:text-xl text-foreground/70 mb-8 text-balance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              UFAC Engine streamlines PM-KISAN eligibility verification using advanced AI to help
              farmers access their rightful benefits faster and easier.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              <Link href="/eligibility">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Check Eligibility
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Choose UFAC Engine?
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: 'Lightning Fast',
                  description: 'Get instant eligibility assessment in seconds, not days.',
                },
                {
                  icon: <CheckCircle2 className="w-8 h-8" />,
                  title: 'Accurate Results',
                  description: 'AI-powered verification ensures accurate eligibility determination.',
                },
                {
                  icon: <Leaf className="w-8 h-8" />,
                  title: 'Farmer-Centric',
                  description: 'Simple, easy-to-use interface designed for farmers.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="text-accent mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-foreground/70 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative z-10 py-20 px-4 bg-gradient-to-b from-transparent via-card/20 to-transparent">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <CountupStat endValue={5000} label="Farmers Helped" suffix="+" />
              <CountupStat endValue={98} label="Accuracy Rate" suffix="%" />
              <CountupStat endValue={2} label="Avg. Response Time" suffix="s" />
              <CountupStat endValue={6} label="States Covered" suffix="+" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-20 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Check Your Eligibility?
              </h2>
              <p className="text-foreground/70 mb-8 text-lg">
                Start your PM-KISAN eligibility assessment journey today with UFAC Engine.
              </p>
              <Link href="/eligibility">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
                >
                  Get Started Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  );
}
