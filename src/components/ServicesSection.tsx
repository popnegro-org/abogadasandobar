import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ActiveTab } from '../types';
import { ASSETS } from '../data/lawyerData';
import { Breadcrumb } from './Breadcrumb';

interface ServicesSectionProps { setActiveTab: (tab: ActiveTab) => void; onRequestConsultation: (service?: string) => void; }

const AREAS = [
  { id: 'penal', hash: 'derecho-penal', title: 'DERECHO PENAL', description: 'Defensa penal, representación de víctimas y litigación en causas provinciales y federales.', pattern: 'radial-gradient(circle at 18% 25%,rgba(217,169,184,.20),transparent 28%),linear-gradient(135deg,#241D20 0%,#4B2632 48%,#181614 100%)' },
  { id: 'empresas', hash: 'soluciones-legales-empresas', title: 'SOLUCIONES LEGALES A EMPRESAS', description: 'Asesoramiento preventivo, compliance y protección jurídica para empresas y equipos directivos.', pattern: 'radial-gradient(circle at 78% 20%,rgba(217,169,184,.18),transparent 30%),linear-gradient(135deg,#181614 0%,#303033 52%,#4A363A 100%)' },
  { id: 'seguros', hash: 'representacion-penal-y-seguros', title: 'REPRESENTACIÓN PENAL Y SEGUROS', description: 'Asistencia jurídica coordinada ante siniestros que requieren análisis penal y gestión jurídica integral.', pattern: 'radial-gradient(circle at 24% 78%,rgba(217,169,184,.18),transparent 28%),linear-gradient(135deg,#211B1A 0%,#3A3330 52%,#5A3D45 100%)' },
  { id: 'accidentes', hash: 'reclamos-indemnizatorios', title: 'RECLAMOS INDEMNIZATORIOS', description: 'Representación ante lesiones y daños derivados de accidentes de tránsito.', pattern: 'radial-gradient(circle at 82% 72%,rgba(217,169,184,.20),transparent 28%),linear-gradient(135deg,#181614 0%,#283032 50%,#4B363D 100%)' },
];

const SERVICE_COPY: Record<string, { area: string; title: string; description: string; bullets: string[] }[]> = {
  penal: [
    { area: 'penal', title: 'Defensa Penal Integral', description: 'Representación de personas imputadas en causas provinciales y federales, desde los primeros actos del proceso hasta el juicio, la etapa recursiva y la ejecución penal.', bullets: ['Causas provinciales y federales', 'Defensa durante todas las etapas del proceso', 'Juicio, recursos y ejecución penal'] },
    { area: 'penal', title: 'Querellas y Representación de Víctimas', description: 'Intervención activa para impulsar la investigación, producir prueba y proteger los derechos de las víctimas durante todas las etapas del proceso penal.', bullets: ['Impulso de la investigación', 'Producción y análisis de prueba', 'Protección de derechos de las víctimas'] },
    { area: 'penal', title: 'Litigación Penal Adversarial', description: 'Diseño de la teoría del caso, preparación de la prueba e intervención directa en audiencias y juicios orales de alta complejidad.', bullets: ['Teoría del caso y preparación probatoria', 'Recursos de apelación y casación ante la Suprema Corte de Mendoza', 'Impugnación de pruebas ilícitas'] },
    { area: 'penal', title: 'Urgencias Penales y Medidas de Coerción', description: 'Atención prioritaria del estudio jurídico 24 hs Mendoza ante aprehensiones, detenciones, allanamientos, citaciones inminentes o pedidos de prisión preventiva.', bullets: ['Aprehensiones y detenciones', 'Allanamientos y citaciones', 'Medidas de coerción y prisión preventiva'] },
    { area: 'penal', title: 'Estafas, Ciberdelitos y Evidencia Digital', description: 'Representación penal en investigaciones por maniobras patrimoniales complejas y asesoramiento ante estafas digitales, suplantación de identidad, acceso indebido a cuentas y amenazas.', bullets: ['Preservación de evidencia digital', 'Coordinación con especialistas informáticos', 'Investigaciones por maniobras patrimoniales complejas'] },
  ],
  empresas: [
    { area: 'empresas', title: 'Acompañamiento Legal, Compliance y Programas de Integridad', description: 'A través de una alianza profesional, asesoramiento corporativo, preventivo y estratégico para empresas y equipos directivos.', bullets: ['Constitución y estructuración de sociedades', 'Contratos y due diligence legal', 'Matrices de riesgos, prevención y capacitación', 'Programas de integridad conforme a la Ley 27.401'] },
    { area: 'empresas', title: 'Registro y Protección de Marcas', description: 'Asesoramiento integral para proteger la identidad comercial mediante el registro y seguimiento de marcas ante el Instituto Nacional de la Propiedad Industrial.', bullets: ['Búsqueda de antecedentes y disponibilidad', 'Presentación y seguimiento ante el INPI', 'Oposiciones, renovaciones, transferencias y licencias'] },
    { area: 'empresas', title: 'Internacionalización de Empresas', description: 'Asesoramiento estratégico para la internacionalización de empresas y el desarrollo de alianzas profesionales y comerciales con mercados de Chile, Paraguay, México, Italia, Bélgica y España.', bullets: ['Análisis inicial de oportunidades de internacionalización', 'Orientación para alianzas y vínculos profesionales con mercados internacionales', 'Acompañamiento jurídico estratégico en procesos de expansión'] },
  ],
  seguros: [
    { area: 'seguros', title: 'Para particulares y asegurados', description: 'Intervención penal y asistencia jurídica coordinada cuando un siniestro exige preservar prueba, analizar responsabilidades y definir una estrategia desde el primer momento.', bullets: ['Análisis jurídico inicial del hecho', 'Asistencia ante denuncias, citaciones y declaraciones', 'Defensa en investigaciones por lesiones u homicidio culposo', 'Relevamiento y análisis de expedientes penales'] },
    { area: 'seguros', title: 'Para productores de seguros', description: 'Canal profesional de consulta y derivación para evaluar la dimensión penal del siniestro y coordinar la asistencia jurídica del asegurado.', bullets: ['Orientación ante denuncias o citaciones', 'Coordinación durante las distintas etapas', 'Análisis de actuaciones y documentación', 'Comunicación organizada con compañía y profesionales'] },
    { area: 'seguros', title: 'Para compañías de seguros', description: 'Asistencia profesional externa ante siniestros con contingencia penal o que requieran intervención coordinada en la Provincia de Mendoza.', bullets: ['Análisis de expedientes penales', 'Informes sobre riesgos y responsabilidades', 'Defensa penal e intervención en audiencias', 'Coordinación con equipos jurídicos internos y externos'] },
  ],
  accidentes: [
    { area: 'accidentes', title: 'Reclamos indemnizatorios por accidentes de tránsito', description: 'Representación de personas que hayan sufrido lesiones en accidentes de tránsito, desde la evaluación inicial hasta la negociación o reclamación judicial de la indemnización correspondiente.', bullets: ['Análisis del accidente y responsabilidades', 'Documentación médica y prueba del hecho', 'Evaluación de lesiones e incapacidad', 'Gastos médicos, pérdida de ingresos y consecuencias no patrimoniales', 'Negociación, mediación y acción judicial'] },
  ],
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ setActiveTab, onRequestConsultation }) => {
  const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6F0]';
  const [activeArea, setActiveArea] = useState('penal');

  useEffect(() => {
    const initialHash = window.location.hash.replace(/^#/, '');
    const initialArea = AREAS.find((area) => area.hash === initialHash);
    if (initialArea) {
      setActiveArea(initialArea.id);
      requestAnimationFrame(() => document.getElementById(initialArea.hash)?.scrollIntoView({ block: 'start' }));
    }
  }, []);

  const handleAreaChange = (id: string) => {
    const area = AREAS.find((item) => item.id === id);
    if (!area) return;
    const nextActiveArea = activeArea === id ? '' : id;
    setActiveArea(nextActiveArea);
    window.history.replaceState(null, '', nextActiveArea ? `/servicios-abogacia-mendoza#${area.hash}` : '/servicios-abogacia-mendoza');
    if (nextActiveArea) {
      requestAnimationFrame(() => document.getElementById(area.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  };

  return <div id="services-section" className="w-full bg-[#FAF6F0]">
    <section id="services-hero" aria-labelledby="services-hero-title" className="relative flex min-h-[480px] w-full items-center overflow-hidden bg-[#181614] pb-16 pt-28 lg:min-h-[540px] lg:pb-20 lg:pt-32">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ASSETS.heroServices})` }} aria-hidden="true" /><div className="absolute inset-0 bg-gradient-to-br from-[#181614]/95 via-[#231F1C]/90 to-[#2A2522]/80" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mb-8 lg:mb-10"><Breadcrumb items={[{ label: 'Servicios', active: true }]} onNavigate={setActiveTab} variant="primary" /></div><div className="max-w-4xl space-y-6"><h1 id="services-hero-title" className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">Estudio jurídico penal<span className="block text-[#D9A9B8]">en Mendoza</span></h1><p className="max-w-3xl text-base font-light leading-relaxed text-white/85 sm:text-lg lg:text-xl">Servicios de abogada penalista y abogado penalista Mendoza: defensa penal, litigación compleja, asesoramiento corporativo y estudio jurídico 24 hs Mendoza para urgencias, con intervención profesional directa.</p></div></div>
    </section>
    <section id="services-catalog" aria-labelledby="services-catalog-title" className="w-full bg-[#FAF6F0] py-16 lg:py-24"><div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:space-y-16 lg:px-8"><div className="max-w-3xl space-y-4"><p className="text-xs font-bold uppercase tracking-widest text-[#7F203D]">Áreas de práctica del estudio jurídico penal</p><h2 id="services-catalog-title" className="font-serif text-3xl font-bold leading-[1.15] tracking-tight text-[#302D28] sm:text-4xl">Un abordaje jurídico especializado</h2><p className="text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg">Servicios del estudio jurídico penal Mendoza orientados a la prevención, defensa y resolución de contingencias penales y corporativas.</p></div>
      <div className="space-y-4" aria-label="Áreas de práctica">
        {AREAS.map(area => {
          const isOpen = activeArea === area.id;
          const panelId = `services-area-panel-${area.id}`;
          return <section key={area.id} id={area.hash} aria-labelledby={`services-area-toggle-${area.id}`} className="scroll-mt-28 overflow-hidden border border-[#DDD2C5] bg-[#FFF8F2] shadow-sm">
            <button id={`services-area-toggle-${area.id}`} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => handleAreaChange(area.id)} className={`group relative flex w-full items-center justify-between gap-5 p-5 text-left transition-colors sm:p-6 lg:p-8 ${isOpen ? 'bg-[#302D28] text-white' : 'bg-[#FFF8F2] text-[#302D28] hover:bg-[#F4ECE3]'} ${focus}`}>
              <span className="min-w-0 font-serif text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">{area.title}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#D9A9B8]' : 'text-[#7F203D]'}`} aria-hidden="true" />
            </button>
            <div id={panelId} hidden={!isOpen}>
              <div className="relative min-h-[190px] overflow-hidden" style={{ backgroundImage: `url(${ASSETS.heroServices}), ${area.pattern}` }}><div className="absolute inset-0 bg-gradient-to-r from-[#181614]/95 via-[#231F1C]/75 to-[#231F1C]/45" aria-hidden="true" /><div className="relative flex min-h-[190px] items-end p-6 sm:p-8 lg:p-10"><div className="max-w-3xl"><h3 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{area.title}</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">{area.description}</p></div></div></div>
              <div className={`grid grid-cols-1 divide-y divide-[#302D28]/10 ${area.id === 'accidentes' ? 'sm:grid-cols-1 sm:divide-x-0 sm:divide-y-0 lg:grid-cols-1' : 'sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3'}`}>{SERVICE_COPY[area.id].map(service => <article key={service.title} className="group flex min-h-[300px] flex-col p-6 sm:p-7 lg:p-8"><div className="mb-5 flex items-center justify-between"><span className="h-px w-10 bg-[#7F203D]/30" aria-hidden="true" /></div><h4 className="font-serif text-xl font-bold leading-snug text-[#302D28] transition-colors group-hover:text-[#7F203D]">{service.title}</h4><p className="mt-4 text-sm leading-relaxed text-[#302D28]/75">{service.description}</p><ul className="mt-5 space-y-2 pt-4">{service.bullets.map(point => <li key={point} className="flex items-start gap-2 text-xs leading-relaxed text-[#302D28]/70"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7F203D]" aria-hidden="true" /><span>{point}</span></li>)}</ul><button type="button" onClick={() => onRequestConsultation(service.title)} className={`mt-auto flex items-center justify-between pt-4 text-left text-xs font-bold uppercase tracking-wider text-[#7F203D] ${focus}`}><span>Consultar sobre este servicio</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></button></article>)}</div>
            </div>
          </section>;
        })}
      </div>
    </div></section>
    <section id="services-final-cta" aria-labelledby="services-final-cta-title" className="w-full bg-[#302D28] py-16 text-white lg:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-8 border border-white/15 bg-white/5 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-12"><div className="max-w-3xl space-y-4"><p className="text-xs font-bold uppercase tracking-widest text-[#D9A9B8]">Consulta profesional</p><h2 id="services-final-cta-title" className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">¿Necesita evaluar una situación jurídica específica?</h2><p className="max-w-2xl text-base font-light leading-relaxed text-white/75 sm:text-lg">Una primera consulta con el estudio jurídico penal en Mendoza permite analizar el contexto, identificar las cuestiones relevantes y determinar los próximos pasos, incluida la atención de estudio jurídico 24 hs Mendoza.</p></div><button type="button" onClick={() => onRequestConsultation()} className="group inline-flex shrink-0 items-center justify-center gap-3 bg-[#7F203D] px-7 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#691931] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A9B8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#302D28] sm:px-8 sm:text-sm"><span>Solicitar consulta</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button></div></div></section>
  </div>;
};
