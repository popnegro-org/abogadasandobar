/** Public asset paths shared by the shell and route components.
 *
 * Solo rutas que existen realmente bajo public/assets.
 */
export const ASSETS = {
  logoMonogram: '/assets/brand/logo-monogram.svg',
  logoBrandmark: '/assets/brand/logo-brandmark.svg',

  heroOffice: '/assets/images/hero/hero-home.webp',
  heroServices: '/assets/images/hero/hero-services.webp',
  heroAbout: '/assets/images/hero/hero-about.webp',
  heroMethod: '/assets/images/hero/hero-method.webp',
  heroFaq: '/assets/images/hero/hero-faq.webp',
  heroContact: '/assets/images/hero/hero-contact.webp',

  serviceDelitosEconomicos: '/assets/images/services/delitos-economicos.svg',
  serviceLitigacionCompleja: '/assets/images/services/litigacion-compleja.svg',
  serviceCompliancePenal: '/assets/images/services/compliance-penal.svg',
  serviceDelitosSocietarios: '/assets/images/services/delitos-societarios.svg',
  serviceCiberdelincuencia: '/assets/images/services/ciberdelincuencia.svg',
  serviceUrgenciasPenales: '/assets/images/services/urgencias-penales.svg',
  serviceInvestigacionesInternas: '/assets/images/services/investigaciones-internas.svg',
  servicePenalMedioambiental: '/assets/images/services/penal-medioambiental.svg',

  /** Fallback genérico si un ítem no tiene asset propio. */
  serviceFallback: '/assets/images/hero/hero-services.webp',

  portrait: '/assets/images/portraits/emilia-sandobar.webp',
  deskDocs: '/assets/images/legal/desk-docs.webp',
  library: '/assets/images/editorial/library.webp',
  stoneArch: '/assets/images/architecture/stone-arch.webp',
  map: '/assets/images/location/map.webp',
} as const;
