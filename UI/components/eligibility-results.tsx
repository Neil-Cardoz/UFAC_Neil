'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface EligibilityResult {
  isEligible: boolean;
  fullName: string;
  reasons: string[];
  eligibilityPercentage: number;
}

interface EligibilityResultsProps {
  result: EligibilityResult;
  onNewCheck: () => void;
}

export function EligibilityResults({ result, onNewCheck }: EligibilityResultsProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-6"
        variants={itemVariants}
      >
        {result.isEligible ? (
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        ) : (
          <XCircle className="w-12 h-12 text-red-500" />
        )}
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {result.isEligible ? 'Eligible for PM-KISAN' : 'Not Currently Eligible'}
          </h2>
          <p className="text-foreground/70">Assessment for {result.fullName}</p>
        </div>
      </motion.div>

      {/* Eligibility Score */}
      <motion.div
        className="p-6 rounded-lg bg-card border border-border"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-foreground font-medium">Eligibility Score</span>
          <span className="text-2xl font-bold text-accent">{result.eligibilityPercentage}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-accent h-full"
            initial={{ width: 0 }}
            animate={{ width: `${result.eligibilityPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Reasons */}
      {result.reasons.length > 0 && (
        <motion.div
          className="p-6 rounded-lg bg-card border border-border"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-foreground/60" />
            <h3 className="font-semibold text-foreground">
              {result.isEligible ? 'Eligibility Details' : 'Reasons for Ineligibility'}
            </h3>
          </div>
          <ul className="space-y-2">
            {result.reasons.map((reason, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2 text-foreground/70"
                variants={itemVariants}
              >
                <span className="text-accent mt-1">•</span>
                <span>{reason}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Next Steps */}
      {result.isEligible && (
        <motion.div
          className="p-6 rounded-lg bg-accent/10 border border-accent/20"
          variants={itemVariants}
        >
          <h3 className="font-semibold text-foreground mb-4">Next Steps</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="step1" className="border-border">
              <AccordionTrigger className="hover:text-accent">
                1. Register on Official Portal
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Visit the PM-KISAN official website and register using your Aadhar number and
                mobile number.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step2" className="border-border">
              <AccordionTrigger className="hover:text-accent">
                2. Submit Required Documents
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Upload land records (Jamabandi/FIR), bank account details, and Aadhar card.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step3" className="border-border">
              <AccordionTrigger className="hover:text-accent">
                3. Await Verification & Benefits
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Your application will be verified, and you'll receive ₹6,000 annually in three
                installments.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        variants={itemVariants}
      >
        <Button
          onClick={onNewCheck}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Check Another Farmer
        </Button>
        <Link href="/agent-flow" className="flex-1">
          <Button
            variant="outline"
            className="w-full border-accent text-accent hover:bg-accent/10"
          >
            View Agent Flow
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
