const createConfig = require('@titicaca/eslint-config-triple/create-config')

const { extends: extendConfigs, overrides } = createConfig({
  type: 'frontend',
  project: './tsconfig.json',
})

module.exports = {
  extends: [...extendConfigs],
  overrides: [
    ...overrides,
    {
      files: ['*.ts', '*.tsx'],
      settings: {
        'import/resolver': {
          webpack: {
            config: './webpack.config.js',
          },
        },
      },
    },
  ],
}
