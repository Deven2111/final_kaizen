// components/CostsSection.tsx
import React from 'react';
import { UseFormRegister, useWatch } from 'react-hook-form';
import type { KaizenFormData } from '@/types/index';

interface Props {
  register: UseFormRegister<KaizenFormData>;
  control: any;
}

export default function CostsSection({ register, control }: Props) {
  const materialCost = useWatch({
    control,
    name: 'costs.materialCost',
    defaultValue: 0
  });

  const labourCost = useWatch({
    control,
    name: 'costs.labourCost',
    defaultValue: 0
  });

  return (
    <div className="mt-6"> 
      <h3 className="font-bold text-lg mb-4">COST INCURRED FOR MAKING KAIZEN</h3>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">MATERIAL COST Rs.</th>
            <th className="border border-gray-300 px-4 py-2 text-left">LABOUR COST Rs.</th>
            <th className="border border-gray-300 px-4 py-2 text-left">TOTAL COST Rs.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2"> 
              <input
                type="number"
                {...register('costs.materialCost')}
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-blue-500"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                {...register('costs.labourCost')}
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-blue-500" 
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                value={Number(materialCost) + Number(labourCost)}
                readOnly
                className="w-full px-2 py-1 border rounded bg-gray-100 focus:outline-none" 
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

