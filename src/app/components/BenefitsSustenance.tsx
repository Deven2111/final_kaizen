// components/BenefitsSustenance.tsx
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import type { KaizenFormData } from '@/types/index';

interface Props {
  register: UseFormRegister<KaizenFormData>;
}

export default function BenefitsSustenance({ register }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6 mt-6"> 
      <div className="border p-4 rounded-md"> 
        <h3 className="font-bold text-lg mb-4">BENEFITS:</h3> 
        <div className="space-y-2">
          <div className="flex gap-2">
            <label htmlFor="benefitsP" className="w-6 shrink-0"> 
              P:
            </label>
            <input 
              {...register('benefits.p')} 
              id="benefitsP"
              type="text" 
              className="flex-1 border px-2 py-1 rounded focus:outline-none focus:ring-blue-500" 
            />
          </div>
          {/* ... other benefit inputs ... */}
          <div className="flex gap-2">
            <label htmlFor="benefitsM" className="w-6 shrink-0">
              M:
            </label>
            <input 
              {...register('benefits.m')}
              id="benefitsM" 
              type="text" 
              className="flex-1 border px-2 py-1 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="border p-4 rounded-md"> 
        <h3 className="font-bold text-lg mb-4">KAIZEN SUSTENANCE:</h3> 
        <div className="space-y-2">
          <div>
            <label htmlFor="whatToDo" className="block mb-1">WHAT TO DO:</label>
            <textarea
              {...register('kaizenSustenance.whatToDo')}
              id="whatToDo" 
              className="w-full h-20 border px-2 py-1 rounded focus:outline-none focus:ring-blue-500" 
            />
          </div>
          <div>
            <label htmlFor="howToDo" className="block mb-1">HOW TO DO:</label> 
            <textarea
              {...register('kaizenSustenance.howToDo')}
              id="howToDo" 
              className="w-full h-20 border px-2 py-1 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="frequency" className="block mb-1">FREQUENCY:</label>
            <input
              {...register('kaizenSustenance.frequency')}
              id="frequency" 
              type="text"
              className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
