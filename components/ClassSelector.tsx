import React from 'react';
import { ClasseSanguinea } from '../types';
import InfoCard from './InfoCard';

interface ClassSelectorProps {
    value: ClasseSanguinea;
    onChange: (newClass: ClasseSanguinea) => void;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({ value, onChange }) => {
    return (
        <InfoCard title="Classe Sanguínea">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as ClasseSanguinea)}
                className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
            >
                {Object.values(ClasseSanguinea).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </InfoCard>
    );
};

export default ClassSelector;
