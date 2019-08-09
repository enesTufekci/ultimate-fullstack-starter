const alias = {
  entity: './src/entity',
  modules: './src/modules',
  types: './src/types',
  auth: './src/auth'
}

module.exports = {
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'module-resolver',
      {
        root: ['./'],
        alias
      }
    ],
    'babel-plugin-transform-typescript-metadata',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ]
  ],
  presets: ['@babel/preset-env', '@babel/preset-typescript']
}
