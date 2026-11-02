const SITE_URL = 'https://abogadasandobar.com.ar';

const PERSON_ID = `${SITE_URL}/#person`;
const SERVICE_ID = `${SITE_URL}/#legal-service`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export interface StructuredPage {
  path: string;
  title: string;
  description: string;
}

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

/** Coordenadas del despacho (Peatonal Sarmiento 250, Mendoza) — alineadas al embed de Google Maps. */
const OFFICE_GEO = {
  '@type': 'GeoCoordinates',
  latitude: -32.890209,
  longitude: -68.842749,
} as const;

const OFFICE_MAP_URL =
  'https://www.google.com/maps/place/Abogada+Emilia+Sandobar/@-32.890209,-68.842749,15z';

const OFFER_CATALOG = {
  '@type': 'OfferCatalog',
  name: 'Servicios del estudio jurídico penal',
  itemListElement: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Defensa penal y litigación',
        description:
          'Representación de personas imputadas y litigación en causas penales provinciales y federales.',
        areaServed: 'Mendoza, Argentina',
        provider: { '@id': SERVICE_ID },
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Estudio jurídico 24 hs Mendoza',
        description:
          'Guardia penal y urgencias 24 hs: detenciones, allanamientos, citaciones y medidas de coerción.',
        areaServed: 'Mendoza, Argentina',
        provider: { '@id': SERVICE_ID },
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Representación de víctimas y querellas',
        description:
          'Impulso de la investigación, producción de prueba y protección de derechos de las víctimas.',
        areaServed: 'Mendoza, Argentina',
        provider: { '@id': SERVICE_ID },
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Asesoramiento corporativo y compliance',
        description:
          'Asesoramiento preventivo, compliance e integridad para empresas y equipos directivos.',
        areaServed: 'Mendoza, Argentina',
        provider: { '@id': SERVICE_ID },
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Reclamos indemnizatorios',
        description:
          'Representación en reclamos por lesiones y daños derivados de accidentes de tránsito.',
        areaServed: 'Mendoza, Argentina',
        provider: { '@id': SERVICE_ID },
      },
    },
  ],
};

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

function upsertJsonLd(id: string, data: unknown) {
  let script = document.head.querySelector<HTMLScriptElement>(`script[data-structured-data="${id}"]`);
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.structuredData = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function updateStructuredData(page: StructuredPage) {
  const canonicalUrl = `${SITE_URL}${page.path === '/inicio' ? '/' : page.path}`;
  const breadcrumbItems = page.path === '/'
    ? [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL + '/' }]
    : [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: page.title.split(' | ')[0], item: canonicalUrl },
      ];

  upsertJsonLd('entity', {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Emilia Sandobar',
        jobTitle: 'Abogada Penalista',
        url: `${SITE_URL}/abogada-penalista-mendoza`,
        image: `${SITE_URL}/assets/images/portraits/emilia-sandobar.webp`,
        worksFor: { '@id': SERVICE_ID },
        knowsAbout: SERVICE_TYPES,
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Universidad Nacional de Cuyo',
          url: 'https://www.uncuyo.edu.ar/',
        },
        subjectOf: AUTHORITY_SOURCES,
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/abogada-penalista-mendoza#profilepage`,
        url: `${SITE_URL}/abogada-penalista-mendoza`,
        name: 'Abogada Penalista en Mendoza | Estudio Jurídico Penal | Emilia Sandobar',
        mainEntity: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
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
        url: SITE_URL + '/',
        image: `${SITE_URL}/assets/images/hero/hero-home.webp`,
        logo: `${SITE_URL}/assets/brand/logo-brandmark.svg`,
        description:
          'Estudio jurídico penal en Mendoza dirigido por la Dra. Emilia Sandobar. Abogada penalista y abogado penalista Mendoza con defensa penal, representación de víctimas y estudio jurídico 24 hs Mendoza para urgencias. Atención de guardia penal 24 hs.',
        areaServed: [
          {
            '@type': 'City',
            name: 'Mendoza',
            containedInPlace: {
              '@type': 'AdministrativeArea',
              name: 'Provincia de Mendoza',
              containedInPlace: { '@type': 'Country', name: 'Argentina' },
            },
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Fueros Federales de Cuyo',
          },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Peatonal Sarmiento 250, 2° B',
          addressLocality: 'Mendoza',
          addressRegion: 'Mendoza',
          addressCountry: 'AR',
        },
        geo: OFFICE_GEO,
        hasMap: OFFICE_MAP_URL,
        openingHours: 'Mo-Fr 08:30-19:30',
        email: 'info@abogadasandobar.com.ar',
        telephone: '+54 9 261 346-4483',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: '+54 9 261 346-4483',
            email: 'info@abogadasandobar.com.ar',
            availableLanguage: ['Spanish'],
            areaServed: 'AR',
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:30',
              closes: '19:30',
            },
          },
          {
            '@type': 'ContactPoint',
            contactType: 'emergency',
            telephone: '+54 9 261 346-4483',
            availableLanguage: ['Spanish'],
            areaServed: 'AR',
            description: 'Guardia penal / estudio jurídico 24 hs Mendoza',
          },
        ],
        provider: { '@id': PERSON_ID },
        employee: { '@id': PERSON_ID },
        serviceType: SERVICE_TYPES,
        hasOfferCatalog: OFFER_CATALOG,
        keywords:
          'abogada penalista Mendoza, abogado penalista Mendoza, estudio jurídico penal Mendoza, estudio jurídico 24 hs Mendoza, defensa penal, urgencias penales 24 hs',
      },
    ],
  });

  upsertJsonLd('page', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: page.title,
    description: page.description,
    inLanguage: 'es-AR',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    provider: { '@id': SERVICE_ID },
    breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
  });

  upsertJsonLd('breadcrumb', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  });

  upsertJsonLd('website', {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL + '/',
    name: 'Emilia Sandobar — Estudio Jurídico Penal Mendoza',
    description:
      'Sitio oficial del estudio jurídico penal de la Dra. Emilia Sandobar en Mendoza. Abogada penalista, abogado penalista Mendoza y atención 24 hs.',
    inLanguage: 'es-AR',
    publisher: { '@id': PERSON_ID },
  });
}
