import React from 'react';

interface DeathModalProps {
    isDead: boolean;
    dismissed: boolean;
    onDismiss: () => void;
}

const DeathModal: React.FC<DeathModalProps> = ({ isDead, dismissed, onDismiss }) => {
    if (!isDead || dismissed) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4" role="alertdialog" aria-modal="true" aria-labelledby="death-modal-title">
            <div className="relative text-center p-8 border-4 border-red-700 bg-gray-900 rounded-lg shadow-2xl max-w-lg w-full">
                 <button
                    onClick={onDismiss}
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
    );
};

export default DeathModal;
