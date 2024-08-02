module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript', // Jika Anda menggunakan TypeScript
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
