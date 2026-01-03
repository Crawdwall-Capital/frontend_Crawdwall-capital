'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { proposalAPI } from '@/lib/api';
import { ROUTES } from '@/constants';
import FileUpload from '@/components/FileUpload';

// Define validation schema
const proposalSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  amount: z.number().min(100, 'Amount must be at least $100').max(1000000, 'Amount cannot exceed $1,000,000'),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

export default function NewProposalPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      title: '',
      description: '',
      amount: 1000,
    },
  });

  const onSubmit = async (data: ProposalFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await proposalAPI.createProposal({
        title: data.title,
        description: data.description,
        amount: data.amount,
        documents: selectedFiles,
      });

      if (response.data.success) {
        // Redirect to proposals list
        router.push(ROUTES.ORGANIZER_PROPOSALS);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit proposal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Submit New Proposal</h1>
        <p className="mt-1 text-sm text-gray-500">
          Submit your event funding proposal for review
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Proposal Title
            </label>
            <div className="mt-1">
              <input
                id="title"
                type="text"
                {...register('title')}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Enter a descriptive title for your proposal"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Proposal Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                rows={6}
                {...register('description')}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Provide a detailed description of your event and funding needs"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Funding Amount (USD)
            </label>
            <div className="mt-1">
              <input
                id="amount"
                type="number"
                step="100"
                min="100"
                max="1000000"
                {...register('amount', { valueAsNumber: true })}
                className={`appearance-none block w-full px-3 py-2 border ${
                  errors.amount ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="Enter funding amount"
              />
              {errors.amount && (
                <p className="mt-2 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>
          </div>

          <div>
            <FileUpload
              onFileSelect={handleFileSelect}
              allowedTypes={['application/pdf']}
              maxFileSize={10}
              maxFiles={5}
              label="Supporting Documents"
              description="Upload PDF files with supporting documentation for your proposal (max 10MB each)"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push(ROUTES.ORGANIZER_PROPOSALS)}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Proposal'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}