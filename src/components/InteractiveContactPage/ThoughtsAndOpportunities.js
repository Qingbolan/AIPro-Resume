// src/components/ThoughtsAndOpportunities.js
import React from 'react';
import { Clock } from 'lucide-react';

const ThoughtsAndOpportunities = ({
  formType,
  recentThoughts,
  expectedOpportunities,
  availabilityTimes,
  isDarkMode,
}) => {
  const themeColors = isDarkMode
    ? {
        bg: 'bg-gray-800',
        text: 'text-white',
        highlight: 'bg-purple-900',
        secondary: 'text-gray-300',
        listItem: 'bg-gray-700',
      }
    : {
        bg: 'bg-white',
        text: 'text-gray-800',
        highlight: 'bg-purple-50',
        secondary: 'text-gray-700',
        listItem: 'bg-purple-50',
      };

  return (
    <div className={`${themeColors.bg} ${themeColors.text} p-6 rounded-lg shadow-lg`}>
      <h2 className="text-2xl font-semibold mb-4 text-purple-500">
        {formType === 'general' ? 'Recent Thoughts' : 'Expected Opportunities'}
      </h2>
      {formType === 'general' ? (
        <ul className="space-y-2">
          {recentThoughts.map((thought, index) => (
            <li key={index} className={`${themeColors.listItem} p-3 rounded`}>{thought}</li>
          ))}
        </ul>
      ) : (
        <>
          <ul className="list-disc list-inside space-y-2 mb-4">
            {expectedOpportunities.map((opportunity, index) => (
              <li key={index} className={themeColors.secondary}>{opportunity}</li>
            ))}
          </ul>
          <div className={`${themeColors.highlight} p-4 rounded-lg`}>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Clock className="mr-2" /> Available Time
            </h3>
            <p className={themeColors.secondary}>Daily: {availabilityTimes.daily}</p>
            <p className={themeColors.secondary}>Full Time: {availabilityTimes.fullTime}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ThoughtsAndOpportunities;