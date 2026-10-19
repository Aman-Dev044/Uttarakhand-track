import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/images/kedarnath.jpg`, `${site.url}/images/badrinath.jpg`, `${site.url}/images/gangotri.jpg`, `${site.url}/images/yamunotri.jpg`],
    },
  ];
}
