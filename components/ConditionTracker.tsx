
import React from 'react';
import type { Condicao, CondicaoNome } from '../types';
import { CONDICOES_DATA } from '../constants';

interface ConditionTrackerProps {
  condition: Condicao;
  onLevelChange: (name: CondicaoNome, level: number) => void;
}

const ConditionTracker: React.FC<ConditionTrackerProps> = ({ condition, onLevelChange }) => {
  const data = CONDICOES_DATA[condition.name];

  const handleLevelChange = (delta: number) => {
    const newLevel = Math.max(0, Math.min(3, condition.level + delta));
    onLevelChange(condition.name, newLevel);
  };

  const getBackgroundColor = () => {
    switch (condition.level) {
      case 1:
        return 'bg-yellow-900/40 border-yellow-700/60';
      case 2:
        return 'bg-orange-900/60 border-orange-700/80';
      case 3:
        return 'bg-red-900/80 border-red-600';
      default:
        return 'bg-gray-700/30 border-gray-600/50';
    }
  };

  return (
    <div className={`p-3 rounded-md border transition-colors duration-300 ${getBackgroundColor()}`}>
      <div className="flex justify-between items-center">
        <span className="font-bold text-gray-200">{condition.name}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleLevelChange(-1)}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold w-6 h-6 rounded-full transition-colors">-</button>
          <span className="text-lg font-bold w-4 text-center text-white">{condition.level}</span>
          <button
            onClick={() => handleLevelChange(1)}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold w-6 h-6 rounded-full transition-colors">+</button>
        </div>
      </div>
      {condition.level > 0 && (
        <p className="mt-2 text-sm text-gray-300 italic">
          {data.levels[condition.level] || 'Efeito desconhecido.'}
        </p>
      )}
    </div>
  );
};

export default ConditionTracker;
