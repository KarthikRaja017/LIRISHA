import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import {
  ServiceCategory,
  ResourceArticle,
  TestimonialItem,
  GalleryTab,
  PageContent,
  SiteSettingsMap,
} from "@/types/content";

/**
 * Service API Methods
 */
export async function getServices(): Promise<ServiceCategory[]> {
  try {
    return await apiClient.get<ServiceCategory[]>(ENDPOINTS.SERVICES.BASE);
  } catch {
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceCategory | null> {
  try {
    return await apiClient.get<ServiceCategory>(ENDPOINTS.SERVICES.BY_SLUG(slug));
  } catch {
    return null;
  }
}

export async function saveService(service: ServiceCategory): Promise<ServiceCategory> {
  return await apiClient.put<ServiceCategory>(ENDPOINTS.SERVICES.BY_SLUG(service.id), service);
}

export async function deleteService(id: string): Promise<{ id: string }> {
  return await apiClient.delete<{ id: string }>(ENDPOINTS.SERVICES.BY_SLUG(id));
}

/**
 * Resources API Methods (Articles, Blogs, Case Studies)
 */
export async function getResources(category?: string): Promise<ResourceArticle[]> {
  try {
    return await apiClient.get<ResourceArticle[]>(
      ENDPOINTS.RESOURCES.BASE,
      category ? { params: { category } } : undefined
    );
  } catch {
    return [];
  }
}

export async function getResourceBySlug(slug: string): Promise<ResourceArticle | null> {
  try {
    return await apiClient.get<ResourceArticle>(ENDPOINTS.RESOURCES.BY_SLUG(slug));
  } catch {
    return null;
  }
}

export async function saveResource(resource: ResourceArticle): Promise<ResourceArticle> {
  return await apiClient.put<ResourceArticle>(ENDPOINTS.RESOURCES.BY_SLUG(resource.id), resource);
}

export async function deleteResource(id: string): Promise<{ id: string }> {
  return await apiClient.delete<{ id: string }>(ENDPOINTS.RESOURCES.BY_SLUG(id));
}

/**
 * Testimonials API Method
 */
export async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    return await apiClient.get<TestimonialItem[]>(ENDPOINTS.RESOURCES.TESTIMONIALS);
  } catch {
    return [];
  }
}

export async function saveTestimonial(testimonial: TestimonialItem): Promise<TestimonialItem> {
  return await apiClient.put<TestimonialItem>(
    `${ENDPOINTS.RESOURCES.TESTIMONIALS}/${testimonial.id}`,
    testimonial
  );
}

export async function deleteTestimonial(id: string): Promise<{ id: string }> {
  return await apiClient.delete<{ id: string }>(`${ENDPOINTS.RESOURCES.TESTIMONIALS}/${id}`);
}

/**
 * Gallery API Method - with graceful fallback
 */
export async function getGalleryTabs(): Promise<GalleryTab[]> {
  try {
    const tabs = await apiClient.get<GalleryTab[]>(ENDPOINTS.GALLERY.BASE);
    return tabs || [];
  } catch {
    return [];
  }
}

export async function saveGalleryTab(tab: GalleryTab): Promise<GalleryTab> {
  return await apiClient.put<GalleryTab>(ENDPOINTS.GALLERY.BY_ID(tab.id), tab);
}

export async function deleteGalleryTab(id: string): Promise<{ id: string }> {
  return await apiClient.delete<{ id: string }>(ENDPOINTS.GALLERY.BY_ID(id));
}

/**
 * Dynamic Pages CMS Method
 */
export async function getPages(): Promise<PageContent[]> {
  try {
    return await apiClient.get<PageContent[]>(ENDPOINTS.PAGES.BASE);
  } catch {
    return [];
  }
}

export async function getPageContent(slug: string): Promise<PageContent | null> {
  try {
    return await apiClient.get<PageContent>(ENDPOINTS.PAGES.BY_SLUG(slug));
  } catch {
    return null;
  }
}

export async function savePageContent(page: PageContent): Promise<PageContent> {
  return await apiClient.put<PageContent>(ENDPOINTS.PAGES.BY_SLUG(page.slug), page);
}

/**
 * Site Settings & Branding API Methods
 */
export async function getSettings(): Promise<SiteSettingsMap> {
  try {
    return await apiClient.get<SiteSettingsMap>(ENDPOINTS.SETTINGS.BASE);
  } catch {
    return {};
  }
}

export async function getSetting(key: string): Promise<string> {
  try {
    const res = await apiClient.get<{ key: string; value: string }>(ENDPOINTS.SETTINGS.BY_KEY(key));
    return res.value || "";
  } catch {
    return "";
  }
}

export async function saveSettings(settings: Record<string, any>): Promise<SiteSettingsMap> {
  return await apiClient.put<SiteSettingsMap>(ENDPOINTS.SETTINGS.BASE, { settings });
}

export async function saveSingleSetting(key: string, value: string, metadata?: any): Promise<any> {
  return await apiClient.put<any>(ENDPOINTS.SETTINGS.BY_KEY(key), { value, metadata });
}
