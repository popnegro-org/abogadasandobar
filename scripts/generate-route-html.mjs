import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const SITE_URL = 'https://abogadasandobar.com.ar';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/hero/hero-home.webp`;
const PERSON_ID = `${SITE_URL}/#person`;
const SERVICE_ID = `${SITE_URL}/#legal-service`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Must stay aligned with src/utils/useRouteMetadata.ts (SEO on-page).
 *  h1/intro must match visible hero copy so crawlers and UI stay consistent.
 */
const ROUTES = {
  '/': {
    title: 'Abogada Penalista en Mendoza | Estudio Jurídico Penal 24 hs | Emilia Sandobar',
    description:
      'Abogada penalista y abogado penalista en Mendoza. Estudio jurídico penal con defensa, representación de víctimas y estudio jurídico 24 hs Mendoza para urgencias. Consulta confidencial.',
    image: `${SITE_URL}/assets/images/hero/hero-home.webp`,
    imageAlt: 'Dra. Emilia Sandobar — Abogada Penalista y estudio jurídico penal en Mendoza',
    h1: 'Abogada Emilia Sandobar',
    h2: 'Estudio jurídico penal y defensa de víctimas en Mendoza',
    intro:
      'Emilia Sandobar es abogada penalista en Mendoza y dirige un estudio jurídico penal con defensa técnica, representación de víctimas y estudio jurídico 24 hs Mendoza para urgencias. Atención de abogado penalista Mendoza con estrategia rigurosa e intervención profesional directa.',
  },
  '/inicio': {
    title: 'Abogada Penalista en Mendoza | Estudio Jurídico Penal 24 hs | Emilia Sandobar',
    description:
      'Abogada penalista y abogado penalista en Mendoza. Estudio jurídico penal con defensa, representación de víctimas y estudio jurídico 24 hs Mendoza para urgencias. Consulta confidencial.',
    image: `${SITE_URL}/assets/images/hero/hero-home.webp`,
    imageAlt: 'Dra. Emilia Sandobar — Abogada Penalista y estudio jurídico penal en Mendoza',
    h1: 'Abogada Emilia Sandobar',
    h2: 'Estudio jurídico penal y defensa de víctimas en Mendoza',
    intro:
      'Emilia Sandobar es abogada penalista en Mendoza y dirige un estudio jurídico penal con defensa técnica, representación de víctimas y estudio jurídico 24 hs Mendoza para urgencias. Atención de abogado penalista Mendoza con estrategia rigurosa e intervención profesional directa.',
  },
  '/servicios-abogacia-mendoza': {
    title: 'Servicios de Estudio Jurídico Penal en Mendoza | Defensa y Urgencias 24 hs',
    description:
      'Estudio jurídico penal Mendoza: defensa penal, abogado penalista Mendoza, urgencias 24 hs, litigación compleja y asesoramiento corporativo.',
    image: `${SITE_URL}/assets/images/hero/hero-services.webp`,
    imageAlt: 'Servicios del estudio jurídico penal en Mendoza — Emilia Sandobar',
    h1: 'Servicios del estudio jurídico penal en Mendoza',
    intro:
      'Defensa penal, litigación compleja y asesoramiento corporativo del estudio jurídico penal en Mendoza. Abogado penalista Mendoza y estudio jurídico 24 hs Mendoza para personas y organizaciones que necesitan intervención profesional directa.',
  },
  '/abogada-penalista-mendoza': {
    title: 'Abogada Penalista en Mendoza | Estudio Jurídico Penal | Emilia Sandobar',
    description:
      'Emilia Sandobar, abogada penalista en Mendoza. Estudio jurídico penal con litigio provincial y federal, y estudio jurídico 24 hs Mendoza para urgencias.',
    image: `${SITE_URL}/assets/images/hero/hero-about.webp`,
    imageAlt: 'Perfil de Emilia Sandobar, abogada penalista y estudio jurídico penal en Mendoza',
    h1: 'Abogada Penalista en Mendoza',
    intro:
      'Emilia Sandobar es abogada penalista en Mendoza y dirige un estudio jurídico penal con intervención provincial y federal, defensa técnica, representación de víctimas y estudio jurídico 24 hs Mendoza para urgencias. También atiende búsquedas de abogado penalista Mendoza.',
  },
  '/nuestro-metodo': {
    title: 'Método de Trabajo | Estudio Jurídico Penal en Mendoza | Emilia Sandobar',
    description:
      'Método del estudio jurídico penal de Emilia Sandobar en Mendoza: análisis, estrategia y acompañamiento en causas penales, con disponibilidad 24 hs.',
    image: `${SITE_URL}/assets/images/hero/hero-method.webp`,
    imageAlt: 'Método de trabajo — estudio jurídico penal Emilia Sandobar Mendoza',
    h1: 'Nuestro método jurídico',
    intro:
      'Un proceso de trabajo estructurado del estudio jurídico penal en Mendoza para comprender cada situación, evaluar riesgos y construir una estrategia jurídica rigurosa, con disponibilidad de estudio jurídico 24 hs Mendoza.',
  },
  '/preguntas-frecuentes': {
    title: 'Preguntas Frecuentes | Estudio Jurídico Penal 24 hs en Mendoza',
    description:
      'FAQ del estudio jurídico penal Mendoza: contactar guardia 24 hs, abogado penalista Mendoza, qué hacer si me detienen y cómo solicitar consulta.',
    image: `${SITE_URL}/assets/images/hero/hero-faq.webp`,
    imageAlt: 'Preguntas frecuentes — estudio jurídico penal 24 hs Mendoza',
    h1: 'Preguntas frecuentes',
    intro:
      'Respuestas del estudio jurídico penal Mendoza sobre abogada penalista y abogado penalista Mendoza, cómo contactar el estudio jurídico 24 hs Mendoza y qué hacer ante una detención.',
  },
  '/contacto': {
    title: 'Contacto | Estudio Jurídico Penal 24 hs Mendoza | Emilia Sandobar',
    description:
      'Contacte el estudio jurídico penal de Emilia Sandobar en Mendoza. Consulta profesional y estudio jurídico 24 hs Mendoza para urgencias penales.',
    image: `${SITE_URL}/assets/images/hero/hero-contact.webp`,
    imageAlt: 'Contacto del estudio jurídico penal 24 hs en Mendoza — Emilia Sandobar',
    h1: 'Contacto',
    intro:
      'Contacto del estudio jurídico penal de Emilia Sandobar en Mendoza. Solicite consulta profesional o asistencia de estudio jurídico 24 hs Mendoza para urgencias. Atención de abogada penalista y abogado penalista Mendoza.',
  },
};

const SERVICE_TYPES = [
  'Derecho Penal',
  'Abogada penalista',
  'Abogado penalista Mendoza',
  'Estudio jurídico penal Mendoza',
  'Estudio jurídico 24 hs Mendoza',
  'Urgencias penales 24 hs',
  'Litigación penal',
  'Asesoramiento corporativo',
  'Representación penal y seguros',
  'Reclamos indemnizatorios',
];

const AUTHORITY_SOURCES = [
  {
    '@type': 'CreativeWork',
    name: 'Ciclo de charlas Educación Financiera y Nuevas Tecnologías — UNCUYO',
    url: 'https://fce.uncuyo.edu.ar/se-viene-el-ciclo-de-charlas-educacion-financiera-y-nuevas-tecnologias',
  },
  {
    '@type': 'NewsArticle',
    name: 'Allanaron la Liga Mendocina de Fútbol por presunta falsificación de certificados médicos',
    url: 'https://www.radionihuil.com.ar/allanaron-la-liga-mendocina-de-futbol-por-presunta-falsificacion-de-certificados-medicos/',
  },
  {
    '@type': 'NewsArticle',
    name: 'Hubo dos nuevos allanamientos por los certificados truchos de la Liga Mendocina de Fútbol',
    url: 'https://www.diariouno.com.ar/ovacion/hubo-dos-nuevos-allanamientos-el-caso-los-certificados-truchos-la-liga-mendocina-futbol-n1453036',
  },
];

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const canonicalPath = (path) => (path === '/inicio' ? '/' : path);

function buildJsonLd(path, metadata) {
  const canonicalUrl = `${SITE_URL}${canonicalPath(path)}`;
  const breadcrumbItems = path === '/'
    ? [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` }]
    : [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: metadata.title.split(' | ')[0], item: canonicalUrl },
      ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: 'Emilia Sandobar — Estudio Jurídico Penal Mendoza',
        description:
          'Sitio oficial del estudio jurídico penal de la Dra. Emilia Sandobar en Mendoza. Abogada penalista, abogado penalista Mendoza y atención 24 hs.',
        inLanguage: 'es-AR',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: metadata.title,
        description: metadata.description,
        inLanguage: 'es-AR',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': SERVICE_ID },
        breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Emilia Sandobar',
        jobTitle: 'Abogada Penalista',
        url: `${SITE_URL}/abogada-penalista-mendoza`,
        image: `${SITE_URL}/assets/images/portraits/emilia-sandobar.webp`,
        worksFor: { '@id': SERVICE_ID },
        knowsAbout: SERVICE_TYPES,
        subjectOf: AUTHORITY_SOURCES,
      },
      {
        '@type': 'LegalService',
        '@id': SERVICE_ID,
        name: 'Estudio jurídico penal Emilia Sandobar',
        alternateName: [
          'Abogada Penalista Emilia Sandobar',
          'Estudio jurídico penal Mendoza',
          'Estudio jurídico 24 hs Mendoza',
        ],
        url: `${SITE_URL}/`,
        image: DEFAULT_IMAGE,
        logo: `${SITE_URL}/assets/brand/logo-brandmark.svg`,
        description:
          'Estudio jurídico penal en Mendoza dirigido por la Dra. Emilia Sandobar. Abogada penalista y abogado penalista Mendoza con defensa penal, representación de víctimas y estudio jurídico 24 hs Mendoza para urgencias.',
        areaServed: {
          '@type': 'City',
          name: 'Mendoza',
          containedInPlace: { '@type': 'Country', name: 'Argentina' },
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Peatonal Sarmiento 250, 2° B',
          addressLocality: 'Mendoza',
          addressCountry: 'AR',
        },
        email: 'info@abogadasandobar.com.ar',
        telephone: '+54 9 261 346-4483',
        provider: { '@id': PERSON_ID },
        serviceType: SERVICE_TYPES,
      },
    ],
  };
}

function buildSeoStaticMain(metadata) {
  const h1 = escapeHtml(metadata.h1 || metadata.title.split(' | ')[0]);
  const h2 = metadata.h2 ? `<h2>${escapeHtml(metadata.h2)}</h2>` : '';
  const intro = escapeHtml(metadata.intro || metadata.description);

  // Keep in DOM for crawlers; clip out of viewport so UX never sees a pre-hydrate flash.
  // Visible H1 after hydrate comes from React with the same wording.
  const mainStyle =
    'position:absolute;width:1px;height:1px;padding:0;margin:-1px;' +
    'overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';

  return (
    `<main id="seo-static-content" data-seo-static="true" style="${mainStyle}">` +
    `<h1>${h1}</h1>` +
    h2 +
    `<p>${intro}</p>` +
    `<nav aria-label="Secciones principales">` +
    `<ul>` +
    `<li><a href="${SITE_URL}/">Inicio</a></li>` +
    `<li><a href="${SITE_URL}/abogada-penalista-mendoza">Abogada penalista en Mendoza</a></li>` +
    `<li><a href="${SITE_URL}/servicios-abogacia-mendoza">Estudio jurídico penal en Mendoza</a></li>` +
    `<li><a href="${SITE_URL}/preguntas-frecuentes">Preguntas frecuentes</a></li>` +
    `<li><a href="${SITE_URL}/contacto">Contacto y estudio jurídico 24 hs</a></li>` +
    `</ul>` +
    `</nav>` +
    `</main>`
  );
}

const source = await readFile('dist/index.html', 'utf8');
const jsonLdPattern = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;

const OG_IMAGE_WIDTH = '1376';
const OG_IMAGE_HEIGHT = '768';

for (const [path, metadata] of Object.entries(ROUTES)) {
  const canonicalUrl = `${SITE_URL}${canonicalPath(path)}`;
  const jsonLd = JSON.stringify(buildJsonLd(path, metadata), null, 2);
  const image = metadata.image || DEFAULT_IMAGE;
  const imageAlt = metadata.imageAlt || 'Dra. Emilia Sandobar — Abogada Penalista en Mendoza';

  let html = source
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/<meta name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(metadata.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`)
    .replace(/<meta property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*"\s*\/>/, `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`)
    .replace(/<meta name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${image}" />`)
    .replace(/<meta name="twitter:url" content="[^"]*"\s*\/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`)
    .replace(jsonLdPattern, `<script type="application/ld+json">\n${jsonLd}\n  </script>`);

  if (!html.includes('property="og:image:width"')) {
    html = html.replace(
      /<meta property="og:image:alt" content="[^"]*"\s*\/>/,
      (match) => `${match}\n  <meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />\n  <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    );
  } else {
    html = html
      .replace(/<meta property="og:image:width" content="[^"]*"\s*\/>/, `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`)
      .replace(/<meta property="og:image:height" content="[^"]*"\s*\/>/, `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`);
  }

  if (!html.includes('name="twitter:image:alt"')) {
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*"\s*\/>/,
      (match) => `${match}\n  <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
    );
  } else {
    html = html.replace(
      /<meta name="twitter:image:alt" content="[^"]*"\s*\/>/,
      `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`,
    );
  }

  const seoMain = buildSeoStaticMain(metadata);
  if (html.includes('<div id="root"></div>')) {
    html = html.replace('<div id="root"></div>', `<div id="root">${seoMain}</div>`);
  } else if (/<div id="root">/.test(html)) {
    html = html.replace(
      /<div id="root">[\s\S]*?<\/div>(\s*<script type="module")/,
      `<div id="root">${seoMain}</div>$1`,
    );
  }

  const outputPath = path === '/' ? 'dist/index.html' : join('dist', path.replace(/^\//, ''), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

console.log(`Static SEO HTML generated for ${Object.keys(ROUTES).length} routes.`);
