import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

// Required for `output: export` (GitHub Pages build).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
