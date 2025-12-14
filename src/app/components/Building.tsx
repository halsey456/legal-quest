// app/components/Building.tsx
// Компонент здания на карте города, представляет один блок обучения

'use client';

import { useState } from 'react';
import styles from './Building.module.css';

interface BuildingProps {
  block: {
    id: number;
    title: string;
    icon: string;
    position: { top: string; left: string };
    color: string;
    description?: string;
  };
  onClick: (block: any) => void;
}

export default function Building({ block, onClick }: BuildingProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`${styles.building} ${isHovered ? styles.hovered : ''}`}
      style={{
        top: block.position.top,
        left: block.position.left,
        backgroundColor: `rgba(${hexToRgb(block.color)}, 0.3)`,
        '--building-color': block.color,
      } as React.CSSProperties}
      onClick={() => onClick(block)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Контент здания */}
      <div className={styles.buildingContent}>
        <div className={styles.icon}>{block.icon}</div>
        <div className={styles.buildingInfo}>
          <span className={styles.blockNumber}>Блок {block.id}</span>
          <span className={styles.blockTitle}>{block.title}</span>
        </div>
      </div>
      
      {/* Всплывающая подсказка при наведении */}
      {isHovered && (
        <div className={styles.tooltip}>
          <p>{block.title}</p>
        </div>
      )}
    </div>
  );
}

// Вспомогательная функция для преобразования HEX в RGB
function hexToRgb(hex: string): string {
  hex = hex.replace('#', '');
  
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}