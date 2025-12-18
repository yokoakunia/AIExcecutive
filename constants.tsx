
import { Axis, Category, Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    axis: Axis.OPENNESS,
    text: "¿Con qué frecuencia buscas activamente nuevas formas de mejorar tus procesos de trabajo mediante software?",
    description: "Mide tu disposición proactiva hacia la innovación operativa."
  },
  {
    id: 2,
    axis: Axis.OPENNESS,
    text: "Si una herramienta de IA cambia drásticamente tu flujo de trabajo actual, ¿cómo reaccionas?",
    description: "Mide tu flexibilidad ante cambios estructurales."
  },
  {
    id: 3,
    axis: Axis.OPENNESS,
    text: "He dejado de usar métodos tradicionales en favor de alternativas digitales en el último año.",
    description: "Evaluación de comportamiento real de cambio."
  },
  {
    id: 4,
    axis: Axis.INFLUENCE,
    text: "¿Tus colegas suelen pedirte consejo o ayuda cuando sale una nueva tecnología?",
    description: "Identifica tu rol como referente técnico informal."
  },
  {
    id: 5,
    axis: Axis.INFLUENCE,
    text: "¿Qué tan cómodo te sientes liderando una sesión para enseñar a otros una herramienta que dominas?",
    description: "Capacidad de mentoría y transmisión de conocimiento."
  },
  {
    id: 6,
    axis: Axis.INFLUENCE,
    text: "Suelo compartir noticias sobre IA o tecnología en los canales de comunicación del equipo.",
    description: "Hábito de evangelización tecnológica."
  },
  {
    id: 7,
    axis: Axis.CURIOSITY,
    text: "¿Investigas herramientas de IA (como ChatGPT, Midjourney, Claude) por iniciativa propia fuera del horario laboral?",
    description: "Interés intrínseco por la tecnología."
  },
  {
    id: 8,
    axis: Axis.CURIOSITY,
    text: "Cuando encuentras un problema complejo, ¿tu primera respuesta es buscar si existe una IA que ayude a resolverlo?",
    description: "Mentalidad orientada a soluciones basadas en IA."
  },
  {
    id: 9,
    axis: Axis.CURIOSITY,
    text: "¿Te gusta experimentar con versiones beta o funciones experimentales de aplicaciones?",
    description: "Tolerancia a la inestabilidad en favor del descubrimiento."
  },
  {
    id: 10,
    axis: Axis.ADOPTION,
    text: "¿Qué tan pronto adoptas una nueva actualización tecnológica una vez está disponible?",
    description: "Velocidad de integración de novedades."
  },
  {
    id: 11,
    axis: Axis.ADOPTION,
    text: "Ya utilizo la IA generativa de forma diaria para al menos 3 tareas diferentes en mi trabajo.",
    description: "Nivel de integración real en el día a día."
  },
  {
    id: 12,
    axis: Axis.ADOPTION,
    text: "¿Has configurado o personalizado alguna vez una IA (ej. Custom GPTs, prompts complejos, automatizaciones)?",
    description: "Nivel de profundidad en la adopción."
  }
];

export const CATEGORIES: Category[] = [
  {
    name: "Innovador",
    range: [80, 100],
    description: "Eres la vanguardia de la transformación. No solo usas la tecnología, la moldeas y empujas al resto a seguirte.",
    actionPlan: "Lidera proyectos piloto estratégicos, mentoriza formalmente a otros colegas y ayuda a definir la gobernanza de IA.",
    color: "from-purple-600 to-indigo-700",
    icon: "fa-rocket"
  },
  {
    name: "Early Adopter",
    range: [65, 79],
    description: "Reconoces el valor rápidamente y eres de los primeros en subirte al barco con resultados tangibles.",
    actionPlan: "Participa activamente en capacitaciones avanzadas y únete a los equipos de implementación de herramientas corporativas.",
    color: "from-blue-500 to-indigo-600",
    icon: "fa-bolt"
  },
  {
    name: "Embajador Potencial",
    range: [50, 64],
    description: "Tienes el interés y la actitud, solo necesitas un empujón práctico y más exposición a casos de uso.",
    actionPlan: "Asiste a talleres prácticos mensuales y experimenta con nuevas aplicaciones en entornos controlados.",
    color: "from-teal-500 to-emerald-600",
    icon: "fa-star"
  },
  {
    name: "Seguidor Temprano",
    range: [0, 49],
    description: "Estás observando el panorama. Tienes curiosidad pero prefieres ver pruebas de éxito antes de comprometerte.",
    actionPlan: "Comienza con capacitaciones básicas de fundamentos de IA y sigue de cerca los casos de éxito de tus compañeros.",
    color: "from-slate-500 to-gray-700",
    icon: "fa-eye"
  }
];
