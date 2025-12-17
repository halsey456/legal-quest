// app/theory/page.tsx
// Страница теории с лекциями и тестами по всем блокам квеста

'use client';

import { blocksData } from '../data/blocks';
import { useState } from 'react';

// Интерфейс для модального окна
interface ModalData {
  isOpen: boolean;
  blockId: number;
  title: string;
  color: string;
}

// Подробная теория для каждого блока
const detailedTheory = {
  1: {
    title: "Правонарушения и его виды",
    content: `
      <h3>Что такое правонарушение?</h3>
      <p><strong>Правонарушение</strong> — это виновное, противоправное деяние (действие или бездействие) деликтоспособного лица, причиняющее вред обществу, государству или отдельным лицам.</p>
      
      <h3>Основные признаки правонарушения:</h3>
      <ul>
        <li><strong>Противоправность</strong> — нарушение норм права</li>
        <li><strong>Общественная вредность</strong> — причинение вреда общественным отношениям</li>
        <li><strong>Виновность</strong> — наличие вины в форме умысла или неосторожности</li>
        <li><strong>Деликтоспособность субъекта</strong> — способность нести ответственность</li>
      </ul>
      
      <h3>Виды правонарушений:</h3>
      <h4>1. Административные правонарушения</h4>
      <p>Нарушения общественного порядка, правил дорожного движения, пожарной безопасности и др. Примеры: мелкое хулиганство, нарушение ПДД, безбилетный проезд.</p>
      
      <h4>2. Гражданско-правовые правонарушения (деликты)</h4>
      <p>Нарушения в сфере имущественных и личных неимущественных отношений. Примеры: неисполнение договорных обязательств, причинение имущественного вреда, нарушение авторских прав.</p>
      
      <h4>3. Дисциплинарные правонарушения</h4>
      <p>Нарушения трудовой, учебной, служебной дисциплины. Примеры: опоздание на работу, прогул, нарушение должностных инструкций.</p>
      
      <h3>Ответственность за правонарушения:</h3>
      <p>Каждому виду правонарушения соответствует свой вид юридической ответственности: административная, гражданско-правовая или дисциплинарная.</p>
    `
  },
  2: {
    title: "Преступление и его категории",
    content: `
      <h3>Что такое преступление?</h3>
      <p><strong>Преступление</strong> — это виновно совершенное общественно опасное деяние, запрещенное Уголовным кодексом под угрозой наказания.</p>
      
      <h3>Отличительные признаки преступления:</h3>
      <ul>
        <li><strong>Общественная опасность</strong> — основной признак, отличающий преступление от правонарушения</li>
        <li><strong>Уголовная противоправность</strong> — запрещенность деяния Уголовным кодексом</li>
        <li><strong>Виновность</strong> — совершение умышленно или по неосторожности</li>
        <li><strong>Наказуемость</strong> — наличие угрозы уголовного наказания</li>
      </ul>
      
      <h3>Категории преступлений по степени тяжести:</h3>
      <h4>1. Преступления небольшой тяжести</h4>
      <p>Умышленные и неосторожные деяния, за которые максимальное наказание не превышает 3 лет лишения свободы.</p>
      
      <h4>2. Преступления средней тяжести</h4>
      <p>Умышленные деяния с наказанием до 5 лет, неосторожные — свыше 3 лет лишения свободы.</p>
      
      <h4>3. Тяжкие преступления</h4>
      <p>Умышленные деяния с наказанием до 10 лет лишения свободы.</p>
      
      <h4>4. Особо тяжкие преступления</h4>
      <p>Умышленные деяния, за которые предусмотрено наказание в виде лишения свободы на срок свыше 10 лет или более строгое наказание.</p>
      
      <h3>Значение категоризации:</h3>
      <p>Определяет вид и размер наказания, влияет на назначение наказания, освобождение от ответственности, погашение судимости.</p>
    `
  },
  3: {
    title: "Виды юридической ответственности",
    content: `
      <h3>Понятие юридической ответственности</h3>
      <p><strong>Юридическая ответственность</strong> — это обязанность лица претерпевать определенные лишения государственно-властного характера за совершенное правонарушение.</p>
      
      <h3>Основные виды юридической ответственности:</h3>
      
      <h4>1. Уголовная ответственность</h4>
      <p><strong>Основание:</strong> совершение преступления</p>
      <p><strong>Меры:</strong> лишение свободы, исправительные работы, штраф, ограничение свободы и др.</p>
      <p><strong>Цель:</strong> наказание виновного, восстановление социальной справедливости</p>
      
      <h4>2. Административная ответственность</h4>
      <p><strong>Основание:</strong> совершение административного правонарушения</p>
      <p><strong>Меры:</strong> административный штраф, арест, лишение специального права</p>
      <p><strong>Цель:</strong> предупреждение правонарушений, поддержание общественного порядка</p>
      
      <h4>3. Гражданско-правовая ответственность</h4>
      <p><strong>Основание:</strong> нарушение гражданских прав и обязанностей</p>
      <p><strong>Меры:</strong> возмещение убытков, уплата неустойки, компенсация морального вреда</p>
      <p><strong>Цель:</strong> восстановление нарушенных прав, возмещение вреда</p>
      
      <h4>4. Дисциплинарная ответственность</h4>
      <p><strong>Основание:</strong> нарушение трудовой, служебной, учебной дисциплины</p>
      <p><strong>Меры:</strong> замечание, выговор, увольнение, отчисление</p>
      <p><strong>Цель:</strong> поддержание дисциплины, воспитание</p>
      
      <h3>Принципы юридической ответственности:</h3>
      <ul>
        <li>Законность</li>
        <li>Справедливость</li>
        <li>Неотвратимость</li>
        <li>Индивидуализация</li>
        <li>Целесообразность</li>
      </ul>
    `
  },
  4: {
    title: "Юридические последствия",
    content: `
      <h3>Юридические последствия правонарушений и преступлений</h3>
      <p>Совершение противоправных деяний влечет за собой различные юридические последствия, которые могут существенно повлиять на жизнь человека.</p>
      
      <h3>Основные виды последствий:</h3>
      
      <h4>1. Имущественные последствия</h4>
      <ul>
        <li><strong>Штрафы и пени:</strong> денежные взыскания в пользу государства или потерпевшего</li>
        <li><strong>Возмещение ущерба:</strong> компенсация причиненного материального вреда</li>
        <li><strong>Конфискация имущества:</strong> принудительное изъятие имущества в доход государства</li>
      </ul>
      
      <h4>2. Личные последствия</h4>
      <ul>
        <li><strong>Лишение свободы:</strong> изоляция от общества на определенный срок</li>
        <li><strong>Арест:</strong> кратковременное лишение свободы</li>
        <li><strong>Ограничение свободы:</strong> установление определенных запретов и обязанностей</li>
        <li><strong>Исправительные работы:</strong> отбывание наказания по месту работы</li>
      </ul>
      
      <h4>3. Специальные ограничения</h4>
      <ul>
        <li><strong>Лишение специальных прав:</strong> права управления транспортным средством, права заниматься определенной деятельностью</li>
        <li><strong>Ограничение в выборе профессии:</strong> запрет занимать определенные должности</li>
        <li><strong>Запрет на выезд за границу</strong></li>
      </ul>
      
      <h4>4. Социальные последствия</h4>
      <ul>
        <li><strong>Судимость:</strong> особое правовое состояние лица после осуждения</li>
        <li><strong>Ограничение в правах:</strong> избирательных, родительских и др.</li>
        <li><strong>Репутационные потери:</strong> ухудшение общественного мнения</li>
      </ul>
      
      <h3>Длительность последствий:</h3>
      <p>Некоторые последствия (например, судимость) могут сохраняться даже после отбытия наказания и влиять на различные сферы жизни.</p>
    `
  },
  5: {
    title: "Примеры правонарушений",
    content: `
      <h3>Конкретные примеры различных видов правонарушений</h3>
      
      <h4>Административные правонарушения:</h4>
      <ul>
        <li><strong>Мелкое хулиганство:</strong> нецензурная брань в общественных местах, оскорбительное приставание к гражданам</li>
        <li><strong>Нарушение ПДД:</strong> превышение скорости, проезд на красный свет, управление без прав</li>
        <li><strong>Распитие спиртных напитков:</strong> в общественных местах, кроме специально отведенных</li>
        <li><strong>Нарушение тишины:</strong> шум в ночное время (с 23:00 до 7:00)</li>
        <li><strong>Нарушение правил торговли:</strong> продажа товаров без лицензии, несоответствие ценников</li>
      </ul>
      
      <h4>Гражданско-правовые правонарушения:</h4>
      <ul>
        <li><strong>Неисполнение договора:</strong> невыполнение обязательств по договору аренды, купли-продажи</li>
        <li><strong>Причинение имущественного вреда:</strong> повреждение чужого имущества</li>
        <li><strong>Нарушение авторских прав:</strong> незаконное использование чужого произведения</li>
        <li><strong>Ненадлежащее исполнение услуг:</strong> оказание услуг низкого качества</li>
        <li><strong>Неосновательное обогащение:</strong> получение имущества без законных оснований</li>
      </ul>
      
      <h4>Дисциплинарные правонарушения:</h4>
      <ul>
        <li><strong>Прогул:</strong> отсутствие на рабочем месте без уважительной причины более 4 часов</li>
        <li><strong>Опоздание:</strong> неявка на работу или уход с работы в установленное время</li>
        <li><strong>Нарушение инструкций:</strong> невыполнение должностных обязанностей</li>
        <li><strong>Несоблюдение техники безопасности</strong></li>
        <li><strong>Появление на работе в состоянии опьянения</strong></li>
      </ul>
      
      <h3>Ответственность за примеры:</h3>
      <p>Каждый пример правонарушения влечет соответствующую юридическую ответственность: административную, гражданско-правовую или дисциплинарную.</p>
    `
  },
  6: {
    title: "Примеры преступлений",
    content: `
      <h3>Конкретные примеры различных категорий преступлений</h3>
      
      <h4>Преступления против жизни и здоровья:</h4>
      <ul>
        <li><strong>Убийство:</strong> умышленное причинение смерти другому человеку</li>
        <li><strong>Причинение тяжкого вреда здоровью:</strong> умышленное или по неосторожности</li>
        <li><strong>Истязание:</strong> причинение физических или психических страданий</li>
        <li><strong>Побои:</strong> нанесение ударов или совершение иных насильственных действий</li>
      </ul>
      
      <h4>Преступления против собственности:</h4>
      <ul>
        <li><strong>Кража:</strong> тайное хищение чужого имущества</li>
        <li><strong>Грабеж:</strong> открытое хищение чужого имущества</li>
        <li><strong>Разбой:</strong> нападение с целью хищения имущества</li>
        <li><strong>Мошенничество:</strong> хищение имущества путем обмана или злоупотребления доверием</li>
        <li><strong>Вымогательство:</strong> требование передачи имущества под угрозой</li>
      </ul>
      
      <h4>Экономические преступления:</h4>
      <ul>
        <li><strong>Легализация доходов:</strong> придание правомерного вида незаконно полученным средствам</li>
        <li><strong>Уклонение от уплаты налогов:</strong> сокрытие доходов, занижение налоговой базы</li>
        <li><strong>Незаконное предпринимательство:</strong> ведение бизнеса без регистрации или лицензии</li>
        <li><strong>Контрабанда:</strong> незаконное перемещение товаров через границу</li>
      </ul>
      
      <h4>Преступления против общественной безопасности:</h4>
      <ul>
        <li><strong>Хулиганство:</strong> грубое нарушение общественного порядка</li>
        <li><strong>Вандализм:</strong> осквернение зданий или иных сооружений</li>
        <li><strong>Незаконное хранение оружия</strong></li>
        <li><strong>Организация незаконного митинга</strong></li>
      </ul>
      
      <h3>Квалификация преступлений:</h3>
      <p>Каждое преступление имеет свою статью в Уголовном кодексе и соответствующие санкции.</p>
    `
  },
  7: {
    title: "Значение точной квалификации",
    content: `
      <h3>Важность правильной квалификации правонарушений и преступлений</h3>
      
      <h4>Для граждан:</h4>
      <ul>
        <li><strong>Справедливое наказание:</strong> соответствие наказания тяжести совершенного деяния</li>
        <li><strong>Защита прав:</strong> правильная квалификация обеспечивает защиту прав обвиняемого</li>
        <li><strong>Предсказуемость:</strong> понимание возможных последствий своих действий</li>
        <li><strong>Реабилитация:</strong> возможность восстановления в правах после отбытия наказания</li>
      </ul>
      
      <h4>Для правоохранительной системы:</h4>
      <ul>
        <li><strong>Законность решений:</strong> соответствие действий и решений нормам права</li>
        <li><strong>Эффективность работы:</strong> правильное применение мер воздействия</li>
        <li><strong>Профессионализм:</strong> демонстрация квалификации сотрудников</li>
        <li><strong>Доверие общества:</strong> укрепление авторитета правоохранительных органов</li>
      </ul>
      
      <h4>Для государства:</h4>
      <ul>
        <li><strong>Верховенство права:</strong> все равны перед законом</li>
        <li><strong>Правопорядок:</strong> поддержание общественного порядка</li>
        <li><strong>Правовая определенность:</strong> четкость и ясность правовых норм</li>
        <li><strong>Международный имидж:</strong> соблюдение прав человека и законности</li>
      </ul>
      
      <h4>Для общества:</h4>
      <ul>
        <li><strong>Правовая культура:</strong> повышение уровня правосознания граждан</li>
        <li><strong>Профилактика правонарушений:</strong> предупреждение противоправного поведения</li>
        <li><strong>Социальная справедливость:</strong> восстановление нарушенных прав</li>
        <li><strong>Общественная безопасность:</strong> создание безопасной среды для жизни</li>
      </ul>
      
      <h3>Последствия ошибок в квалификации:</h3>
      <p>Неправильная квалификация может привести к несправедливому наказанию, нарушению прав человека, подрыву доверия к правосудию и правовой системе в целом.</p>
    `
  }
};

export default function TheoryPage() {
  // Состояние для модального окна
  const [modal, setModal] = useState<ModalData>({
    isOpen: false,
    blockId: 0,
    title: '',
    color: ''
  });

  // Функция для открытия модального окна
  const openModal = (blockId: number, title: string, color: string) => {
    setModal({
      isOpen: true,
      blockId,
      title,
      color
    });
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setModal({
      isOpen: false,
      blockId: 0,
      title: '',
      color: ''
    });
  };

  // Разделяем блоки на две группы: первые 6 и блок 7
  const firstSixBlocks = blocksData.filter(block => block.id <= 6);
  const blockSeven = blocksData.find(block => block.id === 7);

  return (
    // Основной контейнер страницы с градиентным фоном
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)',
      padding: '2rem 1rem',
      position: 'relative'
    }}>
      {/* ЗАГОЛОВОЧНАЯ СЕКЦИЯ */}
      <header style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2.5rem 2rem',
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-blue) 100%)',
        color: 'white',
        borderRadius: '20px',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '900px',
        margin: '0 auto 3rem auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Теория / Лекции</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Учебные материалы по всем темам квеста</p>
      </header>

      {/* ОСНОВНОЕ СОДЕРЖАНИЕ С ГРИДОМ БЛОКОВ */}
      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* СЕТКА ДЛЯ ПЕРВЫХ 6 БЛОКОВ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* МАППИНГ ПЕРВЫХ 6 БЛОКОВ */}
          {firstSixBlocks.map((block) => (
            <BlockCard 
              key={block.id} 
              block={block} 
              openModal={openModal} 
            />
          ))}
        </div>

        {/* ОТДЕЛЬНЫЙ КОНТЕЙНЕР ДЛЯ БЛОКА 7 */}
        {blockSeven && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
            marginRight: '25px'
          }}>
            <BlockCard 
              block={blockSeven} 
              openModal={openModal} 
            />
          </div>
        )}
      </main>

      {/* МОДАЛЬНОЕ ОКНО ДЛЯ ПОДРОБНОЙ ТЕОРИИ */}
      {modal.isOpen && (
        <Modal 
          modal={modal} 
          closeModal={closeModal} 
          detailedTheory={detailedTheory} 
        />
      )}
    </div>
  );
}

// Компонент карточки блока
interface BlockCardProps {
  block: any;
  openModal: (blockId: number, title: string, color: string) => void;
}

function BlockCard({ block, openModal }: BlockCardProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      transition: 'transform 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      maxWidth: '350px'
    }}>
      {/* ШАПКА БЛОКА С ИКОНКОЙ И ЗАГОЛОВКОМ */}
      <div style={{ 
        background: block.color, 
        color: 'white',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          fontSize: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {block.icon}
        </div>
        <div>
          <h2 style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.3rem' }}>Блок {block.id}</h2>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{block.title}</h3>
        </div>
      </div>
      
      {/* СОДЕРЖИМОЕ БЛОКА С УЧЕБНЫМИ МАТЕРИАЛАМИ */}
      <div style={{ 
        padding: '1.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* БЛОК 1: ПРАВОНАРУШЕНИЯ */}
        {block.id === 1 && (
          <>
            <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Правонарушения и его виды</h4>
            <p style={{ color: 'var(--text-dark)', marginBottom: '1rem' }}>
              <strong>Правонарушение</strong> — виновное, противоправное деяние деликтоспособного лица.
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Административные:</strong> нарушение ПДД, мелкое хулиганство</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Гражданско-правовые:</strong> неисполнение договора, причинение вреда</li>
              <li><strong>Дисциплинарные:</strong> опоздание, прогул, нарушение инструкций</li>
            </ul>
          </>
        )}
        
        {/* БЛОК 2: ПРЕСТУПЛЕНИЯ */}
        {block.id === 2 && (
          <>
            <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Преступление и его категории</h4>
            <p style={{ color: 'var(--text-dark)', marginBottom: '1rem' }}>
              <strong>Преступление</strong> — виновно совершенное общественно опасное деяние.
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Небольшой тяжести:</strong> до 3 лет лишения свободы</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Средней тяжести:</strong> до 5 лет</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Тяжкие:</strong> до 10 лет</li>
              <li><strong>Особо тяжкие:</strong> свыше 10 лет или пожизненно</li>
            </ul>
          </>
        )}
        
        {/* БЛОК 3: ЮРИДИЧЕСКАЯ ОТВЕТСТВЕННОСТЬ */}
        {block.id === 3 && (
          <>
            <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Виды юридической ответственности</h4>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Административная:</strong> за административные правонарушения</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Гражданско-правовая:</strong> за причинение имущественного вреда</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Дисциплинарная:</strong> за нарушение трудовой дисциплины</li>
              <li><strong>Уголовная:</strong> за совершение преступлений</li>
            </ul>
          </>
        )}
        
        {/* БЛОК 4: ЮРИДИЧЕСКИЕ ПОСЛЕДСТВИЯ */}
        {block.id === 4 && (
          <>
            <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Юридические последствия</h4>
            <p style={{ color: 'var(--text-dark)' }}>
              Последствия правонарушений и преступлений: штрафы, арест, лишение свободы, судимость, ограничения в правах.
            </p>
          </>
        )}
        
        {/* БЛОК 5: ПРИМЕРЫ ПРАВОНАРУШЕНИЙ */}
        {block.id === 5 && (
          <>
            <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Примеры правонарушений</h4>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Административные:</strong> мелкое хулиганство, нарушение ПДД</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Гражданско-правовые:</strong> неисполнение договора</li>
              <li><strong>Дисциплинарные:</strong> прогул, опоздание</li>
            </ul>
          </>
        )}
        
        {/* БЛОК 6: ПРИМЕРЫ ПРЕСТУПЛЕНИЙ */}
        {block.id === 6 && (
          <>
            <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Примеры преступлений</h4>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Против жизни:</strong> убийство, причинение вреда здоровью</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Против собственности:</strong> кража, грабеж, мошенничество</li>
              <li><strong>Экономические:</strong> легализация доходов, уклонение от налогов</li>
            </ul>
          </>
        )}
        
        {/* БЛОК 7: КВАЛИФИКАЦИЯ */}
        {block.id === 7 && (
          <>
            <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Значение точной квалификации</h4>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dark)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Для граждан:</strong> справедливое наказание</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Для правоохранительной системы:</strong> законность решений</li>
              <li><strong>Для государства:</strong> верховенство права</li>
            </ul>
          </>
        )}
        
        {/* КНОПКИ ДЛЯ ПЕРЕХОДА К ТЕСТУ И ПОДРОБНОЙ ТЕОРИИ */}
        <div style={{ 
          marginTop: 'auto',
          paddingTop: '1.5rem', 
          borderTop: '1px solid var(--light-bg)',
          display: 'flex',
          gap: '1rem',
          alignItems: 'stretch'
        }}>
          <button 
            onClick={() => openModal(block.id, block.title, block.color)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.8rem 1.5rem',
              background: 'linear-gradient(135deg, var(--primary-blue) 0%, #4a90e2 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.9rem',
              flex: 1,
              textAlign: 'center',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              minHeight: '44px'
            }}
          >
            Подробная теория
          </button>
          <a 
            href={`/test?block=${block.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.8rem 1.5rem',
              background: 'linear-gradient(135deg, var(--accent-gold) 0%, #ffd700 100%)',
              color: 'var(--primary-dark)',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.9rem',
              flex: 1,
              textAlign: 'center',
              minHeight: '44px'
            }}
          >
            Пройти тест →
          </a>
        </div>
      </div>
    </div>
  );
}

// Компонент модального окна
interface ModalProps {
  modal: ModalData;
  closeModal: () => void;
  detailedTheory: any;
}

function Modal({ modal, closeModal, detailedTheory }: ModalProps) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* ШАПКА МОДАЛЬНОГО ОКНА */}
        <div style={{
          background: modal.color || 'var(--primary-blue)',
          color: 'white',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '0.3rem' }}>
              Блок {modal.blockId}
            </h2>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
              {modal.title}
            </h3>
          </div>
          <button 
            onClick={closeModal}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>
        
        {/* СОДЕРЖИМОЕ МОДАЛЬНОГО ОКНА */}
        <div style={{
          padding: '2rem',
          overflowY: 'auto',
          flex: 1
        }}>
          <div 
            dangerouslySetInnerHTML={{ 
              __html: detailedTheory[modal.blockId as keyof typeof detailedTheory]?.content || 
              `<p>Подробная теория для блока ${modal.blockId}</p>` 
            }}
            style={{
              color: 'var(--text-dark)',
              lineHeight: '1.6'
            }}
          />
        </div>
        
        {/* ФУТЕР МОДАЛЬНОГО ОКНА */}
        <div style={{
          padding: '1.5rem 2rem',
          borderTop: '1px solid var(--light-bg)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button 
            onClick={closeModal}
            style={{
              padding: '0.8rem 2rem',
              background: 'var(--primary-blue)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}