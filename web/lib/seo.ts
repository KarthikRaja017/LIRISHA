import type { Metadata } from "next";
import { getPageContent, getServiceBySlug } from "./api/content";

/**
 * Dynamically resolves SEO and meta tags for pages configured in Admin Studio.
 * Fetches page content (title, metaDescription) from PostgreSQL via API,
 * falling back gracefully to defaults if the API is offline.
 */
export async function getDynamicPageMetadata(
  slug: string,
  defaultTitle: string,
  defaultDescription: string
): Promise<Metadata> {
  try {
    const page = await getPageContent(slug);
    const title = page?.title?.trim() || defaultTitle;
    const description = page?.metaDescription?.trim() || defaultDescription;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: defaultTitle,
      description: defaultDescription,
    };
  }
}

/**
 * Dynamically resolves SEO and meta tags for service pages.
 * Prioritizes custom page overrides from Admin, then service category database entity,
 * and falls back gracefully to defaults.
 */
export async function getDynamicServiceMetadata(
  slug: string,
  defaultTitle: string,
  defaultDescription: string
): Promise<Metadata> {
  try {
    const page = await getPageContent(slug);
    if (page?.title || page?.metaDescription) {
      const title = page?.title?.trim() || defaultTitle;
      const description = page?.metaDescription?.trim() || defaultDescription;
      return {
        title,
        description,
        openGraph: { title, description, type: "website" },
        twitter: { card: "summary_large_image", title, description },
      };
    }
    const service = await getServiceBySlug(slug);
    const title = service?.name ? `${service.name} | LIRISHA` : defaultTitle;
    const description = service?.tagline || service?.shortDesc || defaultDescription;
    return {
      title,
      description,
      openGraph: { title, description, type: "website" },
      twitter: { card: "summary_large_image", title, description },
    };
  } catch {
    return {
      title: defaultTitle,
      description: defaultDescription,
    };
  }
}
