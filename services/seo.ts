
/**
 * Dynamic SEO Utility for Flower Point
 */

export const updateMeta = (title: string, description: string, image?: string) => {
  document.title = `${title} | Flower Point Boutique`;
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute('content', description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', description);

  if (image) {
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', image);
  }
};

export const injectJSONLD = (data: object) => {
  const existingScript = document.getElementById('json-ld-schema');
  if (existingScript) existingScript.remove();

  const script = document.createElement('script');
  script.id = 'json-ld-schema';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
};

export const clearJSONLD = () => {
  const existingScript = document.getElementById('json-ld-schema');
  if (existingScript) existingScript.remove();
};
