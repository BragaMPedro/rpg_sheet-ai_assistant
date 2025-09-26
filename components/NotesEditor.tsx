import React from 'react';
import InfoCard from './InfoCard';

interface NotesEditorProps {
    value: string;
    onChange: (notes: string) => void;
}

const NotesEditor: React.FC<NotesEditorProps> = ({ value, onChange }) => {
    return (
        <InfoCard title="Anotações">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={5}
                placeholder="Descreva a história, aparência, e anotações gerais do seu personagem aqui..."
                className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
            />
        </InfoCard>
    );
};

export default NotesEditor;
