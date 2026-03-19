'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PM_KISAN_RULES } from '@/lib/constants';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce.number().min(18, 'Age must be at least 18').max(100, 'Invalid age'),
  landHolding: z.coerce
    .number()
    .min(0.01, 'Land holding must be at least 0.01 hectares')
    .max(2, 'Land holding cannot exceed 2 hectares'),
  annualIncome: z.coerce
    .number()
    .min(0, 'Income must be non-negative')
    .max(500000, 'Annual income exceeds limit'),
  cropCategory: z.string().min(1, 'Please select a crop category'),
});

type FormData = z.infer<typeof formSchema>;

interface EligibilityFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function EligibilityForm({ onSubmit, isLoading = false }: EligibilityFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      age: undefined,
      landHolding: undefined,
      annualIncome: undefined,
      cropCategory: '',
    },
  });

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Full Name</label>
        <Input
          {...register('fullName')}
          placeholder="Enter your full name"
          className={errors.fullName ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Age</label>
          <Input
            {...register('age')}
            type="number"
            placeholder="18-100"
            min="18"
            max="100"
            className={errors.age ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.age && <p className="text-sm text-red-500">{errors.age.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Land Holding (hectares)
          </label>
          <Input
            {...register('landHolding')}
            type="number"
            placeholder="0.01 - 2"
            step="0.01"
            min="0.01"
            max="2"
            className={errors.landHolding ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.landHolding && (
            <p className="text-sm text-red-500">{errors.landHolding.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Annual Household Income (INR)
        </label>
        <Input
          {...register('annualIncome')}
          type="number"
          placeholder="Up to 5,00,000"
          min="0"
          max="500000"
          className={errors.annualIncome ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {errors.annualIncome && (
          <p className="text-sm text-red-500">{errors.annualIncome.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Primary Crop Category</label>
        <Controller
          name="cropCategory"
          control={control}
          render={({ field }) => (
            <Select value={field.value || ''} onValueChange={field.onChange}>
              <SelectTrigger className={errors.cropCategory ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select a crop category" />
              </SelectTrigger>
              <SelectContent>
                {PM_KISAN_RULES.cropCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.cropCategory && (
          <p className="text-sm text-red-500">{errors.cropCategory.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        disabled={isLoading}
      >
        {isLoading ? 'Checking Eligibility...' : 'Check Eligibility'}
      </Button>
    </motion.form>
  );
}
