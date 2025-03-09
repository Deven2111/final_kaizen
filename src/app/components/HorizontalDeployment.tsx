// components/HorizontalDeployment.tsx
import React from 'react';
import { UseFormRegister, useFieldArray } from 'react-hook-form';
import type { KaizenFormData } from '@/types/index';

interface Props {
  register: UseFormRegister<KaizenFormData>;
  control: any;
}

export default function HorizontalDeployment({ register, control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'horizontalDeployment'
  });

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-4">SCOPE & PLAN FOR HORIZONTAL DEPLOYMENT</h3>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">EQUIPMENT</th>
            <th className="border border-gray-300 px-4 py-2 text-left">RESPONSIBILITY</th>
            <th className="border border-gray-300 px-4 py-2 text-left">STATUS</th>
            <th className="border border-gray-300 px-4 py-2 text-left">TARGET DATE</th>
            <th className="border border-gray-300 px-4 py-2 text-left">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id} className="hover:bg-gray-100"> 
              <td className="border border-gray-300 px-4 py-2">
                <input
                  {...register(`horizontalDeployment.${index}.equipment`)}
                  className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-blue-500" 
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  {...register(`horizontalDeployment.${index}.responsibility`)}
                  className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-blue-500"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  {...register(`horizontalDeployment.${index}.status`)}
                  className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="date"
                  {...register(`horizontalDeployment.${index}.targetDate`)}
                  className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-blue-500"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400" 
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() =>
          append({
            equipment: '',
            responsibility: '',
            status: 'Pending',
            targetDate: new Date()
          })
        }
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" 
      >
        Add Row
      </button>
    </div>
  );
}
