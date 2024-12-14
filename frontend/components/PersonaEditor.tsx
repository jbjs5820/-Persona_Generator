import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Persona, PersonaFormData } from '../types/persona';

// Validation schema
const personaSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  demographics: z.object({
    age: z.number().min(0).max(120),
    gender: z.string().min(1, 'Gender is required'),
    location: z.string().min(1, 'Location is required'),
    occupation: z.string().min(1, 'Occupation is required'),
    income: z.string().min(1, 'Income is required'),
    education: z.string().min(1, 'Education is required'),
  }),
  psychographics: z.object({
    interests: z.array(z.string()).min(1, 'At least one interest is required'),
    values: z.array(z.string()).min(1, 'At least one value is required'),
    lifestyle: z.string().min(1, 'Lifestyle is required'),
    personality: z.string().min(1, 'Personality is required'),
    socialMediaUsage: z.array(z.string()),
  }),
  goalsAndPainPoints: z.object({
    goals: z.array(z.string()).min(1, 'At least one goal is required'),
    painPoints: z.array(z.string()).min(1, 'At least one pain point is required'),
    challenges: z.array(z.string()).min(1, 'At least one challenge is required'),
    motivations: z.array(z.string()).min(1, 'At least one motivation is required'),
  }),
});

interface PersonaEditorProps {
  persona: Persona;
  onSave: (updatedPersona: PersonaFormData) => Promise<void>;
}

export default function PersonaEditor({ persona, onSave }: PersonaEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PersonaFormData>({
    resolver: zodResolver(personaSchema),
    defaultValues: {
      name: persona.name,
      demographics: persona.demographics,
      psychographics: persona.psychographics,
      goalsAndPainPoints: persona.goalsAndPainPoints,
    },
  });

  const onSubmit = async (data: PersonaFormData) => {
    try {
      setIsSubmitting(true);
      await onSave(data);
      toast.success('Persona updated successfully!');
    } catch (error) {
      toast.error('Failed to update persona. Please try again.');
      console.error('Error updating persona:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
      </div>

      {/* Demographics */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Demographics</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              {...register('demographics.age', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.demographics?.age && (
              <p className="mt-1 text-sm text-red-600">{errors.demographics.age.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <input
              type="text"
              {...register('demographics.gender')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.demographics?.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.demographics.gender.message}</p>
            )}
          </div>
          {/* Add other demographic fields similarly */}
        </div>
      </div>

      {/* Psychographics */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Psychographics</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Interests</label>
            <input
              type="text"
              {...register('psychographics.interests')}
              placeholder="Enter interests separated by commas"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.psychographics?.interests && (
              <p className="mt-1 text-sm text-red-600">{errors.psychographics.interests.message}</p>
            )}
          </div>
          {/* Add other psychographic fields similarly */}
        </div>
      </div>

      {/* Goals and Pain Points */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Goals and Pain Points</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Goals</label>
            <textarea
              {...register('goalsAndPainPoints.goals')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.goalsAndPainPoints?.goals && (
              <p className="mt-1 text-sm text-red-600">{errors.goalsAndPainPoints.goals.message}</p>
            )}
          </div>
          {/* Add other goals and pain points fields similarly */}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
