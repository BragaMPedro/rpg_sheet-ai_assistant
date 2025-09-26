import React from 'react';
import type { Character, SanguessugaState } from '../types';
import { ClasseSanguinea, ConsumedBloodType } from '../types';
import { ABILITIES_DATA } from '../constants';
import InfoCard from './InfoCard';

interface SanguessugaPanelProps {
    character: Character;
    onSanguessugaChange: <K extends keyof SanguessugaState>(key: K, value: SanguessugaState[K]) => void;
}

const SanguessugaPanel: React.FC<SanguessugaPanelProps> = ({ character, onSanguessugaChange }) => {
    if (character.classe !== ClasseSanguinea.Sanguessuga_AB_Plus && character.classe !== ClasseSanguinea.Sanguessuga_AB_Minus) {
        return null;
    }
  
    const consumedAbilityTypeMap = {
      [ConsumedBloodType.A_Plus]: ClasseSanguinea.Bruto,
      [ConsumedBloodType.A_Minus]: ClasseSanguinea.Estancador,
      [ConsumedBloodType.B_Plus]: ClasseSanguinea.Espinhoso,
      [ConsumedBloodType.B_Minus]: ClasseSanguinea.Refinador,
      [ConsumedBloodType.None]: ClasseSanguinea.None
    };

    const consumedAbilityClass = consumedAbilityTypeMap[character.sanguessugaState.consumedType];
    const consumedAbilities = ABILITIES_DATA[consumedAbilityClass] || {};
      
    return (
        <InfoCard title="Alquimia do Sangue (Sanguessuga)">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Tipo Consumido</label>
              <select 
                value={character.sanguessugaState.consumedType}
                onChange={e => onSanguessugaChange('consumedType', e.target.value as ConsumedBloodType)}
                className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
              >
                <option value={ConsumedBloodType.None}>Nenhum</option>
                {character.classe === ClasseSanguinea.Sanguessuga_AB_Plus && (
                    <optgroup label="Compatível com AB+">
                        <option value={ConsumedBloodType.A_Plus}>Tipo A+</option>
                        <option value={ConsumedBloodType.B_Plus}>Tipo B+</option>
                    </optgroup>
                )}
                {character.classe === ClasseSanguinea.Sanguessuga_AB_Minus && (
                     <optgroup label="Compatível com AB-">
                        <option value={ConsumedBloodType.A_Minus}>Tipo A-</option>
                        <option value={ConsumedBloodType.B_Minus}>Tipo B-</option>
                    </optgroup>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Doses / Dia</label>
              <input 
                type="number"
                min="0"
                value={character.sanguessugaState.doses}
                onChange={e => onSanguessugaChange('doses', parseInt(e.target.value, 10))}
                className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          <p className="text-xs italic text-gray-400">Consumir tipo incompatível ou exceder o limite de doses causa +1 de Corrupção.</p>
          {character.sanguessugaState.consumedType !== ConsumedBloodType.None && (
            <div className="mt-4 space-y-2 border-t border-gray-700 pt-4">
              <h4 className="font-bold text-red-400">Poderes Adquiridos:</h4>
              {[1,3,5].map(lvl => {
                  const ability = consumedAbilities[lvl];
                  if (!ability) return null;
                  const canUse = (lvl === 1 && character.sanguessugaState.doses >= 1) || (lvl === 3 && character.sanguessugaState.doses >= 1) || (lvl === 5 && character.sanguessugaState.doses >= 2);
                  const unlockedByLevel = character.level >= lvl;

                  return (
                      <div key={lvl} className={`transition-opacity ${unlockedByLevel && canUse ? 'opacity-100' : 'opacity-50'}`}>
                          <p className="text-gray-200"><strong className="text-gray-400">Nível {lvl}:</strong> {ability.title}</p>
                          <p className="text-sm text-gray-300 italic">{ability.description}</p>
                      </div>
                  )
              })}
            </div>
          )}
        </InfoCard>
    );
};

export default SanguessugaPanel;
