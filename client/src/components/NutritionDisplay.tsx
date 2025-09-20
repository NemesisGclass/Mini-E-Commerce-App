'use client';

import React from 'react';
import { FruitNutrition } from '@/lib/fruityvice';
import { Leaf, Zap, Droplets, Scale } from 'lucide-react';

interface NutritionDisplayProps {
  nutrition: FruitNutrition;
}

const NutritionDisplay: React.FC<NutritionDisplayProps> = ({ nutrition }) => {
  const { nutritions } = nutrition;

  const nutritionItems = [
    {
      icon: <Zap className="w-5 h-5 text-black" />,
      label: 'Calories',
      value: `${nutritions.calories} kcal`,
      color: 'bg-gray-50 text-gray-800'
    },
    {
      icon: <Scale className="w-5 h-5 text-black" />,
      label: 'Protein',
      value: `${nutritions.protein}g`,
      color: 'bg-gray-50 text-gray-800'
    },
    {
      icon: <Leaf className="w-5 h-5 text-black" />,
      label: 'Carbohydrates',
      value: `${nutritions.carbohydrates}g`,
      color: 'bg-gray-50 text-gray-800'
    },
    {
      icon: <Droplets className="w-5 h-5 text-black" />,
      label: 'Sugar',
      value: `${nutritions.sugar}g`,
      color: 'bg-gray-50 text-gray-800'
    },
    {
      icon: <Scale className="w-5 h-5 text-black" />,
      label: 'Fat',
      value: `${nutritions.fat}g`,
      color: 'bg-gray-50 text-gray-800'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Nutritional Information</h3>
        <p className="text-sm text-gray-600">Per 100g serving</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nutritionItems.map((item, index) => (
          <div key={index} className={`${item.color} rounded-lg p-4 flex items-center space-x-3`}>
            {item.icon}
            <div>
              <div className="font-medium">{item.label}</div>
              <div className="text-sm opacity-80">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <p><strong>Family:</strong> {nutrition.family}</p>
          <p><strong>Genus:</strong> {nutrition.genus}</p>
          <p><strong>Order:</strong> {nutrition.order}</p>
        </div>
      </div>
    </div>
  );
};

export default NutritionDisplay;
