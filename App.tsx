import React, { useState, useEffect } from 'react';
import { useCharacterSheet } from './hooks/useCharacterSheet';

import InfoCard from './components/InfoCard';
import ConditionTracker from './components/ConditionTracker';
import AbilityDisplay from './components/AbilityDisplay';
import GeminiAssistant from './components/GeminiAssistant';
import CharacterHeader from './components/CharacterHeader';
import DeathModal from './components/DeathModal';
import ClassSelector from './components/ClassSelector';
import AttributeEditor from './components/AttributeEditor';
import SkillsList from './components/SkillsList';
import SanguessugaPanel from './components/SanguessugaPanel';
import EquipmentManager from './components/EquipmentManager';
import NotesEditor from './components/NotesEditor';

const App: React.FC = () => {
    const {
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
    } = useCharacterSheet();

    const [deathModalDismissed, setDeathModalDismissed] = useState(false);
    
    useEffect(() => {
        if (!isDead) {
            setDeathModalDismissed(false);
        }
    }, [isDead]);

    return (
        <div className="bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8 bg-fixed" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')"}}>
            <div className="max-w-7xl mx-auto space-y-6">
                <DeathModal 
                    isDead={isDead} 
                    dismissed={deathModalDismissed} 
                    onDismiss={() => setDeathModalDismissed(true)} 
                />
                
                <CharacterHeader
                    character={character}
                    proficiencyBonus={proficiencyBonus}
                    onCharacterChange={handleCharacterChange}
                    onLevelChange={handleLevelChange}
                    onSave={saveCharacter}
                    onLoad={loadCharacter}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <ClassSelector 
                            value={character.classe} 
                            onChange={handleClassChange} 
                        />
                        <AttributeEditor 
                            attributes={character.atributos}
                            totalPoints={totalAttributePoints}
                            onAttributeChange={handleAttributeChange}
                        />
                        <SkillsList 
                            pericias={character.pericias}
                            onPericiaChange={handlePericiaChange}
                        />
                    </div>

                    {/* Middle Column */}
                    <div className="space-y-6">
                        <InfoCard title="Condições">
                            {character.condicoes.map(cond => (
                                <ConditionTracker key={cond.name} condition={cond} onLevelChange={handleConditionChange} />
                            ))}
                        </InfoCard>
                         <SanguessugaPanel 
                            character={character} 
                            onSanguessugaChange={handleSanguessugaChange} 
                         />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <AbilityDisplay classe={character.classe} level={character.level} />
                        <EquipmentManager 
                            equipment={character.equipment}
                            pericias={character.pericias}
                            onEquipmentChange={handleEquipmentChange}
                        />
                         <NotesEditor 
                            value={character.notes}
                            onChange={(value) => handleCharacterChange('notes', value)}
                         />
                    </div>
                </div>
            </div>
            <GeminiAssistant character={character} />
        </div>
    );
};

export default App;
