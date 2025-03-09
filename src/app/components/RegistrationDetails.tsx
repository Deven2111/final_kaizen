// components/RegistrationDetails.tsx
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import type { KaizenFormData } from '@/types/index';

interface Props {
  register: UseFormRegister<KaizenFormData>;
}

export default function RegistrationDetails({ register }: Props) {
  return (
    <div className="mt-6 border-t pt-4"> 
      <div className="grid grid-cols-3 gap-4"> 
        <div>
          <label htmlFor="regNo" className="block mb-1">Reg. No. / Date:</label> 
          <div className="flex gap-2"> 
            <input
              {...register('registration.regNo')}
              id="regNo" 
              type="text"
              className="flex-1 border px-2 py-1 rounded focus:outline-none focus:ring-blue-500" 
              placeholder="Reg. No."
            />
            <input
              {...register('registration.date')}
              type="date"
              className="flex-1 border px-2 py-1 rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="registeredBy" className="block mb-1">Registered By:</label>
          <input
            {...register('registration.registeredBy')}
            id="registeredBy" 
            type="text"
            className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-blue-500" 
          />
        </div>
        <div>
          <label htmlFor="managerSign" className="block mb-1">Manager's Sign:</label>
          <input
            {...register('registration.managerSign')}
            id="managerSign" 
            type="text"
            className="w-full border px-2 py-1 rounded focus:outline-none focus:ring-blue-500" 
          />
        </div>
      </div>
    </div>
  );
}
