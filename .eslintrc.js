module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true
	},
	"extends": [
		"prettier",
		"plugin:prettier/recommended",
		"eslint:recommended",
		"plugin:vue/vue3-essential",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"plugins": [
		"vue",
		"@typescript-eslint"
	],
	"rules": {
		"no-debugger": 0,
		"no-unused-vars": [
			0,
			{
				argsIgnorePattern: "res|next|^err",
			},
		],
		"arrow-body-style": [0, "as-needed"],
		"no-param-reassign": [
			0,
			{
				props: false,
			},
		],
		"no-console": 0,
		"prefer-const": 0,
		"import/prefer-default-export": 0,
		import: 0,
		export: 0,
		"func-names": 0,
		"space-before-function-paren": 0,
		"comma-dangle": 0,
		"max-len": 0,
		"import/extensions": 0,
		"no-underscore-dangle": 0,
		"consistent-return": 0,
		"react/display-name": 0,
		"react/react-in-jsx-scope": 0,
		"react/prefer-stateless-function": 0,
		"react/forbid-prop-types": 0,
		"react/no-unescaped-entities": 0,
	}
}