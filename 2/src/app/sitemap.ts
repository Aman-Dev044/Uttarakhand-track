import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "weekly",
      priority: 1,
      images: ["hero", "kedarkantha", "roopkund", "valley-of-flowers", "kedarnath"].map((n) => `${site.url}/images/${n}.jpg`),
    },
  ];
}
