
import React, { useState, useMemo, useCallback } from 'react';
import type { Character, Atributos, Pericia, Condicao, SanguessugaState } from './types';
import { ClasseSanguinea, Atributo, CondicaoNome, ConsumedBloodType } from './types';
import { MAX_ATTRIBUTE_POINTS, MIN_ATTRIBUTE_VALUE, MAX_ATTRIBUTE_VALUE, INITIAL_PERICIAS_COUNT, ABILITIES_DATA } from './constants';
import InfoCard from './components/InfoCard';
import ConditionTracker from './components/ConditionTracker';
import AbilityDisplay from './components/AbilityDisplay';
import GeminiAssistant from './components/GeminiAssistant';

const LOCAL_STORAGE_KEY = 'vozesDaMinhaCabecaSheet';

const App: React.FC = () => {
    const [character, setCharacter] = useState<Character>({
        name: "Aventureiro",
        level: 1,
        classe: ClasseSanguinea.Puro,
        atributos: { [Atributo.Corpo]: 0, [Atributo.Mente]: 0, [Atributo.Carisma]: 0 },
        pericias: Array.from({ length: INITIAL_PERICIAS_COUNT }, (_, i) => ({ id: i + 1, name: "" })),
        condicoes: [
            { name: CondicaoNome.Sangramento, level: 0 },
            { name: CondicaoNome.Exaustao, level: 0 },
            { name: CondicaoNome.Desespero, level: 0 },
            { name: CondicaoNome.Marcado, level: 0 },
            { name: CondicaoNome.Corrompido, level: 0 },
        ],
        sanguessugaState: { consumedType: ConsumedBloodType.None, doses: 0 },
        notes: "",
        imageUrl: "",
        equipment: {
            arma: "",
            diversos: "",
            pericias: {},
        },
    });

    const isDead = useMemo(() => character.condicoes.some(c => c.level >= 3), [character.condicoes]);
    const [deathModalDismissed, setDeathModalDismissed] = useState(false);
    
    const totalAttributePoints = useMemo(() => Object.values(character.atributos).reduce((sum, val) => sum + val, 0), [character.atributos]);

    const proficiencyBonus = useMemo(() => {
        if (character.classe === ClasseSanguinea.Puro && character.level >= 5) return 6;
        if (character.level >= 4) return 4;
        return 2;
    }, [character.level, character.classe]);
    
    const numPericias = useMemo(() => {
        let count = INITIAL_PERICIAS_COUNT;
        if (character.level >= 2) count++;
        if (character.classe === ClasseSanguinea.Puro) {
            count = 3; 
            if (character.level >= 3) count = 5;
        }
        return count;
    }, [character.level, character.classe]);

    const updatePericiasList = useCallback((count: number) => {
        setCharacter(prev => {
            const newPericias = [...prev.pericias];
            while (newPericias.length < count) {
                newPericias.push({ id: Date.now() + newPericias.length, name: "" });
            }
            return { ...prev, pericias: newPericias.slice(0, count) };
        });
    }, []);

    React.useEffect(() => {
        updatePericiasList(numPericias);
    }, [numPericias, updatePericiasList]);

    React.useEffect(() => {
        if (!isDead) {
            setDeathModalDismissed(false);
        }
    }, [isDead]);

    const handleCharacterChange = <K extends keyof Character>(key: K, value: Character[K]) => {
        setCharacter(prev => ({ ...prev, [key]: value }));
    };

    const handleClassChange = (newClass: ClasseSanguinea) => {
        setCharacter(prev => {
            const newState = {...prev, classe: newClass};
            
            const isSanguessugaPlus = newClass === ClasseSanguinea.Sanguessuga_AB_Plus;
            const isSanguessugaMinus = newClass === ClasseSanguinea.Sanguessuga_AB_Minus;

            if (!isSanguessugaPlus && !isSanguessugaMinus) {
                 newState.sanguessugaState = { consumedType: ConsumedBloodType.None, doses: 0 };
            } else {
                const currentConsumed = newState.sanguessugaState.consumedType;
                if (isSanguessugaPlus && ![ConsumedBloodType.A_Plus, ConsumedBloodType.B_Plus, ConsumedBloodType.None].includes(currentConsumed)) {
                    newState.sanguessugaState = { ...newState.sanguessugaState, consumedType: ConsumedBloodType.None };
                }
                if (isSanguessugaMinus && ![ConsumedBloodType.A_Minus, ConsumedBloodType.B_Minus, ConsumedBloodType.None].includes(currentConsumed)) {
                    newState.sanguessugaState = { ...newState.sanguessugaState, consumedType: ConsumedBloodType.None };
                }
            }
            
            return newState;
        });
    };

    const handleLevelChange = (newLevel: number) => {
        const level = Math.max(1, Math.min(5, newLevel));
        handleCharacterChange('level', level);
    };

    const handleAttributeChange = (attr: Atributo, value: string) => {
        const numValue = parseInt(value, 10) || 0;
        const clampedValue = Math.max(MIN_ATTRIBUTE_VALUE, Math.min(MAX_ATTRIBUTE_VALUE, numValue));
        setCharacter(prev => ({
            ...prev,
            atributos: { ...prev.atributos, [attr]: clampedValue },
        }));
    };

    const handlePericiaChange = (id: number, name: string) => {
        const newPericias = character.pericias.map(p => p.id === id ? { ...p, name } : p);
        handleCharacterChange('pericias', newPericias);
    };
    
    const handleConditionChange = (name: CondicaoNome, level: number) => {
        const newConditions = character.condicoes.map(c => c.name === name ? { ...c, level } : c);
        handleCharacterChange('condicoes', newConditions);
    };

    const handleSanguessugaChange = <K extends keyof SanguessugaState>(key: K, value: SanguessugaState[K]) => {
        setCharacter(prev => ({...prev, sanguessugaState: {...prev.sanguessugaState, [key]: value}}));
    };

    const handleEquipmentChange = (type: 'arma' | 'diversos' | 'pericia', value: string, periciaId?: number) => {
        setCharacter(prev => {
            const newEquipment = { ...prev.equipment };
            if (type === 'arma' || type === 'diversos') {
                newEquipment[type] = value;
            } else if (type === 'pericia' && periciaId !== undefined) {
                newEquipment.pericias = { ...newEquipment.pericias, [periciaId]: value };
            }
            return { ...prev, equipment: newEquipment };
        });
    };
    
    const saveCharacter = useCallback(() => {
        try {
            const characterJson = JSON.stringify(character);
            localStorage.setItem(LOCAL_STORAGE_KEY, characterJson);
            alert('Ficha salva com sucesso!');
        } catch (error) {
            console.error("Erro ao salvar a ficha:", error);
            alert('Ocorreu um erro ao salvar a ficha.');
        }
    }, [character]);

    const loadCharacter = useCallback(() => {
        try {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedData) {
                const loadedCharacter = JSON.parse(savedData);
                setCharacter(loadedCharacter);
                alert('Ficha carregada com sucesso!');
            } else {
                alert('Nenhuma ficha salva foi encontrada.');
            }
        } catch (error) {
            console.error("Erro ao carregar a ficha:", error);
            alert('Ocorreu um erro ao carregar a ficha. Os dados podem estar corrompidos.');
        }
    }, []);

    const SanguessugaPanel = () => {
      if (character.classe !== ClasseSanguinea.Sanguessuga_AB_Plus && character.classe !== ClasseSanguinea.Sanguessuga_AB_Minus) return null;
      
      const consumedAbilityTypeMap = {
          [ConsumedBloodType.A_Plus]: ClasseSanguinea.Bruto,
          [ConsumedBloodType.A_Minus]: ClasseSanguinea.Estancador,
          [ConsumedBloodType.B_Plus]: ClasseSanguinea.Espinhoso,
          [ConsumedBloodType.B_Minus]: ClasseSanguinea.Refinador,
          [ConsumedBloodType.None]: ClasseSanguinea.None
      }

      const consumedAbilityClass = consumedAbilityTypeMap[character.sanguessugaState.consumedType];
      const consumedAbilities = ABILITIES_DATA[consumedAbilityClass] || {};
      
      return (
        <InfoCard title="Alquimia do Sangue (Sanguessuga)">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">Tipo Consumido</label>
              <select 
                value={character.sanguessugaState.consumedType}
                onChange={e => handleSanguessugaChange('consumedType', e.target.value as ConsumedBloodType)}
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
                onChange={e => handleSanguessugaChange('doses', parseInt(e.target.value, 10))}
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
      )
    }


    return (
        <div className="bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8 bg-fixed" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')"}}>
            <div className="max-w-7xl mx-auto space-y-6">
                {isDead && !deathModalDismissed && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4" role="alertdialog" aria-modal="true" aria-labelledby="death-modal-title">
                        <div className="relative text-center p-8 border-4 border-red-700 bg-gray-900 rounded-lg shadow-2xl max-w-lg w-full">
                             <button
                                onClick={() => setDeathModalDismissed(true)}
                                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                aria-label="Fechar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h2 id="death-modal-title" className="text-5xl md:text-6xl font-cinzel text-red-600">PERSONAGEM MORTO</h2>
                            <p className="text-gray-300 mt-2">Uma condição atingiu o nível 3.</p>
                            <p className="text-gray-400 mt-4 text-sm">Você pode fechar este aviso para continuar editando a ficha.</p>
                        </div>
                    </div>
                )}
                
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
                            onChange={(e) => handleCharacterChange('imageUrl', e.target.value)}
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
                                onChange={(e) => handleCharacterChange('name', e.target.value)}
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
                                        onChange={(e) => handleLevelChange(parseInt(e.target.value, 10))}
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
                                    onClick={saveCharacter}
                                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
                                >
                                    Salvar Ficha
                                </button>
                                <button
                                    onClick={loadCharacter}
                                    className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
                                >
                                    Carregar Ficha
                                </button>
                            </div>
                        </div>
                    </div>
                </header>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-6">
                        <InfoCard title="Classe Sanguínea">
                            <select
                                value={character.classe}
                                onChange={(e) => handleClassChange(e.target.value as ClasseSanguinea)}
                                className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
                            >
                                {Object.values(ClasseSanguinea).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </InfoCard>

                        <InfoCard title="Atributos">
                             <div className="space-y-3">
                                {Object.values(Atributo).map(attr => (
                                    <div key={attr} className="flex justify-between items-center">
                                        <label className="text-lg font-bold text-gray-300">{attr}</label>
                                        {/* Desktop Input */}
                                        <input
                                            type="number"
                                            value={character.atributos[attr]}
                                            onChange={(e) => handleAttributeChange(attr, e.target.value)}
                                            className="hidden sm:block w-24 bg-gray-900 border border-gray-600 rounded-md p-1 text-center text-xl text-white"
                                        />
                                        {/* Mobile Select */}
                                        <select
                                            value={character.atributos[attr]}
                                            onChange={(e) => handleAttributeChange(attr, e.target.value)}
                                            className="block sm:hidden w-24 bg-gray-900 border border-gray-600 rounded-md p-2 text-center text-lg text-white"
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
                            <div className={`text-center text-sm mt-2 p-1 rounded-md ${totalAttributePoints !== MAX_ATTRIBUTE_POINTS ? 'text-yellow-400 bg-yellow-900/50' : 'text-green-400 bg-green-900/50'}`}>
                                Pontos distribuídos: {totalAttributePoints} / {MAX_ATTRIBUTE_POINTS}
                            </div>
                        </InfoCard>

                        <InfoCard title="Perícias">
                             <div className="space-y-2">
                                {character.pericias.map(pericia => (
                                    <input
                                        key={pericia.id}
                                        type="text"
                                        placeholder="Nome da Perícia..."
                                        value={pericia.name}
                                        onChange={(e) => handlePericiaChange(pericia.id, e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
                                    />
                                ))}
                            </div>
                        </InfoCard>
                    </div>

                    <div className="space-y-6">
                        <InfoCard title="Condições">
                            {character.condicoes.map(cond => (
                                <ConditionTracker key={cond.name} condition={cond} onLevelChange={handleConditionChange} />
                            ))}
                        </InfoCard>
                         <SanguessugaPanel />
                    </div>

                    <div className="space-y-6">
                       <InfoCard title="Habilidades e Progressão">
                            <AbilityDisplay classe={character.classe} level={character.level} />
                        </InfoCard>
                        <InfoCard title="Equipamentos">
                            <div className="space-y-3">
                                <div>
                                    <label htmlFor="arma-equip" className="block text-sm font-medium text-gray-300 mb-1">Arma</label>
                                    <input
                                        id="arma-equip"
                                        type="text"
                                        placeholder="Ex: Pistola, Faca..."
                                        value={character.equipment.arma}
                                        onChange={(e) => handleEquipmentChange('arma', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
                                    />
                                </div>
                                {character.pericias.map((pericia, index) => (
                                    <div key={pericia.id}>
                                        <label htmlFor={`pericia-equip-${pericia.id}`} className="block text-sm font-medium text-gray-300 mb-1">
                                            {pericia.name || `Equipamento da Perícia ${index + 1}`}
                                        </label>
                                        <input
                                            id={`pericia-equip-${pericia.id}`}
                                            type="text"
                                            placeholder="Equipamento relacionado..."
                                            value={character.equipment.pericias[pericia.id] || ''}
                                            onChange={(e) => handleEquipmentChange('pericia', e.target.value, pericia.id)}
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
                                        value={character.equipment.diversos}
                                        onChange={(e) => handleEquipmentChange('diversos', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
                                    />
                                </div>
                            </div>
                        </InfoCard>
                         <InfoCard title="Anotações">
                            <textarea
                                value={character.notes}
                                onChange={(e) => handleCharacterChange('notes', e.target.value)}
                                rows={5}
                                placeholder="Descreva a história, aparência, e anotações gerais do seu personagem aqui..."
                                className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:ring-red-500 focus:border-red-500"
                            />
                        </InfoCard>
                    </div>
                </div>
            </div>
            <GeminiAssistant character={character} />
        </div>
    );
};

export default App;