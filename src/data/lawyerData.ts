import {
  ServiceItem,
  TimelineMilestone,
  AcademicRecord,
  FAQItem,
} from '../types';
import { ASSETS } from './assets';
import { CONTACT_INFO } from './contactData';

/** Re-export para componentes que importan ASSETS desde lawyerData. */
export { ASSETS };

/**
 * ============================================================
 * LAWYER INFORMATION — alineado con CONTACT_INFO
 * ============================================================
 */

export const LAWYER_INFO = {
  name: 'Emilia Sandobar',

  title: 'Abogada Penalista & Asesora Corporativa en Mendoza',

  collegianNumber: CONTACT_INFO.matriculaProvincial,

  collegianNumberFederal: CONTACT_INFO.matriculaFederal,

  experienceYears: 15,

  phone: CONTACT_INFO.phone,

  email: CONTACT_INFO.email,

  address: CONTACT_INFO.address,

  schedule: `${CONTACT_INFO.schedule} (${CONTACT_INFO.urgencyNote})`,

  quote:
    'El rigor técnico y la lealtad procesal son la única garantía real de una defensa inquebrantable.',

  bio: 'Emilia Sandobar es abogada penalista en Mendoza, egresada de la Facultad de Derecho de la Universidad Nacional de Cuyo, con práctica profesional y formación de posgrado en Derecho Penal. Interviene ante la justicia provincial y federal, ejerciendo tanto la defensa técnica como la representación de querellantes particulares, con disponibilidad de guardia legal 24 hs para situaciones urgentes.',
} as const;

/**
 * ============================================================
 * STATS — métricas conservadoras y verificables en tono
 * ============================================================
 */

export const STATS = [
  {
    value: '15+',
    label: 'Años de Trayectoria',
    detail: 'Dedicación continua a la litigación penal',
  },
  {
    value: '24 hs',
    label: 'Guardia Penal',
    detail: 'Atención prioritaria en urgencias',
  },
  {
    value: 'Cuyo',
    label: 'Cobertura territorial',
    detail: 'Provincia de Mendoza y fueros federales',
  },
  {
    value: '100%',
    label: 'Secreto Profesional',
    detail: 'Confidencialidad absoluta garantizada',
  },
] as const;

/**
 * ============================================================
 * SERVICES — catálogo de referencia con assets reales por servicio
 * ============================================================
 */

export const SERVICES: ServiceItem[] = [
  {
    id: 'delitos-economicos',
    category: 'penal',
    title: 'Derecho Penal Económico y Financiero',
    shortDesc:
      'Defensa técnica en defraudaciones, administración fraudulenta, insolvencias punibles y blanqueo de capitales.',
    fullDesc:
      'Asesoramiento y defensa integral en procedimientos por delitos económicos de alta complejidad. Análisis pericial contable, estructuración de estrategia defensiva en fase de instrucción y juicio oral ante Juzgados Centrales y Audiencias Provinciales.',
    bulletPoints: [
      'Fraude fiscal, societario y contable',
      'Administración desleal y apropiación indebida',
      'Alzamiento de bienes e insolvencias punibles',
      'Defensa ante la Fiscalía Especial contra la Corrupción',
    ],
    iconName: 'ShieldAlert',
    image: ASSETS.serviceDelitosEconomicos,
    courtTypes: [
      'Polo Judicial Penal Mendoza',
      'Cámara Federal de Mendoza',
      'Suprema Corte de Mendoza',
    ],
  },
  {
    id: 'litigacion-compleja',
    category: 'litigacion',
    title: 'Litigación Penal Compleja y Juicio Oral',
    shortDesc:
      'Dirección letrada con intervención directa en sala, preparación pericial e interrogatorios estratégicos.',
    fullDesc:
      'Representación rigurosa en vistas judiciales de máxima repercusión. Diseño de estrategias procesales orientadas al sobreseimiento temprano o la absolutoria fundamentada en vulneración de garantías constitucionales.',
    bulletPoints: [
      'Intervención en juicios orales de alta repercusión',
      'Recursos de apelación y casación ante la Suprema Corte de Mendoza',
      'Impugnación de pruebas ilícitas e intervenciones telefónicas',
      'Coordinación de informes periciales forenses',
    ],
    iconName: 'Scale',
    image: ASSETS.serviceLitigacionCompleja,
    courtTypes: [
      'Suprema Corte de Mendoza',
      'Tribunales Penales Colegiados',
      'Justicia Federal',
    ],
  },
  {
    id: 'compliance-penal',
    category: 'compliance',
    title: 'Compliance Penal y Programas de Integridad',
    shortDesc:
      'Diseño, auditoría e implantación de planes de prevención de delitos (Ley 27.401).',
    fullDesc:
      'Estructuración de matrices de riesgos penales a medida de la actividad empresarial. Implementación de canales éticos y protocolos de investigación interna que eximen de responsabilidad a la persona jurídica.',
    bulletPoints: [
      'Matriz de riesgos penales sectorializada',
      'Implantación y gestión de canales de denuncia',
      'Protocolos de investigación interna y régimen sancionador',
      'Defensa penal corporativa de la persona jurídica',
    ],
    iconName: 'FileCheck',
    image: ASSETS.serviceCompliancePenal,
    isFeatured: true,
  },
  {
    id: 'delitos-societarios',
    category: 'corporate',
    title: 'Derecho Penal Societario y Tributario',
    shortDesc:
      'Asesoramiento y defensa del órgano de administración frente a contingencias penales, fiscales y societarias.',
    fullDesc:
      'Protección integral para consejeros, directores generales y administradores de hecho y de derecho frente a imputaciones por acuerdos abusivos, falsedad en balances o delito contra la Hacienda Pública.',
    bulletPoints: [
      'Responsabilidad penal de directivos y consejeros',
      'Delitos contra la Hacienda Pública y la Seguridad Social',
      'Falsedad documental en balances y cuentas anuales',
      'Imposición de acuerdos abusivos o lesivos',
    ],
    iconName: 'Briefcase',
    image: ASSETS.serviceDelitosSocietarios,
  },
  {
    id: 'ciberdelincuencia',
    category: 'penal',
    title: 'Ciberdelitos y Fraude Digital',
    shortDesc:
      'Respuesta procesal inmediata ante estafas informáticas, sabotaje digital, fuga de datos y revelación de secretos.',
    fullDesc:
      'Intervención jurídica especializada en cibercrimen. Coordinación con peritos informáticos forenses para la trazabilidad de fondos criptográficos y medidas cautelares de bloqueo judicial de cuentas bancarias.',
    bulletPoints: [
      'Estafas telemáticas complejas y BEC (Business Email Compromise)',
      'Espionaje industrial y revelación de secretos empresariales',
      'Bloqueo cautelar de cuentas bancarias y activos digitales',
      'Defensa y acusación particular con pericial forense',
    ],
    iconName: 'Lock',
    image: ASSETS.serviceCiberdelincuencia,
  },
  {
    id: 'urgencias-penales',
    category: 'penal',
    title: 'Urgencias Penales y Medidas Cautelares',
    shortDesc:
      'Atención 24/7 para detenciones policiales, registros judiciales y comparecencias de prisión provisional.',
    fullDesc:
      'Respuesta inmediata en las primeras 24 horas críticas. Personación en comisaría y juzgado de guardia para garantizar el derecho a no declarar perjudicialmente y solicitar la libertad provisional sin fianza.',
    bulletPoints: [
      'Asistencia inmediata al detenido en comisaría o juzgado',
      'Presencia letrada en entradas y registros (sedes y domicilios)',
      'Oposición fundada a medidas de prisión provisional',
      'Línea directa de urgencia penal 24 horas',
    ],
    iconName: 'AlertCircle',
    image: ASSETS.serviceUrgenciasPenales,
  },
  {
    id: 'investigaciones-internas',
    category: 'compliance',
    title: 'Investigaciones Internas y Forensic',
    shortDesc:
      'Esclarecimiento de irregularidades corporativas, forensic documental y entrevistas de investigación.',
    fullDesc:
      'Desarrollo de investigaciones forenses internas con estricto respeto a las garantías procesales y laborales. Análisis de evidencias digitales y confección de informes periciales para el consejo de administración.',
    bulletPoints: [
      'Detección de fraudes internos y malversación',
      'Auditoría forense contable y documental',
      'Preservación de cadena de custodia digital',
      'Informes técnicos de descargo para la fiscalía',
    ],
    iconName: 'Search',
    image: ASSETS.serviceInvestigacionesInternas,
  },
  {
    id: 'penal-medioambiental',
    category: 'corporate',
    title: 'Derecho Penal Ambiental y Urbanístico',
    shortDesc:
      'Defensa técnica frente a imputaciones por delitos contra el medio ambiente, territorio y seguridad industrial.',
    fullDesc:
      'Asesoramiento procesal y pericial ante sanciones penales derivadas de emisiones, vertidos, gestión de residuos y licencias urbanísticas. Protección penal para directores técnicos y responsables medioambientales.',
    bulletPoints: [
      'Delitos contra los recursos naturales y el medio ambiente',
      'Delitos sobre la ordenación del territorio y urbanismo',
      'Responsabilidad penal en siniestros y seguridad laboral',
      'Coordinación de peritajes ambientales y topográficos',
    ],
    iconName: 'Building2',
    image: ASSETS.servicePenalMedioambiental,
  },
];

/**
 * ============================================================
 * TIMELINE
 * ============================================================
 */

export const TIMELINE: TimelineMilestone[] = [
  {
    period: '2020 — Actualidad',
    role: 'Socia Fundadora & Directora',
    entity: 'Estudio jurídico — Derecho Penal y Compliance (Mendoza)',
    description:
      'Dirección del estudio jurídico, enfocado en litigación penal de alta complejidad, asesoría a directorios y defensa en causas ante el Polo Judicial Penal de Mendoza y la Justicia Federal.',
    achievements: [
      'Litigación penal de alta complejidad en Mendoza y fueros federales',
      'Asesoramiento en programas de integridad y compliance',
      'Participación en foros y espacios de formación jurídica',
    ],
  },
  {
    period: '2014 — 2020',
    role: 'Socia de Litigación Penal',
    entity: 'Firma Procesal & Corporativa (Cuyo / Federal)',
    description:
      'Dirección del área de Derecho Penal Económico, coordinando equipos en debates orales, peritajes contables e investigaciones internas.',
    achievements: [
      'Defensa letrada en juicios orales ante Tribunales Penales Colegiados y Fuero Federal',
      'Especialización en delitos de cuello blanco, tributarios y ciberfraude societario',
      'Asesoramiento a directorios y empresas de la región',
    ],
  },
  {
    period: '2010 — 2014',
    role: 'Abogada Senior de Litigación',
    entity: 'Estudio Jurídico Especializado en Fuero Penal',
    description:
      'Intervención en instrucción penal preparatoria, redacción de recursos de casación ante la Suprema Corte de Justicia de Mendoza y asistencia en turnos de guardia.',
    achievements: [
      'Elaboración de recursos de casación y apelaciones procesales',
      'Participación en causas complejas de insolvencias societarias y defraudaciones',
    ],
  },
  {
    period: '2008 — 2010',
    role: 'Asociada Junior & Práctica Forense',
    entity: 'Gabinete Jurídico Forense',
    description:
      'Asistencia en audiencias de formalización, declaraciones indagatorias y preparación de pruebas periciales y testimoniales.',
    achievements: [
      'Matriculación en el Colegio de Abogados de Mendoza',
    ],
  },
];

/**
 * ============================================================
 * ACADEMIC CREDENTIALS
 * ============================================================
 */

export const ACADEMIC_CREDENTIALS: AcademicRecord[] = [
  {
    year: '2008',
    title: 'Abogacía',
    institution: 'Facultad de Derecho — Universidad Nacional de Cuyo (UNCuyo)',
    detail:
      'Especialización en Derecho Penal y Procesal Penal.',
  },
  {
    year: '2011',
    title: 'Posgrado / Especialización en Derecho Penal y Ciencias Penales',
    institution: 'Universidad Nacional de Cuyo / Universidad de Buenos Aires (UBA)',
    detail:
      'Profundización dogmática en teoría del delito, dogmática procesal penal acusatoria y delitos contra el orden económico y financiero.',
  },
  {
    year: '2016',
    title: 'Especialista en Compliance Penal & Integridad Corporativa',
    institution: 'Instituto de Altos Estudios Jurídicos',
    detail:
      'Diseño de programas de prevención de delitos e investigaciones corporativas (Ley 27.401 de Responsabilidad Penal de las Personas Jurídicas).',
  },
  {
    year: '2019',
    title: 'Diplomatura en Análisis Pericial Económico-Forense y Cibercrimen',
    institution: 'Colegio de Abogados de Mendoza & Consejo Profesional de Ciencias Económicas',
    detail:
      'Capacitación en análisis de contabilidad forense, trazabilidad digital, valoración de activos y detección de fraudes complejos.',
  },
];

/**
 * ============================================================
 * FAQS
 * ============================================================
 */

export const FAQS: FAQItem[] = [
  {
    id: 'faq-honorarios',
    category: 'honorarios',
    question: '¿Cómo se determinan los honorarios?',
    answer:
      'Se establece una provisión de fondos inicial basada en la complejidad del asunto y las horas estimadas de estudio preliminar. Todo con total transparencia antes de comenzar.',
  },
  {
    id: 'faq-urgencia',
    category: 'urgencias',
    question: '¿Qué ocurre si necesito asistencia inmediata?',
    answer:
      'Una urgencia es una situación que requiere asistencia legal inmediata, como una detención, un registro judicial o una comparecencia inminente. Para estos casos, disponemos de una línea de guardia 24/7.',
  },
  {
    id: 'faq-empresas',
    category: 'empresas',
    question: '¿Ofrecen asesoramiento a empresas y directorios?',
    answer:
      'Sí, diseñamos estrategias de prevención penal (Compliance) y asumimos la defensa corporativa de directivos y órganos de administración frente a responsabilidades societarias.',
  },
  {
    id: 'faq-modalidad',
    category: 'general',
    question: '¿Es posible realizar una consulta a distancia?',
    answer:
      'Sí. Para garantizar la confidencialidad, utilizamos plataformas seguras que permiten mantener el secreto profesional con la misma eficacia que una reunión presencial en el despacho.',
  },
  {
    id: 'faq-pago',
    category: 'honorarios',
    question: '¿Se puede fraccionar el pago de los honorarios?',
    answer:
      'Entendemos las necesidades de nuestros clientes. Los honorarios profesionales pueden estructurarse en hitos procesales, acordados previamente en la hoja de encargo.',
  },
  {
    id: 'faq-jurisdiccion',
    category: 'general',
    question: '¿En qué jurisdicción intervienen?',
    answer:
      'Actuamos principalmente en Mendoza y tribunales federales, con capacidad de intervención y coordinación en todo el territorio nacional para casos de alta complejidad.',
  },
];
