//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/

const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  reactStrictMode: false,
  nx: {
    svgr: false,
  },
};

/** @param config {import('next').NextConfig} */
const withNxNext16 = (config) => {
  if ('eslint' in config) delete config.eslint;
  return config;
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withNxNext16,
];

module.exports = composePlugins(...plugins)(nextConfig);
