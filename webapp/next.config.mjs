/** @type {import('next').NextConfig} */
const nextConfig = {
  // `ws` (usado por el driver Neon sobre WebSocket en local, ver src/lib/prisma.ts)
  // se rompe si el bundler de Next lo empaqueta: `bufferUtil.mask is not a function`.
  // Dejarlo como paquete externo lo carga tal cual desde node_modules.
  experimental: {
    serverComponentsExternalPackages: ["ws", "@neondatabase/serverless"],
  },
};

export default nextConfig;
