import React from 'react';
import { MissionRank } from '../../types/event';
import { getRankLabel, getRankColor } from '../../data/events';

interface MissionGradeProps {
  rank: MissionRank;
  size?: 'sm' | 'md' | 'lg';
}

const MissionGrade: React.FC<MissionGradeProps> = ({
  rank,
  size = 'sm',
}) => {
  const color = getRankColor(rank);
  const label = getRankLabel(rank);
  const isSpecial = rank === 'SPECIAL_GRADE';

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-3 py-1',
    lg: 'text-sm px-4 py-1.5',
  };

  return (
    <span
      className={`
        inline-flex items-center font-mono tracking-wider uppercase font-semibold
        border relative overflow-hidden
        ${sizeClasses[size]}
        ${isSpecial ? 'animate-pulse-glow' : ''}
      `}
      style={{
        color: color,
        borderColor: `${color}66`,
        backgroundColor: `${color}11`,
        boxShadow: isSpecial ? `0 0 15px ${color}33` : undefined,
      }}
    >
      {isSpecial && (
        <span
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            animation: 'scanline 2s linear infinite',
          }}
        />
      )}
      {label}
    </span>
  );
};

export default MissionGrade;