module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        components: ['VLabel'],
        controlComponents: ['VInput'],
        required: {
          some: ['id'],
        },
        allowChildren: false,
      },
    ],
    'max-len': 'off',
  },
};
