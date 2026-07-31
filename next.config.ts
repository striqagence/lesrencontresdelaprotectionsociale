import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Canonique : rediriger l'apex rencontres-ps.fr vers www.rencontres-ps.fr
      {
        source: "/:path*",
        has: [{ type: "host", value: "rencontres-ps.fr" }],
        destination: "https://www.rencontres-ps.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
