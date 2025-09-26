import React from 'react';
import type { Atributos } from '../types';
import { Atributo } from '../types';
import { MAX_ATTRIBUTE_POINTS } from '../constants';
import InfoCard from './InfoCard';

interface AttributeEditorProps {
    attributes: Atributos;
    totalPoints: number;
    onAttributeChange: (attr: Atributo, value: string) => void;
}

const AttributeEditor: React.FC<AttributeEditorProps> = ({ attributes, totalPoints, onAttributeChange }) => {
    return (
        <InfoCard title="Atributos">
             <div className="space-y-3">
                {Object.values(Atributo).map(attr => (
                    <div key={attr} className="flex justify-between items-center">
                        <label className="text-lg font-bold text-gray-300">{attr}</label>
                        {/* Desktop Input */}
                        <input
                            type="number"
                            value={attributes[attr]}
                            onChange={(e) => onAttributeChange(attr, e.target.value)}
                            className="hidden lg:block w-24 bg-gray-900 border border-gray-600 rounded-md p-1 text-center text-xl text-white"
                        />
                        {/* Mobile Select */}
                        <select
                            value={attributes[attr]}
                            onChange={(e) => onAttributeChange(attr, e.target.value)}
                            className="block lg:hidden w-24 bg-gray-900 border border-gray-600 rounded-md p-2 text-center text-lg text-white"
                        >
                            <option value="-1">-1</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                ))}
            </div>
            <div className={`text-center text-sm mt-2 p-1 rounded-md ${totalPoints !== MAX_ATTRIBUTE_POINTS ? 'text-yellow-400 bg-yellow-900/50' : 'text-green-400 bg-green-900/50'}`}>
                Pontos distribuídos: {totalPoints} / {MAX_ATTRIBUTE_POINTS}
            </div>
        </InfoCard>
    );
};

export default AttributeEditor;
