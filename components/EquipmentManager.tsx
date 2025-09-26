import React from 'react';
import type { Equipment, Pericia } from '../types';
import InfoCard from './InfoCard';

interface EquipmentManagerProps {
    equipment: Equipment;
    pericias: Pericia[];
    onEquipmentChange: (type: 'arma' | 'diversos' | 'pericia', value: string, periciaId?: number) => void;
}

const EquipmentManager: React.FC<EquipmentManagerProps> = ({ equipment, pericias, onEquipmentChange }) => {
    return (
        <InfoCard title="Equipamentos">
            <div className="space-y-3">
                <div>
                    <label htmlFor="arma-equip" className="block text-sm font-medium text-gray-300 mb-1">Arma</label>
                    <input
                        id="arma-equip"
                        type="text"
                        placeholder="Ex: Pistola, Faca..."
                        value={equipment.arma}
                        onChange={(e) => onEquipmentChange('arma', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
                    />
                </div>
                {pericias.map((pericia, index) => (
                    <div key={pericia.id}>
                        <label htmlFor={`pericia-equip-${pericia.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                            {pericia.name || `Equipamento da Perícia ${index + 1}`}
                        </label>
                        <input
                            id={`pericia-equip-${pericia.id}`}
                            type="text"
                            placeholder="Equipamento relacionado..."
                            value={equipment.pericias[pericia.id] || ''}
                            onChange={(e) => onEquipmentChange('pericia', e.target.value, pericia.id)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                ))}
                <div>
                    <label htmlFor="diversos-equip" className="block text-sm font-medium text-gray-300 mb-1">Diversos</label>
                    <input
                        id="diversos-equip"
                        type="text"
                        placeholder="Mochila, celular, etc..."
                        value={equipment.diversos}
                        onChange={(e) => onEquipmentChange('diversos', e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
                    />
                </div>
            </div>
        </InfoCard>
    );
};

export default EquipmentManager;
