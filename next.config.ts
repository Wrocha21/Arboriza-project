import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-7ac4dab91a7f426d879ed5c590478ab4.r2.dev', // 👈 Atualizado aqui
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
