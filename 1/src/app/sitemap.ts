import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/images/hero.jpg`, `${site.url}/images/kedarnath.jpg`, `${site.url}/images/roopkund.jpg`],
    },
  ];
}
