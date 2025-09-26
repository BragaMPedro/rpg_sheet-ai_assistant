import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Character, SanguessugaState, Pericia } from '../types';
import { ClasseSanguinea, Atributo, CondicaoNome, ConsumedBloodType } from '../types';
import { MAX_ATTRIBUTE_POINTS, MIN_ATTRIBUTE_VALUE, MAX_ATTRIBUTE_VALUE, INITIAL_PERICIAS_COUNT } from '../constants';

const LOCAL_STORAGE_KEY = 'vozesDaMinhaCabecaSheet';

const initialCharacterState: Character = {
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
};

export const useCharacterSheet = () => {
    const [character, setCharacter] = useState<Character>(initialCharacterState);

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

    const isDead = useMemo(() => character.condicoes.some(c => c.level >= 3), [character.condicoes]);
    
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

    useEffect(() => {
        updatePericiasList(numPericias);
    }, [numPericias, updatePericiasList]);

    return {
        character,
        isDead,
        totalAttributePoints,
        proficiencyBonus,
        handleCharacterChange,
        handleClassChange,
        handleLevelChange,
        handleAttributeChange,
        handlePericiaChange,
        handleConditionChange,
        handleSanguessugaChange,
        handleEquipmentChange,
        saveCharacter,
        loadCharacter
    };
};
