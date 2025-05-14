import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.(glb|gltf)$/,
  //     use: {
  //       loader: 'file-loader',
  //     },
  //   });
  //   return config;
  // },
  // Turbopack configuration for 3D models
  turbopack: {
    rules: {
      // Support for 3D model files
      '*.glb': {
        loaders: ['file-loader'],
      },
      '*.gltf': {
        loaders: ['file-loader'],
      },
      // Add support for additional asset types if needed
      '*.obj': {
        loaders: ['file-loader'],
      },
      '*.fbx': {
        loaders: ['file-loader'],
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "**"
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
