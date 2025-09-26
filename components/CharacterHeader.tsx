import React from 'react';
import type { Character } from '../types';

interface CharacterHeaderProps {
  character: Character;
  proficiencyBonus: number;
  onCharacterChange: <K extends keyof Character>(key: K, value: Character[K]) => void;
  onLevelChange: (level: number) => void;
  onSave: () => void;
  onLoad: () => void;
}

const CharacterHeader: React.FC<CharacterHeaderProps> = ({ character, proficiencyBonus, onCharacterChange, onLevelChange, onSave, onLoad }) => {
    return (
        <header className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
            <div className="flex-shrink-0 w-40 text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gray-700/50 border-2 border-gray-600 flex items-center justify-center overflow-hidden text-gray-500">
                     {character.imageUrl ? (
                        <img src={character.imageUrl} alt="Retrato do Personagem" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
                <input 
                    type="text"
                    placeholder="URL da Imagem"
                    value={character.imageUrl}
                    onChange={(e) => onCharacterChange('imageUrl', e.target.value)}
                    className="w-full mt-2 bg-gray-900 border border-gray-600 rounded-md p-1 text-xs text-center text-white"
                />
            </div>
            <div className="flex-grow text-center sm:text-left w-full">
                <div>
                    <label htmlFor='characterName' className="text-sm text-gray-400 font-cinzel">Nome do Personagem</label>
                    <input
                        id="characterName"
                        type="text"
                        value={character.name}
                        onChange={(e) => onCharacterChange('name', e.target.value)}
                        className="w-full text-3xl sm:text-4xl sm:text-left text-center font-cinzel font-bold bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md p-1 -m-1"
                    />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                        <div className="text-right">
                           <label className="text-sm text-gray-400">Nível</label>
                            <input
                                type="number"
                                value={character.level}
                                onChange={(e) => onLevelChange(parseInt(e.target.value, 10))}
                                min="1" max="5"
                                className="w-20 text-2xl font-bold bg-gray-900 border border-gray-600 rounded-md p-1 text-center text-white"
                            />
                        </div>
                         <div className="text-right">
                           <span className="text-sm text-gray-400">Proficiência</span>
                           <div className="text-2xl font-bold text-red-400 w-20 p-1 text-center">+{proficiencyBonus}</div>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 justify-center sm:justify-end">
                        <button
                            onClick={onSave}
                            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
                        >
                            Salvar Ficha
                        </button>
                        <button
                            onClick={onLoad}
                            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
                        >
                            Carregar Ficha
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default CharacterHeader;
