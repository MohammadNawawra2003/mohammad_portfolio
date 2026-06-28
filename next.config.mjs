/** @type {import('next').NextConfig} */

// When building for GitHub Pages we produce a fully static export served from a
// repo subpath. Toggled by BUILD_STATIC so local dev / other hosts are unchanged.
const isStatic = process.env.BUILD_STATIC === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Static export has no image optimisation server.
    ...(isStatic ? { unoptimized: true } : {}),
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  ...(isStatic
    ? {
        output: "export",
        basePath: basePath || undefined,
        assetPrefix: basePath || undefined,
        trailingSlash: true,
      }
    : {
        // Custom headers aren't supported by `output: export`.
        async headers() {
          return [
            {
              source: "/:all*(svg|jpg|jpeg|png|webp|avif|woff2|pdf)",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=31536000, immutable",
                },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
