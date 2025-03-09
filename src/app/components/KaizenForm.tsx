// components/KaizenForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { KaizenFormData } from '@/types/index';
import BenefitsSustenance from './BenefitsSustenance';
import HorizontalDeployment from '../components/HorizontalDeployment';
import CostsSection from '../components/CostsSection';
import RegistrationDetails from '../components/RegistrationDetails';

interface KaizenFormProps {
  onSubmit: (data: KaizenFormData) => Promise<void>;
}

export default function KaizenForm({ onSubmit }: KaizenFormProps) {
  const { register, handleSubmit, control, setValue } = useForm<KaizenFormData>();
  const [beforeImagePreview, setBeforeImagePreview] = useState<string>('');
  const [afterImagePreview, setAfterImagePreview] = useState<string>('');

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'beforeImage' | 'afterImage'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(field, file);
      const previewUrl = URL.createObjectURL(file);
      if (field === 'beforeImage') {
        setBeforeImagePreview(previewUrl);
      } else {
        setAfterImagePreview(previewUrl);
      }
    }
  };

  const handleFormSubmit = async (data: KaizenFormData) => {
    try {
      // Create FormData if there are files to upload
      if (data.beforeImage || data.afterImage) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        });
        await onSubmit(data);
      } else {
        await onSubmit(data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(handleFormSubmit)} 
      className="kaizen-form w-full max-w-7xl mx-auto p-6 bg-white rounded-md shadow-md"
    > 
      {/* Header Information */}
      <div className="grid grid-cols-2 gap-6 mb-6"> 
        <div className="space-y-4">
          <div>
            <label htmlFor="circleNo" className="block text-sm font-medium text-gray-700">
              CIRCLE NO./NAME:
            </label>
            <input
              {...register('circleNo')}
              type="text"
              id="circleNo" 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="dept" className="block text-sm font-medium text-gray-700">
              DEPT:
            </label>
            <input
              {...register('dept')}
              type="text"
              id="dept" 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {/* Add other header fields similarly */}
        </div>
      </div>

      {/* Problem and Countermeasure */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="problem" className="block text-sm font-medium text-gray-700">
            PROBLEM / PRESENT STATUS:
          </label>
          <textarea
            {...register('problem')}
            id="problem" 
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="countermeasure" className="block text-sm font-medium text-gray-700">
            COUNTERMEASURE:
          </label>
          <textarea
            {...register('countermeasure')}
            id="countermeasure" 
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
          />
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="beforeImage" className="block text-sm font-medium text-gray-700">
            Before Image:
          </label>
          <input
            type="file"
            accept="image/*"
            id="beforeImage" 
            onChange={(e) => handleImageUpload(e, 'beforeImage')}
            className="mt-1 block w-full"
          />
          {beforeImagePreview && (
            <img
              src={beforeImagePreview}
              alt="Before"
              className="mt-2 max-w-full h-auto rounded"
            />
          )}
        </div>
        <div>
          <label htmlFor="afterImage" className="block text-sm font-medium text-gray-700">
            After Image:
          </label>
          <input
            type="file"
            accept="image/*"
            id="afterImage"
            onChange={(e) => handleImageUpload(e, 'afterImage')}
            className="mt-1 block w-full"
          />
          {afterImagePreview && (
            <img
              src={afterImagePreview}
              alt="After"
              className="mt-2 max-w-full h-auto rounded"
            />
          )}
        </div>
      </div>

      {/* Include other components */}
      <BenefitsSustenance register={register} />
      <HorizontalDeployment register={register} control={control} />
      <CostsSection register={register} control={control} />
      <RegistrationDetails register={register} />

      {/* Submit Button */}
      <div className="flex justify-end mt-6"> 
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Kaizen Report
        </button>
      </div>
    </form>
  );
}

