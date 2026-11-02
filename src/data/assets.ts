/** Public asset paths shared by the shell and route components.
 *
 * Solo rutas que existen realmente bajo public/assets.
 * Las imágenes de servicios individuales aún no están publicadas;
 * las secciones de servicios usan hero + patrones CSS.
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

  /** Fallback visual para ítems de catálogo hasta disponer de assets por servicio. */
  serviceFallback: '/assets/images/hero/hero-services.webp',

  portrait: '/assets/images/portraits/emilia-sandobar.webp',
  deskDocs: '/assets/images/legal/desk-docs.webp',
  library: '/assets/images/editorial/library.webp',
  stoneArch: '/assets/images/architecture/stone-arch.webp',
  map: '/assets/images/location/map.webp',
} as const;
