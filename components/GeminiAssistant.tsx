import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { Character } from '../types';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const RULEBOOK_CONTEXT = `
== INÍCIO DO LIVRO DE REGRAS "VOZES DA MINHA CABEÇA 2E" ==

[Página 1]
VOZES DA MINHA CABECA 2ª EDIÇÃO
O mundo não te mata de uma vez. Ele te quebra aos poucos.

[Página 2]
NEPHELOROS UM REINO DE SANGUE E NÉVOA
Vozes da minha Cabeça 2ª Edição

[Página 4]
SUMÁRIO
INTRODUÇÃO 4
CENÁRIO 4
JOGANDO O JOGO 5
OS TRÊS ATRIBUTOS 5
Perícias 5
TESTE DE AÇÃO 5
SISTEMA DE COMBATE: PONTOS DE SUPERIORIDADE 6
CRIAÇÃO DE PERSONAGENS 9
CLASSES SANGUÍNEAS 11

[Página 5]
INTRODUÇÃO
Bem-vindo ao mundo de Vozes da Minha Cabeça, um sistema de jogo focado em estratégia, narrativa e as consequências de suas ações em um cenário onde o sangue dita a ordem.

CENÁRIO
Em Nepheloros, uma capital fria e enevoada, a crueldade é lei. A sociedade é brutal e estratificada. A guerra é constante e cultos de sangue espreitam nas sombras. A religião prega que o universo nasceu do sangue: evaporado virou Ar, coagulado virou Terra, e líquido virou Mares.

SANGUE E STATUS
A estrutura social é baseada no sangue. Nobres têm "sangue puro", enquanto plebeus não. O status e a força de uma pessoa vêm diretamente de seu sangue. A nobreza tem privilégios, mas o dinheiro também pode comprar poder e influência.

[Página 6]
JOGANDO O JOGO
O sistema usa D6. Baseia-se em dois pilares: Atributos e Pontos de Superioridade em combate.

OS TRÊS ATRIBUTOS
* Corpo: Força, Agilidade, Combate
* Mente: Percepção, Conhecimento, Foco
* Carisma: Persuasão, Manipulação, Empatia

PERÍCIAS
Perícias são marcas da experiência, não treinamentos. Representam o passado, traumas e cicatrizes. Cada personagem começa com 2 Perícias únicas, como "Bem Viajado" ou "Sobrevivente de Prisão".

TESTE DE AÇÃO
Para ações incertas, o processo é:
1. Role 1d6.
2. Adicione Modificadores: Atributo relevante, Bônus de Perícia (se aplicável), e outros (vantagens, condições).
3. Compare com a CD (Classe de Dificuldade): Se o resultado for igual ou maior que a CD (geralmente entre 4 e 10), a ação é bem-sucedida.

BÔNUS DE PERÍCIA
O bônus de perícia é definido pelo Nível e Classe Sanguínea do personagem.

CLASSE DE DIFICULDADES (CD)
Representa a dificuldade da tarefa. Quanto maior a CD, mais difícil.

[Página 7]
CLASSES DE DIFICULDADE COMUNS
* 4: Fácil
* 6: Normal
* 8: Difícil
* 10+: Quase Impossível

SISTEMA DE COMBATE: PONTOS DE SUPERIORIDADE
É narrativo, sem turnos e sem Pontos de Vida. A vitória é para os mais preparados.

A ORDEM EM COMBATE
Conflitos são resolvidos acumulando Pontos de Superioridade através de ações inteligentes, táticas ou brutais.
1. O mestre define a Dificuldade de Conflito.
2. Jogadores acumulam Pontos de Superioridade.
3. O combate é narrado e resolvido.

VITÓRIA E DERROTA
Se os Pontos de Superioridade dos jogadores superam a Dificuldade do Conflito, eles são Vitoriosos. Caso contrário, são Derrotados. Cada jogador rola 1d4 para ver a consequência.
DERROTA (d4):
1: Sofre 2 níveis de Condição.
2: Sofre 1 nível de Condição.
3: Sofre 1 Condição, inimigo enfraquece.
4: Nada, inimigo enfraquece.
VITÓRIA (d4):
1: Vitória com 1 Condição leve.
2: Ileso, sem bônus.
3: Benefício narrativo (item, aliado).
4: Benefício coletivo (recupera recursos).

CURA
Recuperar-se exige tempo e contexto.
* Nível 1: Descanso seguro (sono, comida, abrigo).
* Nível 2: Ajuda especializada (ritual, curandeiro).

[Página 8]
CONDIÇÕES
Representam efeitos colaterais de confrontos. Acumulam-se em Níveis (1, 2...). Chegar ao Nível 3 em qualquer condição resulta em MORTE.

CONDIÇÕES MECÂNICAS:
* Sangramento: Nv1: -1 em testes de Corpo. Nv2: Desvantagem em ações físicas contínuas.
* Exaustão: Nv1: -1 em testes de Mente. Nv2: Não pode se beneficiar de perícias mentais.
* Desespero: Nv1: -1 em testes de Carisma. Nv2: -1 adicional em testes de Mente.

CONDIÇÕES NARRATIVAS:
* Marcado: Nv1: Sendo observado/seguido. Nv2: Atrai inimigos ou prejudica rituais.
* Corrompido: Nv1: Sussurros, visões. Nv2: Pode perder o controle.

MORTE DE PERSONAGEM
Ocorre quando qualquer condição ultrapassa o Nível 2 (atinge Nível 3). É um colapso irreversível.

[Página 10]
CRIAÇÃO DE PERSONAGENS
O personagem é uma mistura de traços mecânicos, ganchos narrativos e imaginação.
Escolhas: Classe Sanguínea, história pregressa, distribuição de atributos.

SESSÃO ZERO
É uma discussão inicial sobre temas, como os personagens se conhecem, elementos de horror, e o tom narrativo.

CRIE O SEU PERSONAGEM
1. ESCOLHA SUA CLASSE:
* Bruto (A+): Porrada (Corpo)
* Estancador (A-): Ajudar (Mente e Carisma)
* Espinhoso (B+): BDSM (Corpo)
* Refinador (B-): Troca Equivalente (Carisma)
* Estagnador (O+): Ser o melhor (Corpo e Mente)
* Acelerador (O-): Saber de tudo (Mente)
* Sanguessuga (AB+/AB-): Flexível

2. ATRIBUTOS:
Distribua 3 pontos entre Corpo, Mente e Carisma. Mínimo: -1 (dá +1 ponto extra). Máximo: +3.

3. PERÍCIAS:
Escolha 2 Perícias narrativas.

[Página 11]
4. EQUIPAMENTOS E ORIGENS
Decididos com o mestre.

PROGRESSÃO
* Nível 1: Poder de classe nível 1
* Nível 2: +1 nova Perícia
* Nível 3: Poder de classe nível 3
* Nível 4: Proficiência +4 (em vez de +2)
* Nível 5: Poder de classe nível 5
Consumir uma Esfera de Sangue concede nível 1 de um tipo sanguíneo.

[Página 12]
CLASSES SANGUÍNEAS
Cada linhagem tem uma herança.

* BRUTO (A+): Transforma o próprio sangue em força.
- Nv1: +2 em testes de Corpo.
- Nv3: Começa combate com +1 Ponto de Superioridade.
- Nv5: Vantagem em testes de Corpo (2d6, usa o maior).

* ESTANCADORES (A-): Guardiões que curam e protegem aliados.
- Nv1: Cura 1 nível de Condição em aliado (apenas nível 1).
- Nv3: Pode emprestar proficiência.
- Nv5: Impede aliado de receber condição Nível 1.

* ESPINHOSOS (B+): Usam o sangue derramado como arma, usando a dor como catalisador.
- Nv1: Pode causar Sangramento em si para obter bônus.
- Nv3: Imune a Sangramento externo.
- Nv5: Usa poderes sem receber Sangramento.

* REFINADORES (B-): Manipuladores do sangue alheio.
- Nv1: Dá proficiência causando Sangramento.
- Nv3: Cura Sangramento (mesmo Nível 2).
- Nv5: Concede vantagem ao custo de Sangramento alheio.

* ESTAGNADORES (O+): Silenciam o próprio sangue para se tornarem indetectáveis.
- Nv1: +2 para não ser percebido + ignora efeitos de Sangramento 1.
- Nv3: Cura Desespero (mesmo Nível 2).
- Nv5: Ignora efeitos de Sangramento, Exaustão e Desespero N1.

* ACELERADORES (O-): Rastreadores que ouvem o sangue dos outros.
- Nv1: +2 para perceber seres com sangue, rastrear, detectar mentiras.
- Nv3: Identifica tipo sanguíneo e poderes.
- Nv5: Vantagem + pode prever ações.

[Página 13]
SANGUESSUGAS (AB+/AB-):
Consomem drogas de sangue de outros tipos para ganhar poderes temporários, mas se corrompem.
* AB+ consome de A+ ou B+.
* AB- consome de A- ou B-.
* Consumir tipo incompatível causa +1 nível de Corrupção.
EFEITOS (Doses por dia):
- Nv1: 1 dose/dia → Poder Nível 1 do tipo consumido.
- Nv3: 1 dose/dia → Poder Nível 3 do tipo consumido.
- Nv5: 2 doses/dia → Poder Nível 5 do tipo consumido.
Cada dose além do limite causa +1 de Corrupção.

PUROS (SEM PODER SANGUÍNEO):
Não têm dons sanguíneos, mas são livres da corrupção.
- Nv1: +1 Perícia adicional (3 total).
- Nv3: +1 Perícia adicional (5 total).
- Nv5: Proficiência +6 (em vez de +4).

== FIM DO LIVRO DE REGRAS ==
`;

const HEMA_PROFILE = `Atue como assistente de regras, e ficha de personagem, para jogadores do fan-game Vozes da Minha Cabeça 2ª Edição. Leve em consideração as regras contidas no livro "VdmC 2e - Players Handbook" (fornecido abaixo) e na minha atual ficha de personagem passada no formato JSON.

Perfil:
* Você é Hema. É uma companheira de confiança e um braço direito para mim. É **organizada, proativa e amigável de uma forma sarcástica e brincalhona**. Se expressa de forma **clara e direta**. Pensa como a **dona experiente de uma Editora de livros de RPGs de mesa, uma aventureira astuta**. Sua personalidade não pode interferir com a clareza das respostas (clareza é prioridade).
* Usa um vocabulário fácil de entender.
* Mantém o contexto em toda a conversa, garante que as ideias e respostas estão relacionadas com as fases anteriores da conversa, e ao contexto de "Vozes da Minha Cabeça 2e".

Sua função é:
* Esclarecer e tirar dúvidas sobre as regras e processos do jogo, usando o livro de regras fornecido.
* Explicar as regras de criação de personagem (Classe Sanguínea, Atributos, Perícias, Equipamentos e Origem) quando necessário.
* Colaborar comigo e buscar informações para tornar as ideias mais relevantes para as minhas necessidades e interesses.
* Trazer informações de forma sucinta e objetiva, tirando dúvidas de forma tópica.

**Formato da Resposta:**
* **Seja breve e direta:** Forneça a resposta mais concisa e prática possível primeiro. Ideal para consultas rápidas durante o jogo.
* **Ofereça aprofundamento:** No final da sua resposta, sempre ofereça a opção de detalhar mais o assunto ou de ajudar com outra questão.`

const systemInstruction = `${HEMA_PROFILE}\n\n${RULEBOOK_CONTEXT}`;


const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a.5.5 0 0 0 .5.5h0a.5.5 0 0 0 .5-.5V4.5A2.5 2.5 0 0 1 15.5 2"/>
        <path d="M16 8.3c1.5.2 2.9.8 4.1 1.7a2 2 0 0 1 0 3.4C18.4 15.6 15.3 16 12 16c-3.3 0-6.4-.4-8.9-2.6a2 2 0 0 1 0-3.4c1.2-.9 2.6-1.5 4.1-1.7"/>
        <path d="M12 16v1.5a.5.5 0 0 0 .5.5h0a.5.5 0 0 0 .5-.5V16"/>
        <path d="M8 8.3C6.5 8.5 5.1 9.1 3.9 10a2 2 0 0 0 0 3.4C6.4 15.6 9.3 16 12 16"/>
        <path d="M12 16c2.5 0 4.8-.3 6.9-1.3"/>
        <path d="M22 12c-2.3 2-5.3 3.4-8.5 3.8"/>
        <path d="M3.5 15.2c1.4.8 3.1 1.3 4.9 1.6"/>
        <path d="M12 22a2.5 2.5 0 0 0 2.5-2.5v-1.2a.5.5 0 0 0-.5-.5h0a.5.5 0 0 0-.5.5v1.2A2.5 2.5 0 0 1 9.5 22"/>
    </svg>
);

interface GeminiAssistantProps {
    character: Character;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ character }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && !chat) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: { systemInstruction },
                });
                setChat(newChat);
                setChatHistory([{ role: 'model', text: 'Olá! Eu sou Hema. Como posso ajudar com seu personagem ou com as regras de *Vozes da Minha Cabeça*?' }]);
            } catch (error) {
                console.error("Failed to initialize Gemini Assistant:", error);
                setChatHistory([{ role: 'model', text: 'Desculpe, não consegui me conectar. Verifique se a API Key está configurada corretamente no ambiente.' }]);
            }
        }
    }, [isOpen, chat]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);
    
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSendMessage = useCallback(async () => {
        if (!currentMessage.trim() || !chat || isLoading) return;

        const userMessage = currentMessage;
        setCurrentMessage('');
        setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        const promptWithContext = `Ficha Atual do Personagem (JSON):\n\`\`\`json\n${JSON.stringify(character, null, 2)}\n\`\`\`\n\nMinha Pergunta: ${userMessage}`;

        try {
            const stream = await chat.sendMessageStream({ message: promptWithContext });
            
            setChatHistory(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of stream) {
                const chunkText = chunk.text;
                setChatHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1].text += chunkText;
                    return newHistory;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setChatHistory(prev => {
                 const newHistory = [...prev];
                 newHistory[newHistory.length - 1].text = 'Ocorreu um erro ao processar sua solicitação. Tente novamente.';
                 return newHistory;
            });
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    }, [currentMessage, chat, isLoading, character]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-500 text-white rounded-full p-4 shadow-2xl transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-500/50 animate-pulse"
                aria-label="Abrir assistente Hema"
            >
                <BrainIcon />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
                    <div
                        className="w-full max-w-2xl h-[80vh] bg-gray-800/80 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="hema-assistant-title"
                    >
                        <header className="p-4 border-b border-red-500/30 flex justify-between items-center">
                            <h2 id="hema-assistant-title" className="text-xl font-cinzel text-red-500">Hema - Sua Assistente</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-700"
                                aria-label="Fechar assistente"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </header>

                        <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                            {chatHistory.map((msg, index) => (
                                <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-red-900/50 flex-shrink-0 flex items-center justify-center font-bold text-red-400">H</div>}
                                    <div className={`max-w-md lg:max-w-lg p-3 rounded-xl ${msg.role === 'user' ? 'bg-gray-700/60' : 'bg-red-800/70'}`}>
                                        <div className="prose prose-sm prose-invert" dangerouslySetInnerHTML={{ __html: md.render(msg.text) }} />
                                    </div>
                                </div>
                            ))}
                             {isLoading && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-red-900/50 flex-shrink-0 flex items-center justify-center font-bold text-red-400">H</div>
                                    <div className="max-w-md lg:max-w-lg p-3 rounded-xl bg-gray-700/60 flex items-center space-x-2">
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-0"></span>
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-150"></span>
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-300"></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-red-500/30">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                                className="flex gap-3"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    placeholder="Pergunte sobre regras, sua ficha..."
                                    className="flex-1 bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    className="bg-red-600 hover:bg-red-500 text-white font-bold p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    disabled={isLoading || !currentMessage.trim()}
                                    aria-label="Enviar mensagem"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GeminiAssistant;