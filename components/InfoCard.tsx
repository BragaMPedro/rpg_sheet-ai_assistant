
import React from 'react';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg p-4 backdrop-blur-sm ${className}`}>
      <h2 className="text-xl font-bold text-red-500 font-cinzel border-b border-red-500/30 pb-2 mb-4">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
