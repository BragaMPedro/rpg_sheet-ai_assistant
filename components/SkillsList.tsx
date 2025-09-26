import React from 'react';
import type { Pericia } from '../types';
import InfoCard from './InfoCard';

interface SkillsListProps {
    pericias: Pericia[];
    onPericiaChange: (id: number, name: string) => void;
}

const SkillsList: React.FC<SkillsListProps> = ({ pericias, onPericiaChange }) => {
    return (
        <InfoCard title="Perícias">
             <div className="space-y-2">
                {pericias.map(pericia => (
                    <input
                        key={pericia.id}
                        type="text"
                        placeholder="Nome da Perícia..."
                        value={pericia.name}
                        onChange={(e) => onPericiaChange(pericia.id, e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
                    />
                ))}
            </div>
        </InfoCard>
    );
};

export default SkillsList;
