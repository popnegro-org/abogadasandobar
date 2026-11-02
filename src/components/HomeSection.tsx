import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';
import { ASSETS } from '../data/assets';
import { PublicCasesSection } from './PublicCasesSection';

interface HomeSectionProps { setActiveTab: (tab: ActiveTab) => void; onRequestConsultation: () => void; }

const SERVICE_AREAS = [
  { number: '01', title: 'DERECHO PENAL', description: 'Defensa penal, representación de víctimas y litigación en causas provinciales y federales.', target: 'derecho-penal' },
  { number: '02', title: 'SOLUCIONES LEGALES A EMPRESAS', description: 'Asesoramiento preventivo, compliance y protección jurídica para empresas y equipos directivos.', target: 'soluciones-legales-empresas' },
  { number: '03', title: 'REPRESENTACIÓN PENAL Y SEGUROS', description: 'Asistencia coordinada ante siniestros que requieren análisis penal y gestión jurídica integral.', target: 'representacion-penal-y-seguros' },
  { number: '04', title: 'RECLAMOS INDEMNIZATORIOS', description: 'Representación en reclamos derivados de lesiones y daños por accidentes de tránsito.', target: 'reclamos-indemnizatorios' },
];

export const HomeSection: React.FC<HomeSectionProps> = ({ setActiveTab, onRequestConsultation }) => {
  const darkFocusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6F0]';
  const lightFocusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#181614]';
  const handleNavigateToServices = (target?: string) => {
    setActiveTab('servicios');
    window.setTimeout(() => {
      if (target) window.history.replaceState(null, '', `/servicios-abogacia-mendoza#${target}`);
      const element = target ? document.getElementById(target) : null;
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };
  const handleNavigateToContact = () => { setActiveTab('contacto'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <div id="home-section" className="relative w-full">
    <section id="hero-banner" aria-labelledby="hero-title" className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden pb-16 pt-28 lg:min-h-[640px] lg:pb-20 lg:pt-32">
      <div className="absolute inset-0" aria-hidden="true">
        <img src={ASSETS.heroOffice} alt="" width={1376} height={768} loading="eager" fetchPriority="high" decoding="async" className="h-full w-full object-cover object-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#181614]/95 via-[#231F1C]/90 to-[#2A2522]/80" aria-hidden="true" /><div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"><div className="space-y-6 lg:col-span-8 lg:space-y-8"><div className="animate-in fade-in slide-in-from-bottom-4 duration-700"><h1 id="hero-title" className="mb-3 font-serif text-2xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl">Abogada Emilia Sandobar</h1><h2 className="mb-6 max-w-4xl font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">Estudio jurídico penal y defensa de víctimas <span className="text-[#D9A9B8]">en Mendoza</span></h2><p className="max-w-2xl text-base font-light leading-relaxed text-white sm:text-lg lg:text-xl">Emilia Sandobar es abogada penalista en Mendoza y dirige un estudio jurídico penal con defensa técnica, representación de víctimas y estudio jurídico 24 hs Mendoza para urgencias. Atención de abogado penalista Mendoza con estrategia rigurosa e intervención profesional directa.</p></div></div><div className="mx-auto w-full max-w-md lg:col-span-4 lg:ml-auto lg:mr-0"><div className="space-y-6 border border-white/20 bg-[#181614]/80 p-6 backdrop-blur-md sm:p-8"><h2 className="font-serif text-xl font-bold leading-tight text-white sm:text-2xl">¿Necesita asistencia jurídica?</h2><div className="space-y-3"><button type="button" onClick={handleNavigateToContact} className={`flex w-full cursor-pointer items-center justify-center gap-2 bg-[#7F203D] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-md transition-colors hover:bg-[#691931] ${lightFocusRing}`}><span>Estudio jurídico 24 hs</span><ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></button><button type="button" onClick={() => handleNavigateToServices()} className={`flex w-full cursor-pointer items-center justify-center gap-2 border border-white/50 bg-transparent py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10 ${lightFocusRing}`}><span>Ver servicios</span></button></div></div></div></div></div></section>
    <section id="home-services-section" aria-labelledby="services-title" className="w-full border-b border-[#302D28]/10 bg-[#FAF6F0] py-16 lg:py-24"><div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:space-y-16 lg:px-8"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div className="max-w-3xl space-y-4"><p className="text-xs font-bold uppercase tracking-widest text-[#7F203D]">Áreas de práctica del estudio jurídico penal</p><h2 id="services-title" className="font-serif text-3xl font-bold leading-[1.15] tracking-tight text-[#302D28] sm:text-4xl">Servicios del estudio jurídico penal en Mendoza</h2><p className="text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg">Intervención técnica y estratégica de abogada penalista y abogado penalista Mendoza para personas, empresas y organizaciones que necesitan una respuesta jurídica rigurosa, incluida la atención de estudio jurídico 24 hs Mendoza.</p></div><button type="button" onClick={() => handleNavigateToServices()} className={`group inline-flex shrink-0 cursor-pointer items-center gap-3 pb-1 text-xs font-bold uppercase tracking-widest text-[#7F203D] transition-colors hover:text-[#691931] sm:text-sm ${darkFocusRing}`}><span>Ver todos los servicios</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button></div>
      <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-5 [scrollbar-width:none] [-ms-overflow-style:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none lg:grid-cols-4" style={{ WebkitOverflowScrolling: 'touch' }}>
        {SERVICE_AREAS.map((area) => <button key={area.number} type="button" onClick={() => handleNavigateToServices(area.target)} className={`group relative flex min-h-[290px] w-[82vw] shrink-0 snap-center flex-col justify-between overflow-hidden border border-[#DDD2C5] bg-[#302D28] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-auto sm:shrink sm:snap-align-none sm:p-7 ${darkFocusRing}`}>
          <span className="absolute inset-0 opacity-80" aria-hidden="true" style={{ backgroundImage: `radial-gradient(circle at ${area.number === '01' ? '18% 20%' : area.number === '02' ? '82% 18%' : area.number === '03' ? '22% 82%' : '80% 78%'}, rgba(217,169,184,.22), transparent 32%), linear-gradient(135deg, #181614 0%, #3B2A30 52%, #181614 100%)` }} /><span className="relative z-10 flex items-start justify-between"><span className="font-serif text-sm font-bold tracking-[.2em] text-[#D9A9B8]">{area.number}</span><ArrowRight className="h-5 w-5 text-white/60 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span><span className="relative z-10"><span className="block font-serif text-lg font-bold leading-tight text-white sm:text-xl md:text-xl">{area.title}</span><span className="mt-4 block text-sm leading-relaxed text-white/70">{area.description}</span><span className="mt-6 block text-xs font-bold uppercase tracking-widest text-[#D9A9B8]">Ver área de práctica</span></span>
        </button>)}
      </div>
    </div></section><PublicCasesSection onRequestConsultation={onRequestConsultation} />
  </div>;
};
