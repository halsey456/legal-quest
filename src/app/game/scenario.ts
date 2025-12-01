import { Scene } from '@/lib/game-engine';

export const gameScenarios: Scene[] = [
  {
    id: "start",
    title: "Кража телефона",
    description: "17-летний школьник взял чужой телефон в раздевалке спортивного зала и спрятал в свой рюкзак. Стоимость телефона 25 000 рублей. Что это?",
    image: "/scenes/1.1.jpg", // Вопрос 1 - изображение 1
    choices: [
      {
        id: "choice1",
        text: "Преступление (кража)",
        nextSceneId: "question2",
        points: 10,
        legalCorrect: true
      },
      {
        id: "choice2",
        text: "Правонарушение (мелкое хищение)",
        nextSceneId: "question2",
        points: 0,
        legalCorrect: false
      },
      {
        id: "choice3",
        text: "Это не является ни преступлением, ни правонарушением",
        nextSceneId: "question2",
        points: -5,
        legalCorrect: false
      }
    ],
    legalExplanation: "Это преступление - кража (ст. 158 УК РФ), так как сумма превышает 2500 рублей и есть признаки хищения чужого имущества."
  },
  
  {
    id: "question2",
    title: "Нецензурная брань в общественном месте",
    description: "Гражданин в состоянии алкогольного опьянения громко ругался нецензурными словами на улице в присутствии прохожих. Как это квалифицируется?",
    image: "/scenes/2.2.jpg", // Вопрос 2 - изображение 2
    choices: [
      {
        id: "choice4",
        text: "Правонарушение (мелкое хулиганство)",
        nextSceneId: "question3",
        points: 10,
        legalCorrect: true
      },
      {
        id: "choice5",
        text: "Преступление (хулиганство)",
        nextSceneId: "question3",
        points: 0,
        legalCorrect: false
      },
      {
        id: "choice6",
        text: "Это допустимое поведение",
        nextSceneId: "question3",
        points: -5,
        legalCorrect: false
      }
    ],
    legalExplanation: "Это административное правонарушение - мелкое хулиганство (ст. 20.1 КоАП РФ), так как нет признаков угрозы жизни или здоровью людей."
  },
  
  {
    id: "question3",
    title: "Управление автомобилем в нетрезвом виде",
    description: "Водитель управлял автомобилем в состоянии алкогольного опьянения. Это первый подобный случай. Что ему грозит?",
    image: "/scenes/3.3.jpg", // Вопрос 3 - изображение 3
    choices: [
      {
        id: "choice7",
        text: "Правонарушение (лишение прав и штраф)",
        nextSceneId: "question4",
        points: 10,
        legalCorrect: true
      },
      {
        id: "choice8",
        text: "Преступление (уголовная ответственность)",
        nextSceneId: "question4",
        points: 0,
        legalCorrect: false
      },
      {
        id: "choice9",
        text: "Предупреждение",
        nextSceneId: "question4",
        points: -5,
        legalCorrect: false
      }
    ],
    legalExplanation: "Это административное правонарушение (ст. 12.8 КоАП РФ). Уголовная ответственность наступает только при повторном нарушении или причинении вреда здоровью."
  },
  
  {
    id: "question4",
    title: "Умышленное причинение легкого вреда здоровью",
    description: "В ходе драки один человек нанес другому несколько ударов, в результате чего у потерпевшего образовались синяки и ссадины. Что это?",
    image: "/scenes/4.4.jpg", // Вопрос 4 - изображение 4
    choices: [
      {
        id: "choice10",
        text: "Преступление (причинение легкого вреда здоровью)",
        nextSceneId: "question5",
        points: 10,
        legalCorrect: true
      },
      {
        id: "choice11",
        text: "Правонарушение (побои)",
        nextSceneId: "question5",
        points: 0,
        legalCorrect: false
      },
      {
        id: "choice12",
        text: "Гражданско-правовой деликт",
        nextSceneId: "question5",
        points: -5,
        legalCorrect: false
      }
    ],
    legalExplanation: "Это преступление - умышленное причинение легкого вреда здоровью (ст. 115 УК РФ), так как есть умысел и последствия в виде физической боли."
  },
  
  {
    id: "question5",
    title: "Нарушение правил пожарной безопасности",
    description: "Владелец кафе не установил огнетушители и не провел инструктаж сотрудников по пожарной безопасности. Что это?",
    image: "/scenes/5.5.jpg", // Вопрос 5 - изображение 5
    choices: [
      {
        id: "choice13",
        text: "Правонарушение (нарушение правил пожарной безопасности)",
        nextSceneId: "question6",
        points: 10,
        legalCorrect: true
      },
      {
        id: "choice14",
        text: "Преступление (нарушение правил пожарной безопасности)",
        nextSceneId: "question6",
        points: 0,
        legalCorrect: false
      },
      {
        id: "choice15",
        text: "Это не является нарушением",
        nextSceneId: "question6",
        points: -5,
        legalCorrect: false
      }
    ],
    legalExplanation: "Это административное правонарушение (ст. 20.4 КоАП РФ). Уголовная ответственность наступает только если нарушение повлекло пожар с причинением вреда."
  },
  
  {
    id: "question6",
    title: "Мошенничество с банковской картой",
    description: "Сотрудник магазина скопировал данные банковской карты клиента и снял с нее 50 000 рублей. Как квалифицировать его действия?",
    image: "/scenes/6.6.jpg", // Вопрос 6 - изображение 6
    choices: [
      {
        id: "choice16",
        text: "Преступление (мошенничество)",
        nextSceneId: "end",
        points: 10,
        legalCorrect: true
      },
      {
        id: "choice17",
        text: "Правонарушение (неправомерное завладение деньгами)",
        nextSceneId: "end",
        points: 0,
        legalCorrect: false
      },
      {
        id: "choice18",
        text: "Гражданско-правовое нарушение",
        nextSceneId: "end",
        points: -5,
        legalCorrect: false
      }
    ],
    legalExplanation: "Это преступление - мошенничество (ст. 159 УК РФ), так как есть обман, злоупотребление доверием и значительная сумма ущерба."
  },
  
  {
    id: "end",
    title: "Квест завершен",
    description: "Вы ответили на все вопросы. Перейдите к результатам, чтобы увидеть, насколько хорошо вы различаете преступления и правонарушения.",
    image: "/scenes/end.jpg", // Финальное изображение
    choices: [
      {
        id: "choice19",
        text: "Посмотреть результаты",
        nextSceneId: "results",
        points: 0,
        legalCorrect: true
      }
    ],
    legalExplanation: "Спасибо за участие в квесте! Помните: преступление - это уголовно наказуемое деяние, а правонарушение - административное."
  }
];