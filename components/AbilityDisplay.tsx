import React from 'react';
import { ClasseSanguinea } from '../types';
import { ABILITIES_DATA, LEVEL_PROGRESSION } from '../constants';
import InfoCard from './InfoCard';

interface AbilityDisplayProps {
  classe: ClasseSanguinea;
  level: number;
}

const AbilityDisplay: React.FC<AbilityDisplayProps> = ({ classe, level }) => {
  if (classe === ClasseSanguinea.None) {
    return <p className="text-gray-400 italic">Selecione uma classe para ver as habilidades.</p>;
  }

  const classAbilities = ABILITIES_DATA[classe] || {};
  const allPossibleLevels = [1, 2, 3, 4, 5];

  return (
    <InfoCard title="Habilidades e Progressão">
      <div className="space-y-4">
        {allPossibleLevels.map(lvl => {
          const ability = classAbilities[lvl];
          const progression = LEVEL_PROGRESSION[lvl as keyof typeof LEVEL_PROGRESSION];
          const isUnlocked = level >= lvl;
          const isClassAbility = !!ability;
          const isGeneralProgression = !!progression;

          if (!isClassAbility && !isGeneralProgression) {
            return null;
          }
          
          const finalAbility = (isClassAbility) ? ability : progression;

          if (!finalAbility) return null;

          return (
            <div key={lvl} className={`p-3 rounded-md transition-all duration-300 ${isUnlocked ? 'bg-red-900/20 border border-red-800' : 'bg-gray-700/20 border border-transparent opacity-60'}`}>
              <h4 className="font-bold text-gray-200">
                Nível {lvl}: <span className={isUnlocked ? 'text-red-400' : 'text-gray-400'}>{finalAbility.title}</span>
              </h4>
              <p className="text-sm text-gray-300">{finalAbility.description}</p>
            </div>
          );
        })}
      </div>
    </InfoCard>
  );
};

export default AbilityDisplay;