// lib/seo.ts
export function generateSEO(title: string, description: string, image: string) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      image,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image,
    },
  };
}
