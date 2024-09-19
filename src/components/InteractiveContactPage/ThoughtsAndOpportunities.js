// src/components/ThoughtsAndOpportunities.js
import React from 'react';
import { Clock } from 'lucide-react';

const ThoughtsAndOpportunities = ({
  formType,
  recentThoughts,
  expectedOpportunities,
  availabilityTimes,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold mb-4 text-purple-700">
      {formType === 'general' ? 'Recent Thoughts' : 'Expected Opportunities'}
    </h2>
    {formType === 'general' ? (
      <ul className="space-y-2">
        {recentThoughts.map((thought, index) => (
          <li key={index} className="bg-purple-50 p-3 rounded">{thought}</li>
        ))}
      </ul>
    ) : (
      <>
        <ul className="list-disc list-inside space-y-2 mb-4">
          {expectedOpportunities.map((opportunity, index) => (
            <li key={index} className="text-gray-700">{opportunity}</li>
          ))}
        </ul>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Clock className="mr-2" /> Available Time
          </h3>
          <p className="text-gray-700">Daily: {availabilityTimes.daily}</p>
          <p className="text-gray-700">Full Time: {availabilityTimes.fullTime}</p>
        </div>
      </>
    )}
  </div>
);

export default ThoughtsAndOpportunities;