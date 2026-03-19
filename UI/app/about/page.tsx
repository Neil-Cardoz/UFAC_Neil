'use client';

import { motion } from 'framer-motion';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { TIMELINE_EVENTS } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { Leaf, Brain, Shield, Zap } from 'lucide-react';

const techStack = [
  {
    category: 'Frontend',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    icon: <Zap className="w-6 h-6" />,
  },
  {
    category: 'Visualization',
    technologies: ['React Flow', 'Canvas API', 'Motion Graphics'],
    icon: <Brain className="w-6 h-6" />,
  },
  {
    category: 'Form Management',
    technologies: ['React Hook Form', 'Zod', 'React Select', 'Radix UI'],
    icon: <Shield className="w-6 h-6" />,
  },
  {
    category: 'UI Components',
    technologies: ['shadcn/ui', 'Radix UI Primitives', 'Lucide Icons'],
    icon: <Leaf className="w-6 h-6" />,
  },
];

export default function AboutPage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About UFAC Engine</h1>
            <p className="text-lg text-foreground/70">
              Revolutionizing PM-KISAN eligibility assessment through artificial intelligence
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            className="mb-16 p-8 rounded-lg bg-accent/10 border border-accent/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-foreground/80 leading-relaxed">
              The UFAC Engine (Unified Farmer Assessment and Computation) is designed to empower
              Indian farmers by streamlining access to government benefits. We leverage advanced
              artificial intelligence to provide accurate, instant eligibility assessments for the
              Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) scheme, ensuring no deserving farmer is
              left behind.
            </p>
          </motion.div>

          {/* Timeline Section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Journey Timeline</h2>

            <div className="space-y-8">
              {TIMELINE_EVENTS.map((event, index) => (
                <motion.div
                  key={index}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-accent mt-2"></div>
                    {index !== TIMELINE_EVENTS.length - 1 && (
                      <div className="w-1 h-24 bg-gradient-to-b from-accent to-accent/20"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-accent">{event.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{event.title}</h3>
                      <p className="text-foreground/70">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Tech Stack Section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Technology Stack</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {techStack.map((stack, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="p-6 h-full border-border bg-card hover:border-accent/50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-accent">{stack.icon}</div>
                      <h3 className="text-lg font-semibold text-foreground">{stack.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stack.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* PM-KISAN Information */}
          <motion.section
            className="mb-16 p-8 rounded-lg border border-border bg-card"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">About PM-KISAN Scheme</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-accent">✓</span> Overview
                </h3>
                <p className="text-foreground/70">
                  The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central government scheme
                  launched in 2019 to supplement income for farmers. It provides direct income
                  support to all landholding farmers across the country.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-accent">✓</span> Key Features
                </h3>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Annual support: ₹6,000 per farmer family</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Paid in three installments of ₹2,000 each</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Covers around 2 hectares of cultivable land</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Direct transfer to bank accounts via DBT mode</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-accent">✓</span> Eligibility Criteria
                </h3>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Must be an Indian citizen and farmer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Age 18 years or above</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Land holding up to 2 hectares</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Annual household income not exceeding ₹5,00,000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Not a government employee or high income tax payer</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            className="text-center p-8 rounded-lg bg-accent/10 border border-accent/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-foreground/70 mb-6">
              Have questions about UFAC Engine or PM-KISAN eligibility? We're here to help.
            </p>
            <div className="space-y-2 text-foreground/80">
              <p>
                <span className="font-semibold">Email:</span> support@ufacengine.in
              </p>
              <p>
                <span className="font-semibold">Phone:</span> +91 1800-UFAC-HELP
              </p>
              <p>
                <span className="font-semibold">Hours:</span> Monday - Friday, 9 AM - 6 PM IST
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </LayoutWrapper>
  );
}
