
const { getDefaultConfig } = require('expo/metro-config');
const { FileStore } = require('metro-cache');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Use turborepo to restore the cache when possible
config.cacheStores = [
  new FileStore({ root: path.join(__dirname, 'node_modules', '.cache', 'metro') }),
];

// Ensure proper module resolution order
config.resolver = {
  ...config.resolver,
  sourceExts: [...(config.resolver?.sourceExts || []), 'tsx', 'ts', 'jsx', 'js', 'json'],
};

// Add transformer options to handle polyfills
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

// Add serializer to inject polyfills at the beginning
config.serializer = {
  ...config.serializer,
  getModulesRunBeforeMainModule: () => {
    // This ensures polyfills run before any other code
    return [];
  },
};

module.exports = config;
