import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Otras configuraciones de Next.js
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public", // Carpeta donde se generará el Service Worker
    register: true, // Registra automáticamente el Service Worker
    skipWaiting: true, // Hace que el SW actualizado tome el control inmediatamente
  },
});
