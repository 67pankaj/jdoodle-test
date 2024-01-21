// Recommended Vue element attribute order - https://vuejs.org/style-guide/rules-recommended.html#element-attribute-order
const $VUE_ATTRIBUTE_ORDER = [
  '^(:|v-)is$',
  '^v-for$',
  '^v-(if|else-if|else|show|cloak)$',
  '^v-(once|pre|memo)$',
  '^:?id$',
  '^:?key$',
  '^:?ref$',
  '^(v-)?slot$',
  '^#',
  '^v-model$',
  '^v-(?!bind|on|html|text)',
  '^class$',
  '^(v-bind)?:class$',
  '^((v-bind)?:)?(?!data-|v-|:|@|#)',
  '$DEFAULT',
  '^((v-bind)?:)?data-',
  '^v-bind$',
  '^v-on',
  '^@',
  '^v-html$',
  '^v-text$'
];

module.exports = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'always',
  vueIndentScriptAndStyle: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-organize-attributes',
    'prettier-plugin-css-order'
  ],
  attributeGroups: $VUE_ATTRIBUTE_ORDER,
  attributeSort: 'ASC'
};
