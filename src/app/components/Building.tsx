// app/components/Building.tsx
// Компонент здания на карте города, представляет 7 блоков обучения

'use client';

import { useState, useEffect } from 'react';
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
  const [currentStyle, setCurrentStyle] = useState({
    top: block.position.top,
    left: block.position.left,
    transform: 'scale(1)',
    width: '9vw',
    height: '9vw',
    isMobile: false
  });

  useEffect(() => {
    const updateResponsiveStyles = () => {
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 768;
      
      const originalTop = parseFloat(block.position.top);
      const originalLeft = parseFloat(block.position.left);
      
      let top = originalTop;
      let left = originalLeft;
      let scale = 1;
      let width = '9vw';
      let height = '9vw';

      //  Только для телефонов применяем новые позиции
      if (isMobile) {
        // УВЕЛИЧИВАЕМ БЛОКИ НА ТЕЛЕФОНАХ
        if (screenWidth < 360) {
          scale = 1.2;
          width = '11vw';
          height = '11vw';
        } else if (screenWidth < 480) {
          scale = 1.15;
          width = '10.5vw';
          height = '10.5vw';
        } else if (screenWidth < 576) {
          scale = 1.1;
          width = '10vw';
          height = '10vw';
        } else {
          scale = 1.05;
          width = '9.5vw';
          height = '9.5vw';
        }

        //  НАСТРОЙКИ ПОЗИЦИЙ
        switch(block.id) {
          case 1: // Блок 1 
            top = originalTop;       
            left = originalLeft - 5;
            break;
            
          case 2: // Блок 2 
            top = originalTop + 5;   
            left = originalLeft - 5; 
            break;
            
          case 3: // Блок 3 
            top = originalTop + 10;  
            left = originalLeft;     
            break;
            
          case 4: // Блок 4 
            top = originalTop + 5;   
            left = originalLeft;    
            break;
            
          case 5: // Блок 5 
            top = originalTop;       
            left = originalLeft + 5; 
            break;
            
          case 6: // Блок 6 
            top = originalTop - 5;   
            left = originalLeft - 5; 
            break;
            
          case 7: // Блок 7 
            top = originalTop - 5;   
            left = originalLeft + 5; 
            break;
        }

        // Защита от выхода за границы
        if (screenWidth < 480) {
          if (left < 5) left = 5;
          if (left > 95) left = 95;
          if (top < 5) top = 5;
          if (top > 95) top = 95;
          
          scale = 1.25;
          width = '11.5vw';
          height = '11.5vw';
        }
        
        if (screenWidth < 360) {
          scale = 1.3;
          width = '12vw';
          height = '12vw';
        }
      }

      setCurrentStyle({
        top: `${top}%`,
        left: `${left}%`,
        transform: `scale(${scale})`,
        width: width,
        height: height,
        isMobile
      });
    };

    updateResponsiveStyles();
    window.addEventListener('resize', updateResponsiveStyles);
    
    return () => {
      window.removeEventListener('resize', updateResponsiveStyles);
    };
  }, [block.position, block.id]);

  //  Используем type assertion для CSS переменных
  const buildingStyles: React.CSSProperties & {
    '--building-color'?: string;
  } = {
    position: 'absolute',
    top: currentStyle.top,
    left: currentStyle.left,
    transform: currentStyle.transform,
    width: currentStyle.width,
    height: currentStyle.height,
    backgroundColor: `rgba(${hexToRgb(block.color)}, 0.3)`,
    ['--building-color' as any]: block.color,
  };

  return (
    <div 
      className={`${styles.building} ${isHovered ? styles.hovered : ''}`}
      style={buildingStyles}
      onClick={() => onClick(block)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-block-id={block.id}
      data-mobile={currentStyle.isMobile}
    >
      <div className={styles.buildingContent}>
        <div className={styles.icon}>{block.icon}</div>
        <div className={styles.buildingInfo}>
          <span className={styles.blockNumber}>Блок {block.id}</span>
          <span className={styles.blockTitle}>{block.title}</span>
        </div>
      </div>
      
      {isHovered && (
        <div className={styles.tooltip}>
          <p>{block.title}</p>
        </div>
      )}
    </div>
  );
}

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