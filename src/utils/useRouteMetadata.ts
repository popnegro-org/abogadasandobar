import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateStructuredData } from './structuredData';

const SITE_URL = 'https://abogadasandobar.com.ar';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/hero/hero-home.webp`;

interface RouteMetadata {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

/** Keep in sync with scripts/generate-route-html.mjs */
const ROUTE_METADATA: Record<string, RouteMetadata> = {
  '/': {
    title: 'Abogada Penalista en Mendoza | Estudio Jurídico Penal 24 hs | Emilia Sandobar',
    description:
      'Abogada penalista y abogado penalista en Mendoza. Estudio jurídico penal con defensa, representación de víctimas y estudio jurídico 24 hs Mendoza para urgencias. Consulta confidencial.',
    image: `${SITE_URL}/assets/images/hero/hero-home.webp`,
    imageAlt: 'Dra. Emilia Sandobar — Abogada Penalista y estudio jurídico penal en Mendoza',
  },
  '/inicio': {
    title: 'Abogada Penalista en Mendoza | Estudio Jurídico Penal 24 hs | Emilia Sandobar',
    description:
      'Abogada penalista y abogado penalista en Mendoza. Estudio jurídico penal con defensa, representación de víctimas y estudio jurídico 24 hs Mendoza para urgencias. Consulta confidencial.',
    image: `${SITE_URL}/assets/images/hero/hero-home.webp`,
    imageAlt: 'Dra. Emilia Sandobar — Abogada Penalista y estudio jurídico penal en Mendoza',
  },
  '/servicios-abogacia-mendoza': {
    title: 'Servicios de Estudio Jurídico Penal en Mendoza | Defensa y Urgencias 24 hs',
    description:
      'Estudio jurídico penal Mendoza: defensa penal, abogado penalista Mendoza, urgencias 24 hs, litigación compleja y asesoramiento corporativo.',
    image: `${SITE_URL}/assets/images/hero/hero-services.webp`,
    imageAlt: 'Servicios del estudio jurídico penal en Mendoza — Emilia Sandobar',
  },
  '/abogada-penalista-mendoza': {
    title: 'Abogada Penalista en Mendoza | Estudio Jurídico Penal | Emilia Sandobar',
    description:
      'Emilia Sandobar, abogada penalista en Mendoza. Estudio jurídico penal con litigio provincial y federal, y estudio jurídico 24 hs Mendoza para urgencias.',
    image: `${SITE_URL}/assets/images/hero/hero-about.webp`,
    imageAlt: 'Perfil de Emilia Sandobar, abogada penalista y estudio jurídico penal en Mendoza',
  },
  '/nuestro-metodo': {
    title: 'Método de Trabajo | Estudio Jurídico Penal en Mendoza | Emilia Sandobar',
    description:
      'Método del estudio jurídico penal de Emilia Sandobar en Mendoza: análisis, estrategia y acompañamiento en causas penales, con disponibilidad 24 hs.',
    image: `${SITE_URL}/assets/images/hero/hero-method.webp`,
    imageAlt: 'Método de trabajo — estudio jurídico penal Emilia Sandobar Mendoza',
  },
  '/preguntas-frecuentes': {
    title: 'Preguntas Frecuentes | Estudio Jurídico Penal 24 hs en Mendoza',
    description:
      'FAQ del estudio jurídico penal Mendoza: contactar guardia 24 hs, abogado penalista Mendoza, qué hacer si me detienen y cómo solicitar consulta.',
    image: `${SITE_URL}/assets/images/hero/hero-faq.webp`,
    imageAlt: 'Preguntas frecuentes — estudio jurídico penal 24 hs Mendoza',
  },
  '/contacto': {
    title: 'Contacto | Estudio Jurídico Penal 24 hs Mendoza | Emilia Sandobar',
    description:
      'Contacte el estudio jurídico penal de Emilia Sandobar en Mendoza. Consulta profesional y estudio jurídico 24 hs Mendoza para urgencias penales.',
    image: `${SITE_URL}/assets/images/hero/hero-contact.webp`,
    imageAlt: 'Contacto del estudio jurídico penal 24 hs en Mendoza — Emilia Sandobar',
  },
};

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

export function useRouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = ROUTE_METADATA[pathname] ?? ROUTE_METADATA['/'];
    const canonicalPath = pathname === '/inicio' ? '/' : pathname;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const image = metadata.image ?? DEFAULT_IMAGE;
    const imageAlt = metadata.imageAlt ?? 'Dra. Emilia Sandobar — Abogada Penalista en Mendoza';

    document.title = metadata.title;

    upsertMeta('name', 'description', metadata.description);
    upsertMeta(
      'name',
      'keywords',
      'abogada penalista Mendoza, abogado penalista Mendoza, estudio jurídico penal Mendoza, estudio jurídico 24 hs Mendoza, defensa penal Mendoza, urgencias penales 24 hs',
    );
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'es_AR');
    upsertMeta('property', 'og:site_name', 'Emilia Sandobar — Estudio Jurídico Penal');
    upsertMeta('property', 'og:title', metadata.title);
    upsertMeta('property', 'og:description', metadata.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:image:alt', imageAlt);
    upsertMeta('property', 'og:image:width', '1376');
    upsertMeta('property', 'og:image:height', '768');
    upsertMeta('property', 'og:image:type', 'image/webp');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', metadata.title);
    upsertMeta('name', 'twitter:description', metadata.description);
    upsertMeta('name', 'twitter:image', image);
    upsertMeta('name', 'twitter:image:alt', imageAlt);
    upsertMeta('name', 'twitter:url', canonicalUrl);

    upsertCanonical(canonicalUrl);
    updateStructuredData({ path: canonicalPath, ...metadata });
  }, [pathname]);
}
