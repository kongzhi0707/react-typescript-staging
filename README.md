### React+TypeScript 项目搭建

搭建一套 React+TypeScript 项目环境， 方便后续开发。

#### 注意：我这边前端编辑器是使用 vscode 编码的。

- [x] [环境搭建](#id1) <br/>
- [x] [规范代码与提交](#id2) <br/>
- [x] [Webpack 配置](#id3) <br/>
- [x] [区分开发/生产环境](#id4) <br/>
- [x] [本地服务实时查看页面](#id5) <br/>
- [x] [devtool](#id6) <br/>
- [x] [打包编译前清理 dist 目录](#id7) <br/>
- [x] [样式文件处理](#id8) <br/>
- [x] [图片和字体文件处理](#id9) <br/>
- [x] [支持React](#id10) <br/>
- [x] [支持TypeScript](#id11) <br/>
- [x] [公共环境优化](#id12) <br/>
- [x] [开发环境优化](#id13) <br/>
- [x] [生产环境优化](#id14) <br/>


### <div id="id1">一：环境搭建</div>

在相应的位置，创建空项目文件， 使用命令： mkdir react-typescript-staging

#### 1. package.json

每一个项目根目录都需要一个 package.json 文件，它的作用是记录项目的配置信息，比如项目名称，包的入口文件，项目版本，项目所需要的各种依赖，scripts 字段，指定了运行脚本命令的 npm 命令行缩写。

如下命令可以快速生成该文件：

```
npm init -y
```

#### 2. .gitignore

在项目的根目录下 新建 .gitignore 文件， 该文件的作用是：git 提交时所需要忽略掉的文件或文件夹。目前我这边忽略掉如下文件，后面有需要忽略可以自己继续添加，忽略的文件如下：

```
node_modules/
.DS_Store
build/
dist/
```

#### 3. .npmrc

我们平时使用 npm 下载包时，由于服务器在国外，因此下载包，有时候速度非常慢，我们平时的做法可以设置 npm 源为淘宝镜像源，速度会变快。我们只需要在命令
行中执行如下命令：

```
npm config set registry https://registry.npm.taobao.org
```

但是假如之前没有设置过该淘宝源的话，当使用我们项目环境的时候，又要重新设置下会比较繁琐，因此为了不让用户繁琐，我们可以先在项目根目录下添加一个 .npmrc 文件，并且做一些简单的配置即可：

```
# 在项目的根目录下 创建 .npmrc 文件

touch .npmrc
```

在该文件内输入配置

```
registry=https://registry.npm.taobao.org/
```

#### 4. README.md

在项目的根目录下 新建 README.md，该文件可以编写一些项目配置环境的说明文档。

### <div id="id2">二：规范代码与提交</div>

多人共同开发一个项目最大的问题就是代码风格各异，有的人习惯使用 2 个空格，有的人习惯使用 4 个空格，导致后续其他人维护代码越来越困难。因此我们从项目开始
就要定一个规则将大家编码的风格统一。这样最终的结果是：增强代码的可维护性。

#### 1. EditorConfig

.editorconfig 是跨编辑器维护一致编码风格的配置文件。有的编辑器会默认集成读取该配置文件的功能，但是 vscode 需要安装相应的扩展 EditorConfig For vs Code.

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/1.png" />

安装完此扩展后，我们在项目的根目录下新建 .editorconfig 文件，然后我们在该文件下 添加如下配置：

```
# 如果未指定 root = true，则 EditorConfig 将继续在项目外部查找 .editorconfig 文件。
root = true

# 以下配置适用文件类型，可对不同文件类型设置不同规则
[*.{js,jsx,ts,tsx,vue,scss,json,less,stylus}]

indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

扩展和配置都添加完成后，编辑器会首先去读取该配置文件，对缩进风格及缩进大小，按照我们上面的配置来。

```
indent_style：缩进风格，可选配置有 tab 和 space.
indent_size: 缩进大小，比如我们按 enter 键换行的时候，会按照该设置 2个空格换行。
end_of_line：换行符，可选配置有 lf ，cr ，crlf，会有三种的原因是因为各个操作系统之间的换行符不一致。许多有名的开源库都是使用 lf ，我们这边保持和他们一样。
charset：编码格式，一般选择 utf-8
trim_trailing_whitespace: 去除多余的空格，比如我们不小心在尾巴多打了一个空格，然后会帮我们自动去掉。
insert_final_newline：在尾部插入一行。
```

在以 后缀 md 文件中，，以 .md 文件中把去除多余空格关掉了。

#### 2. Prettier

EditorConfig 是帮我们统一编辑器的风格的，Prettier 是帮我们统一项目风格的。因此我们需要安装 Prettier， 安装命令如下：

```
npm install prettier -D
```

安装成功后，需要在项目的根目录下新建文件 .prettierrc, 输入如下配置：

```
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "endOfLine": "lf",
  "printWidth": 120,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

下面解释下上面的各个配置项：

```
trailingComma：给对象的最后一个属性末尾添加 ， 比如 { a:1, b: 2 } 会被格式化为： { a: 1, b: 2, }。
tabWidth：缩进大小
semi：语句后面是否添加分号。
singleQuote: 是否单引号。
jsxSingleQuote：jsx语法是否单引号。
endOfLine：和上面的 .editorconfig 保持一致设置。
printWidth：单行代码最长字符长度，超过之后会自动格式化换行。
bracketSpacing：在对象中的括号之间打印空格，比如 {a:5} 被格式化为 { a: 5 }
arrowParens: 箭头函数的参数无论有几个，都需要括号包裹起来。
```

我们还需要安装扩展 Prettier - Code formatter。

当安装结束后，在项目的根目录下新建一个文件夹 .vscode, 在该文件夹下再建一个 settings.json 文件。

该文件的配置 优先于 vscode 全局的 settings.json。 当我们下载项目开发后，我们不会因为全局的 settings.json 的配置不同导致 Prettier 或
ESLint, StyleLint 失效。

.vscode/settings.json 添加如下配置项：

```
{
  // 指定哪些文件不参与搜索
  "search.exclude": {
    "**/node_modules": true,
    "dist": true,
    "yarn.lock": true
  },
  "editor.formatOnSave": true,
  "prettier.tabWidth": 2,
  "prettier.semi": true,
  "prettier.singleQuote": true,
  "prettier.printWidth": 120,

  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript|react]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript|react]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

#### eslint-plugin-prettier

eslint-plugin-prettier 是一个 ESlint 插件，由 Prettier 生态提供，用于报告错误给 eslint。因此我们安装该插件：

```
npm install eslint-plugin-prettier eslint-config-prettier
```

#### eslint-config-prettier 的作用是使用 Prettier 默认推荐配置，并且关闭 eslint 自身格式化功能，防止 Prettier 和 Eslint 自身格式化冲突。

#### 3. ESLint

如上 EditorConfig 和 Prettier 是为了解决代码风格问题， 而 ESLint 是为了解决代码质量问题。它能在我们编写代码的时候就检测到程序是否符合规范。
我们还可以通过 eslint --fix 自动修复一些代码的写法问题。 比如 当我定义了 var name = 'kongzhi', 自动修复后变为 const name = 'kongzhi';
当无法自动修复时，会给出红线提示，强制开发人员为其寻求更好的解决方案。

首先我们需要在项目中安装 eslint。安装命令如下：

```
npm install eslint -D
```

安装成功后，执行以下命令：

```
npx eslint --init
```

执行完上面的命令后， 需要回答如下问题：

```
1）How would you like to use ESLint?

我们选择第三条 To check syntax, find problems, and enforce code style ，检查语法、检测问题并强制代码风格。

2）What type of modules does your project use?

项目非配置代码都是采用的 ES6 模块系统导入导出，选择 JavaScript modules (import/export) 。

3）Which framework does your project use?

选择 React

4) Does your project use TypeScript?

选择 Yes 后生成的 eslint 配置文件会给我们默认配上支持 Typescript 的 parse 以及插件 plugins 等。

5) Where does your code run?

Browser 和 Node 环境都选上，之后可能会编写一些 node 代码。

6) How would you like to define a style for your project?

选择 Use a popular style guide ，即使用社区已经制定好的代码风格，我们去遵守就行。

7) Which style guide do you want to follow?

选择 Airbnb 风格，都是社区总结出来的最佳实践。

8) What format do you want your config file to be in?

选择 JavaScript ，即生成的配置文件是 js 文件，配置更加灵活。

9) Would you like to install them now with npm?

选择yes
```

如下图：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/2.png" />

执行完成后，我们的项目根目录下会多出了新的文件 .eslintrc.js 文件。这就是我们的 eslint 的配置文件了。默认的内容如下：

```
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {}
}
```

上面的各个属性的具体含义可以到 <a href="https://eslint.bootcss.com/docs/user-guide/configuring">查看文档</a>了解下，

我们需要对上面配置作以下修改：

```
1）如果我们要开启 React Hooks 的检查，我们需要在 extends 中添加一项 "airbnb/hooks";
2) 根据 <a href="https://www.npmjs.com/package/@typescript-eslint/eslint-plugin">@typescript-eslint/eslint-plugin</a> 官方说明，在 extends 中添加 'plugin:@typescript-eslint/recommended' 可开启针对 ts 语法推荐的规则定义。
3) 添加以下规则到 rules 即可：
```

```
rules: {
  'import/extensions': [
    ERROR,
    'ignorePackages',
    {
      ts: 'never',
      tsx: 'never',
      json: 'never',
      js: 'never',
    },
  ],
}
```

接下来安装 2 个社区中比较火的 eslint 插件：

eslint-plugin-promise ：让你把 Promise 语法写成最佳实践。
eslint-plugin-unicorn ：提供了更多有用的配置项，比如我会用来规范关于文件命名的方式。

执行以下命令进行安装：

```
npm install eslint-plugin-promise eslint-plugin-unicorn -D

npm install typescript -D
```

因此 最后的 .eslintrc.js 配置文件最终为如下：

```
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // 使用 prettier 推荐配置
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'unicorn', 'promise', '@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
      },
      typescript: {},
    },
  },
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        json: 'never',
        js: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
    'import/prefer-default-export': OFF,
    'import/no-unresolved': ERROR,
    'import/no-dynamic-require': OFF,

    'unicorn/better-regex': ERROR,
    'unicorn/prevent-abbreviations': OFF,
    'unicorn/filename-case': [
      ERROR,
      {
        cases: {
          // 中划线
          kebabCase: true,
          // 小驼峰
          camelCase: true,
          // 下划线
          snakeCase: false,
          // 大驼峰
          pascalCase: true,
        },
      },
    ],
    'unicorn/no-array-instanceof': WARN,
    'unicorn/no-for-loop': WARN,
    'unicorn/prefer-add-event-listener': [
      ERROR,
      {
        excludedPackages: ['koa', 'sax'],
      },
    ],
    'unicorn/prefer-query-selector': ERROR,
    'unicorn/no-null': OFF,
    'unicorn/no-array-reduce': OFF,

    '@typescript-eslint/no-useless-constructor': ERROR,
    '@typescript-eslint/no-empty-function': WARN,
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-use-before-define': ERROR,
    '@typescript-eslint/no-unused-vars': WARN,
    'no-unused-vars': WARN, // 警告不允许出现未使用的变量

    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', 'ts', '.jsx', 'js'] }],
    'react/jsx-indent-props': [ERROR, 2],
    'react/jsx-indent': [ERROR, 2],
    'react/jsx-one-expression-per-line': OFF,
    'react/destructuring-assignment': OFF,
    'react/state-in-constructor': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/prop-types': OFF,

    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,

    'lines-between-class-members': [ERROR, 'always'],
    // indent: [ERROR, 2, { SwitchCase: 1 }],
    'linebreak-style': [ERROR, 'unix'],
    quotes: [ERROR, 'single'],
    semi: [WARN, 'always'], // 警告强制加上句尾分号
    'no-unused-expressions': WARN,
    'no-plusplus': OFF,
    'no-console': OFF,
    'class-methods-use-this': ERROR,
    'jsx-quotes': [ERROR, 'prefer-single'],
    'global-require': OFF,
    'no-use-before-define': OFF,
    'no-restricted-syntax': OFF,
    'no-continue': OFF,
  },
};
```

我们知道 eslint 由编辑器支持是有自动修复功能的，首先我们需要安装扩展：

再到之前创建的 .vscode/settings.json 中添加以下代码：

```
{
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "typescript.tsdk": "./node_modules/typescript/lib", // 代替 vscode 的 ts 语法智能提示
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
}
```

如上添加完成后，我们还需要在项目根目录下 新建 .eslintignore 和 .prettierignore 两个文件，该文件的作用是：除了该文件外的其他的文件进行格式化。

```
/node_modules
/build
/dist
.eslintrc.js
```

目前先添加上面几个，后面可以根据自己需要再添加。

我们在 package.json 增加如下两条 scripts 命令：

```
"scripts": {
  "lint": "eslint .",
  "format": "eslint . --fix"
},
```

当我们运行 npm run format 后，需要被格式化的代码，被自动格式化， 如果有语法报错的话，会在控制台上提示出来。

#### 4. StyleLint

上面的配置完成后，我们的 js 或 ts 代码已经可以有良好的代码风格了。但是我们还有样式代码风格需要统一，按照 <a href="https://stylelint.io/user-guide/get-started/">stylelint 官网介绍</a>, 我们需要安装如下两个包，安装命令如下：

```
npm install stylelint stylelint-config-standard -D
```

然后在项目的根目录下新建 .stylelintrc.js 文件，输入以下内容：

```
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'function-name-case': 'lower',
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': 'always',
  },
  ignoreFiles: ['node_modules/**/*', 'build/**/*'],
}
```

```
extends：含义和eslint的类似，都是扩展，使用 stylelint 已经预设好的一些规则。
rules: 具体的规则。
ignoreFiles: stylelint 配置支持忽略配置字段，我们先 添加 node_modules 和 build下的。后面如果还有其他的 可以自行添加。
```

同样，我们 vscode 也需要安装一个扩展 stylelint 插件。 到 vscode 中搜索 stylelint 插件， 自己安装哦～

然后我们在 .vscode/settings.json 中增加以下代码：

```
{
	// 使用 stylelint 自身的校验即可
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,

  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
}
```

如上的 "editor.formatOnSave" 和 "editor.codeActionsOnSave" 配置，如果已经配置了的话，就不需要配置了，自己删除掉。

我们可以在项目中新建一个 .less 文件测试下，可以看到有错误提示了。 这边暂时不截图哦。

#### 5. lint 命令

我们在 package.json 的 scripts 中增加以下三个配置：

```
scripts: {
  "lint": "npm run lint-eslint && npm run lint-stylelint",
  "lint-eslint": "eslint -c .eslintrc.js --ext .ts,.tsx,.js src",
  "lint-stylelint": "stylelint --config .stylelintrc.js src/**/*.{less,css,scss}"
}
```

我们在控制台 执行 npm run lint-eslint 时，会去对 src/ 下的指定后缀文件进行 eslint 规则检测， lint-stylelint 也是同理， npm run lint 会两者都按顺序执行。

#### 6. lint-staged

在项目开发过程中，每次提交前我们都要对代码进行格式化及 eslint 和 stylelint 的规则进行校验，来规范我们的代码风格。防止 bug 发生。

我们就可以使用 <a href="https://github.com/okonet/lint-staged">lint-staged</a> 来对我们 git 缓冲区最新改动过的文件进行格式化和 lint 的规则校验。我们还需要另一个工具, <a href="https://github.com/typicode/husky">husky</a>, 它会提供一些钩子，比如执行 git commit 之前的钩子 pre-commit，
借助这个钩子我们就能执行 lint-staged 所提供的代码文件格式化及 lint 规则校验。

我们需要安装如下两个插件：

```
npm install husky lint-staged -D
```

然后我们需要在 package.json 中添加以下代码。（位置随意，我这边放在 scripts 下面）

```
{
	"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js}": [
      "eslint --config .eslintrc.js"
    ],
    "*.{css,less,scss}": [
      "stylelint --config .stylelintrc.js"
    ],
    "*.{ts,tsx,js,json,html,yml,css,less,scss,md}": [
      "prettier --write"
    ]
  },
}
```

上面代码的含义是：我们会对暂存区后缀为 .ts, .tsx, .js 的文件进行 eslint 校验， --config 的作用是指定配置文件。同理对暂存区的后缀为 .css, .less, .scss 的文件进行 stylelint 校验。

但是在使用 prettier 进行代码格式化的时候，我们添加了 --write 来使我们的代码自动格式化。它不会更改语法层面上的东西。

#### 7. commitlint + changelog

<a href="https://github.com/conventional-changelog/commitlint">commitlint</a> 可以帮助我们进行 git commit 时的 message 格式是否符合规范，

<a href="https://github.com/conventional-changelog/commitlint">conventional-changelog</a>可以帮助我们快速生成 changelog,

首先安装 commitlint 相关依赖：

```
npm install @commitlint/cli @commitlint/config-conventional -D
```

然后我们在根目录新建文件 .commitlintrc.js，这就是我们的 commitlint 的配置文件，并且写入如下代码配置：

```
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'anno'],
    ],
  },
}
```

然后我们回到 package.json 的 husky 的配置，增加一个钩子：

```
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint --config .commitlintrc.js -E HUSKY_GIT_PARAMS"
    }
  },
}
```

-E HUSKY_GIT_PARAMS 的含义是：拿到我们的 message，然后 commitlint 再去进行 lint 校验。

然后我们继续生成我们的 changelog, 首先我们需要安装依赖，安装命令如下：

```
npm install conventional-changelog-cli -D
```

在 package.json 的 scripts 下增加一个命令：

```
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  },
}
```

之后我们就可以通过 npm run changelog 生成 angular 风格的 changelog. 该 changelog 是基于上次 tag 版本之后的变更 (feat, fix 等) 所产生的。

我们现在可以来测试下：

```
# 提交所有变化到缓存区
git add .
# 把暂存区的所有修改提交到分支
git commit -m "chora: add commitlint to force commit style"
```

#### 注意：上面提交后，我这边并没有触发 pre-commit。

#### 解决配置完成后 git commit 提交没有触发 pre-commit 钩子函数

首先查看下我们的版本号分别如下：

```
"husky": "^8.0.1",
"lint-staged": "^12.4.1",
"prettier": "2.6.2",
```

#### 注意：我们看下 husky 版本，husky 新版和旧版本的用法不一样了，husky(6.0.0)已经做了破坏性变更，之前的设置方式已经失效了，所以才有可能导致我们在 commit 的时候没有生效。这就是导致问题的根本原因。

解决的办法：在 package.json 中的 script 脚本加入如下这句配置：

```
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

然后我们运行下 npm run prepare

该命令会在 src 同级目录下创建 .husky/目录并指定该目录为 git hooks 所在的目录。

然后我们再运行下面这个命令 就会在 .husky 目录下面生成一个 pre-commit 脚本。

```
npx husky add .husky/pre-commit "npm run lint-staged"
```

在我们的 package.json 中的 scripts 需要添加如下配置：

```
{
  "scripts": {
   "lint-staged": "lint-staged",
  }
}
```

这个脚本就是我们在 git commit 的时候就会运行这个脚本执行 npm run lint-staged 这个命令。 这样就可以解决了 pre-commit 不生效的问题。

#### <div id="id3">三：Webpack 配置</div>

#### 1）安装 webpack

```
npm install webpack webpack-cli -D
```

然后在项目的根目录下新建文件夹 scripts, 在该文件夹下新建一个 config 文件夹，在 config 下新建一个 webpack.common.js 文件。

```
// webpack.common.js 配置代码

const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, "../../src/app.js"),
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../../dist'),
  }
};
```

#### hash 值有如下三种及区别

那么给打包后的文件添加 hash 值，有三种，分别是：hash, chunkhash 和 contenthash. 那么他们之间的区别是什么呢？

hash：给文件添加 hash 值后，当每次修改任何一个文件时候，所有文件打包后的 hash 值都是一样的，因此如果只修改了其中任何一个文件，整个项目的文件缓存都会将失效。

chunkhash：也能给文件添加 hash 值，当其中一个文件发生改变的时候，当重新打包的时候，它不会把未改动的 js 文件中的 hash 值发生改变，因此未更改的 js 文件还是会使用缓存，因此 chunkhash 比 hash 更好，但是它也有一个缺点是：当 js 文件中因此了 css 文件代码，当我们改动 js 文件的时候，该 css 文件的 hash 值也会发生改变。css 文件代码不能被缓存。

contenthash：是最优的方案，它可以解决 hash 和 chunkhash 的缺点，并且兼容 chunkhash 的优点，因此我们使用 contenthash 来做 hash 值。

#### 2）新建 app.js

在项目的根目录下创建 src 文件夹，然后再新建 app.js，输入以下代码：

```
const root = document.querySelector('#root');
root.innerHTML = 'hello world!';
```

然后我们打开 package.json 文件，为其增加一条 npm 命令：

```
{
  "scripts": {
    "build": "webpack --config ./scripts/config/webpack.common.js"
  }
}
```

#### 注意： --config 选项用来指定配置文件。

我们在控制台中输入 npm run build 即可打包，在项目的根目录下会生成 dist/js/app.1a2cea2d.js 文件。

#### 3) 公用变量文件

在上面的 webpack.common.js 文件配置中，我们发现两个表示路径的语句：

```
path.resolve(__dirname, "../../src/app.js")
path.resolve(__dirname, '../../dist')
```

入口文件和目标文件 都是使用 ../../ 来引用访问对应的文件路径，这种方式很不优雅，我们可以设置一个公用变量，然后引入这个公用变量即可，一次我们在 scripts 目录下新建一个 叫 constant.js 文件，专门用于存放我们的公用变量。配置代码如下：

```
const path = require('path');

const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME
};
```

PROJECT_PATH：表示项目的根目录。
PROJECT_NAME：表示项目名。

然后我们在 webpack.common.js 中引入，修改代码如下：

```
const path = require('path');
const { PROJECT_PATH } = require('../constant');

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, "./src/app.js"),
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(PROJECT_PATH, './dist'),
  }
};
```

如上代码，我们这样就看起来比较舒服，然后我们重新 npm run build 后，可以生成目标文件了。

#### <div id="id4">四）区分开发/生产环境</div>

在 webpack 中针对开发环境和生产环境我们需要分别配置，比如在开发环境中，报错能定位到源代码的具体位置，因此我们需要打包生成出 .map 文件。但是正式环境不需要 map 文件的。因此需要分别配置，但是开发环境和生产环境很多基础配置都是相同的，我们不可能两个环境有很多相同的配置代码，因此这个时候 webpack-merge 插件出现了。我们可以提取一个 webpack.common.js 文件，这个是公用基础配置代码。然后在开发环境或正式环境合并基础配置文件。

首先我们需要安装 webpack-merge ， 安装命令如下：

```
npm install webpack-merge -D
```

然后在 scripts/config 下新建文件 webpack.dev.js 作为开发环境配置代码，配置代码如下：

```
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
});
```

在 scripts/config 下新建文件 webpack.prod.js 作为生产环境配置，如下配置代码：

```
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
});
```

<a href="https://www.npmjs.com/package/cross-env">cross-env</a> 可跨平台设置和使用环境变量，不同操作系统设置环境变量的方式不一定相同，比如 Mac
电脑上使用 export NODE_ENV=development, 而 windows 电脑上使用的是 set NODE_ENV=development. 因此我们可以使用 cross-env 来兼容不同的操作系统的差异性。

首先需要安装它，安装命令如下：

```
npm install cross-env -D
```

然后在 package.json 中添加修改如下代码：

```
{
  "scripts": {
    "start": "cross-env NODE_ENV=development webpack --config ./scripts/config/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./scripts/config/webpack.prod.js",
  }
}
```

修改，scripts/constant.js 文件，增加一个公用的布尔变量 isDev, 判断是否是开发环境。代码如下：

```
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  isDev
};
```

现在我们来使用这个变量，我们之前的 webpack.common.js 文件，输出文件名的时候 会生成 8 位的 hash 编码，filename: 'js/[name].[hash:8].js', 但是在开发环境的时候，我们可以不需要 hash 编码，在线上是需要的，因为有缓存，每次发布的时候，我们都希望 hash 值不同，这样才会重新请求新的资源。因此我们可以使用该变量来判断开发环境还是线上环境。webpack.common.js 代码更改成如下：

```
const path = require('path');
const { PROJECT_PATH, isDev } = require('../constant');

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, "./src/app.js"),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[contenthash:8]'}.js`,
    path: path.resolve(PROJECT_PATH, './dist'),
  }
};
```

#### <div id="id5">五. 本地服务实时查看页面</div>

我们首先需要安装 webpack-dev-server 和 html-webpack-plugin. 安装命令如下：

```
npm install webpack-dev-server html-webpack-plugin -D
```

html-webpack-plugin: 每一个页面是要有 html 文件的，而这个插件能帮助我们将打包后的 js 文件自动引入 html 文件。
webpack-dev-server：该插件可以在本地起一个 http 服务，通过简单的配置还可以指定其端口，热更新的开启等。

现在我们需要在项目的根目录下新建一个 public 文件夹，里面存放一些公用的静态资源，我们首先在其中新建一个 index.html， 并且加入如下内容：

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React+Typescript 快速开发脚手架</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

然后我们打开我们的 scripts/config/webpack.common.js 配置代码改为如下：

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { PROJECT_PATH, isDev } = require('../constant');

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, "./src/app.js"),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[contenthash:8]'}.js`,
    path: path.resolve(PROJECT_PATH, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev ? false : {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        useShortDoctype: true,
      }
    }),
  ]
};
```

如上看到，我们以 public/index.html 文件作为模版，并且在生产环境中对生成 html 文件进行了代码压缩。

然后我们的 scripts/config/webpack.dev.js 配置代码改为如下：

```
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { SERVER_HOST, SERVER_PORT } = require('../constant');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
  },
  stats: "errors-only", // 只打印错误日志
});
```

现在我们需要在 scripts/constant.js 中新增两个新变量 SERVER_HOST 和 SERVER_PORT；配置代码如下：

```
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;

const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = 9000;

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  isDev,
  SERVER_HOST,
  SERVER_PORT,
};
```

如上配置好了本地服务的相关配置，我们还需要回到 package.json 中修改 start 命令：

```
{
  "scripts": {
    "start": "cross-env NODE_ENV=development webpack-dev-server --config ./scripts/config/webpack.dev.js",
  }
}
```

如上把 之前的 webpack 改成了 webpack-dev-server;

然后我们重新使用 npm start 进行打包。就可以打开页面了。

#### 利⽤ friendly-errors-webpack-plugin 插件优化⽇志

首先我们可以安装该插件， 安装命令如下：

```
npm install friendly-errors-webpack-plugin -D
```

然后在 webpack.common.js 中引入该插件；

```
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
```

在 plugins 数组中加入该插件；

```
plugins: [
  new FriendlyErrorsWebpackPlugin()
]
```

此时我们再运行 npm run dev 后，可以看到日志会出现 success, warning, danger 等效果。

#### <div id="id6">六. devtool</div>

devtool 中的一些选项，可以帮助我们将编译后的代码映射回原始源代码。这对于调试代码非常重要，官方文档上可以看到 <a href="https://webpack.js.org/configuration/devtool/">devtool</a> 有具体哪些值, 下面我们在 webpack.dev.js 中添加 eval-source-map 值。

我们可以在 scripts/config/webpack.dev.js 添加如下配置代码：

```
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const { SERVER_HOST, SERVER_PORT } = require('../constant');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
  },
  stats: "errors-only", // 只打印错误日志
});
```

在生产环境中我直接设置为 cheap-module-source-map，因此 scripts/config/webpack.prod.js 中添加以下代码：

```
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
});
```

通过上面的配置后，我们在本地开发，如果有代码错误，控制台会显示错误的代码文件和位置信息等。我们可以在 src/app.js 中的代码故意写错测试下：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/3.png" />

#### <div id="id7">七. 打包编译前清理 dist 目录</div>

我们可以借助 <a href="https://github.com/johnagan/clean-webpack-plugin">clean-webpack-plugin</a> 可以实现每次打包前先清理掉之前 dist 目录下的文件，以保证每次打包出来的都是当前最新的， 因此我们需要安装该包。

```
npm install clean-webpack-plugin -D
```

打开 scripts/config/webpack.prod.js 文件，增加如下代码：

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	// other...
  plugins: [
    new CleanWebpackPlugin(),
  ],
}
```

#### 注意：如上我们没有指定要删除的目录位置，它会自动帮我们找到 output 中的 path，然后进行清除掉。

#### <div id="id8">八）样式文件处理</div>

如果我们现在在 src/ 目录下新建一个 app.css 文件，然后添加一些样式，然后 app.js 中通过 import './app.css' 后， 再进行打包或本地服务启动，webpack 直接会报错，那是因为 webapck 目前只能编译 js 文件，对于样式文件目前还不支持，因此我们需要安装样式对应的 loader。

loader 用于对模块的源代码进行转换。loader 可以使你在  import  或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中  import CSS 文件！

#### css 样式文件处理

处理 .css 文件我们需要安装 style-loader 和 css-loader

```
npm install style-loader css-loader -D
```

遇到后缀为 .css 文件，webpack 先用 css-loader 加载器去解析这个文件，生成 css 字符串，然后使用 style-loader 处理此字符串生成一个内容为最终解析完的 css 代码的 style 标签。放到 head 标签里面。

loader 是有顺序的，webpack 是先将所有的 css 模块依赖解析完得到计算结果再创建 style 标签的。因此应该把 style-loader 放到 css-loader 的前面（webpack loader 的执行顺序是从右到左的，即从后往前的）。

因此，我们可以在 scripts/config/webpack.common.js, 配置以下代码：

```
module.exports = {
  // ....
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: isDev,  // 开发环境开启，生产环境关闭
              importLoaders: 0, // 指定在 CSS loader 处理前使用的 laoder 数量
            }
          }
        ]
      }
    ]
  },
};
```

test: test 字段是匹配规则，和正则表达式匹配类似。
use 字段有以下几种写法：

```
  1）可以是一个字符串，假如我们只使用 style-loader, 只需要 use: 'style-loader'.
  2) 可以是一个数组，假如我们不对 css-loader 做额外的配置，只需要 use: ['style-loader', 'css-loader']。
  3） 数组的每一项可以是字符串也可以是一个对象，当我们需要在webpack的配置文件中对loader进行配置的话，就需要将其配置称为一个对象，并且在此对象的options
字段中进行配置。比如我们上面的css-loader 配置的写法。
```

#### LESS 样式文件处理

处理 .less 文件我们需要安装 less 和 less-loader。

```
npm install less less-loader -D
```

1）遇到后缀为 .less 文件，less-loader 会将我们写的 less 语法转换为 css 语法，并转为 .css 文件。
2）less-loader 依赖于 less，所以必须安装。

因此我们继续在 scripts/config/webpack.common.js 中添加代码：

```
module.exports = {
	// other...
  module: {
    rules: [
      { /* ... */ },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: isDev,
              importLoaders: 1, // 需要先被 less-loader 处理，所以这里设置为 1
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ]
  },
}
```

#### SASS 样式文件处理

处理 .scss 文件我们需要安装 node-sass 和 sass-loader

```
npm install node-sass sass-loader -D
```

1. 遇到 .scss 后缀的文件，sass-loader 会将我们写的 sass 语法转换为 css 语法，并转为 .css 文件。
2. sass-loader 依赖 node-sass, 因此两个插件都需要被安装。

我们继续在 webpack.common.js 中配置如下代码：

```
module.exports = {
	// other...
  module: {
    rules: [
      { /* ... */ },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: isDev,
              importLoaders: 1, // 需要先被 sass-loader 处理，所以这里设置为 1
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ]
  },
}
```

通过以上配置后，现在我们的项目可以支持使用 css 或 less 或 scss 后缀编写代码了。我们执行 npm start, 也可以正常加载出来了。

#### PostCSS 处理浏览器兼容问题

postcss 是一种对 css 编译工具，它可以对 css 添加浏览器前缀，实现各个浏览器下兼容的问题。我们需要使用到如下插件：

1）<a href="https://github.com/luisrudge/postcss-flexbugs-fixes">postcss-flexbugs-fixes:</a> 用于修复一些和 flex 布局相关的 bug。
2）<a href="https://github.com/csstools/postcss-preset-env">postcss-preset-env</a>： 将最新的 css 语法转换为目标环境的浏览器能够理解的 css 语法，目的是使开发者不用考虑浏览器兼容问题，我们可以使用 <a href="https://github.com/postcss/autoprefixer">autoprefixer</a> 来自动添加浏览器前缀。 3) <a href="https://github.com/csstools/postcss-normalize">postcss-normalize</a>: 从 browserslist 中自动导入所需要的 normalize.css 内容。类似于 reset.css 这样的。

因此我们需要安装上面插件的包，安装命令如下：

```
npm install postcss-loader postcss-flexbugs-fixes postcss-preset-env autoprefixer postcss-normalize -D
```

将 postcss-loader 放到 css-loader 后面，配置如下：

```
{
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          grid: true,
          flexbox: 'no-2009'
        },
        stage: 3,
      }),
      require('postcss-normalize'),
    ],
    sourceMap: isDev,
  },
},
```

但是上面的 我们不能直接放到 webpack 里面去了， 会有兼容问题， 因此我们需要在项目的根目录下 新建 一个 postcss.config.js 文件。

#### 项目根目录中新建 postcss.config.js 文件

项目根目录中新建 postcss.config.js 文件，然后在该文件中添加如下配置代码：

```
module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        grid: true,
        flexbox: 'no-2009'
      },
      stage: 3,
    }),
    require('postcss-normalize'),
  ]
}
```

然后 scripts/config/webpack.common.js 配置代码变成如下：

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { PROJECT_PATH, isDev } = require('../constant');


const getCssLoaders = (importLoaders) => {
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders,
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            grid: true,
            flexbox: 'no-2009'
          },
          stage: 3,
        }),
        require('postcss-normalize'),
      ],
      sourceMap: isDev,
    }
  }
};

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/app.js'),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[contenthash:8]'}.js`,
    path: path.resolve(PROJECT_PATH, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: isDev, // 开发环境开启，生产环境关闭
              importLoaders: 0, // 指定在 CSS loader 处理前使用的 laoder 数量
            },
          },
          {
            loader: 'postcss-loader',
          }
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: isDev, // 开发环境开启，生产环境关闭
              importLoaders: 1, // 需要先被 less-loader 处理，所以这里设置为 1
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: false,
              sourceMap: isDev,
              importLoaders: 1, // 需要先被 sass-loader 处理，所以这里设置为 1
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
};
```

最后，我们需要在 package.json 中添加 browserslist （目的是指定项目的目标浏览器的范围）。

```
{
  "browserslist": [
    ">0.2%",
    "not dead",
    "ie >= 9",
    "not op_mini all"
  ]
}
```

我们可以测试下， 在外面的 src/app.less 添加 display: flex 后， 然后运行 npm start 重启服务，可以看到如下：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/4.png" />

#### <div id="id9">9) 图片和字体文件处理</div>

我们可以使用 file-loader 或 url-loader 来处理本地资源文件，url-loader 具有 file-loader 所有的功能。还能在图片大小限制范围内打包成 base64
图片插入到 js 文件中。

安装命令如下：

```
npm install file-loader url-loader -D
```

然后在 webpack.common.js 中继续在 modules.rules 中添加以下代码：

```
module.exports = {
  // other...
  module: {
    rules: [
      // other...
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ]
  },
  plugins: [//...],
}
```

1. [name].[contenthash:8].[ext] 表示输出的文件名为 原来的文件名.哈希值.后缀.
2. outputPath 是输出到 dist 目录下的路径，即图片目录 dist/assets/images 以及字体相关目录 dist/assets/fonts 下。
3. limit 表示如果你这个图片文件大于 10240b ，即 10kb , url-loader 就不用，转而去使用 file-loader ，把图片正常打包成一个单独的图片文件到设置的
   目录下，若是小于了 10kb ，就将图片打包成 base64 的图片格式插入到打包之后的文件中，这样做的好处是，减少了 http 请求.

我们使用了 typescript ， 因此我们还需要在 src/ 下新建以下文件 typings/file.d.ts ，输入以下内容即可：

```
declare module '*.svg' {
  const path: string
  export default path
}

declare module '*.bmp' {
  const path: string
  export default path
}

declare module '*.gif' {
  const path: string
  export default path
}

declare module '*.jpg' {
  const path: string
  export default path
}

declare module '*.jpeg' {
  const path: string
  export default path
}

declare module '*.png' {
  const path: string
  export default path
}
```

#### <div id="id10">10) 支持React</div>

  1) 首先我们需要安装 react 和 react-dom.
```
npm install react react-dom -S
```
  2) 安装对应的babel插件，来解析JSX语法；
```
npm install babel-loader @babel/core @babel/preset-react -D
```
  <a href="https://github.com/babel/babel-loader">babel-loader</a>使用 babel 解析文件；
  <a href="https://babeljs.io/docs/en/babel-core.html">@babel/core</a>是babel的核心模块。
  <a href="https://babeljs.io/docs/en/babel-preset-react">@babel/preset-react</a>是转译JSX的语法。

  然后我们需要在项目的根目录下新建 .babelrc 文件， 输入以下代码：
```
{
  "presets": ["@babel/preset-react"]
}
```
  3) scripts/config/webpack.common.js 增加如下代码
```
module.exports = {
  // other 其他代码
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      // ....other
    ]
  },
  plugins: [ //... ]
};
```
#### 注意：我们匹配的文件后缀有 .tsx, .ts, .jsx, .js 文件.

  babel-loader 在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积冗余，也会减慢编译效率，所以开启了 cacheDirectory 将这些公共文件缓存起来了，下次编译就会快很多。

  我们也给loader增加了exclude，排除 node_modules 目录下的，该目录下的我们不需要编译。可以提升编译的效率。

  下面我们在 src 目录下 新建 index.js， src/index.js 增加如下代码：
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.querySelector('#root'));
```
  在 src/app.js 中输入以下代码：
```
import './app.less';

import React from 'react';

function App() {
  return <div className='App'>Hello World</div>
}

export default App;
```
  然后我们修改 webpack.common.js 中的entry字段，修改入口文件变为 index.js; 如下代码：
```
module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.js'),
  }
}
```
  然后我们在控制台执行 npm start 运行即可。可以看到页面执行成功了，如下：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/5.png" />

#### <div id="id11">11）支持TypeScript</div>

#### 1）安装对应的babel插件

  <a href="https://babeljs.io/docs/en/babel-preset-typescript">@babel/preset-typescript</a> 是babel的一个preset。 我们先要安装它：
```
npm install @babel/preset-typescript -D
```
#### 2) 修改 .babelrc
```
{
  "presets": ["@babel/preset-react", "@babel/preset-typescript"]
}
```
#### 注意：presets 的执行顺序是从后到前的。因此会先执行 @babel/preset-typescript ， 然后再执行： @babel/preset-react。

  我们上面既然安装了 TypeScript，那么React的类型声明也需要安装下，安装命令如下：
```
npm install @types/react @types/react-dom -D
```
#### tsx 语法测试

  把 src/index.js 改成 src/index.tsx, 然后代码改成如下：
```
src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

ReactDOM.render(<App name='kongzhi' age={ 33 }/>, document.querySelector('#root'));
```
  把 src/app.js 改成 src/app.tsx, 然后代码改成如下：
```
import './app.less';

import React from 'react';

interface IProps {
  name: string,
  age: number
}

function App(props: IProps) {
  const { name, age } = props;

  return <div className='App'>
    <span>{ `Hello! I'm ${name}, ${age} years old`}</span>
  </div>
}

export default App;
```
#### 修改 入口文件

  我们还需要修改入口文件 webpack.common.js 文件。如下代码：
```
module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.tsx'),
  },
  output: { //...},
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
};
```
  1） 如上我们更改了入口文件变成 index.tsx;
  2) 新增了 resolve 属性，在 extensions 中定义好了文件名后缀后，当我们 import 引入一个模块文件的时候，我们不需要再加 后缀名了。

  我们现在 再执行 npm start 后，页面就可以正确输出了。

#### tsconfig.json 详解

  每个TypeScript项目在其项目的根目录下一般都有 tsconfig.json 文件， 该文件的作用是：

  1）编译指定的文件。
  2）定义了编译的选项规则。

  因此我们需要在项目的根目录下生成 tsconfig.json 文件。 在项目的根目录下执行如下命令：
```
npx tsc --init
```
  就会生成 tsconfig.json 文件，里面有很多注释和几个配置，我们先把他们全部删除，然后输入我们自己的配置项：
```
{
  "compilerOptions": {
    // 基本配置
    "target": "ES5",                          // 编译成哪个版本的 es
    "module": "ESNext",                       // 指定生成哪个模块系统代码
    "lib": ["dom", "dom.iterable", "esnext"], // 编译过程中需要引入的库文件的列表
    "allowJs": true,                          // 允许编译 js 文件
    "jsx": "react",                           // 在 .tsx 文件里支持 JSX
    "isolatedModules": true,
    "strict": true,                           // 启用所有严格类型检查选项

    // 模块解析选项
    "moduleResolution": "node",               // 指定模块解析策略
    "esModuleInterop": true,                  // 支持 CommonJS 和 ES 模块之间的互操作性
    "resolveJsonModule": true,                // 支持导入 json 模块
    "baseUrl": "./",                          // 根路径
    "paths": {																// 路径映射，与 baseUrl 关联
      "Src/*": ["src/*"],
      "Components/*": ["src/components/*"],
      "Utils/*": ["src/utils/*"]
    },

    // 实验性选项
    "experimentalDecorators": true,           // 启用实验性的ES装饰器
    "emitDecoratorMetadata": true,            // 给源码里的装饰器声明加上设计类型元数据

    // 其他选项
    "forceConsistentCasingInFileNames": true, // 禁止对同一个文件的不一致的引用
    "skipLibCheck": true,                     // 忽略所有的声明文件（ *.d.ts）的类型检查
    "allowSyntheticDefaultImports": true,     // 允许从没有设置默认导出的模块中默认导入
    "noEmit": true														// 只想使用tsc的类型检查作为函数时（当其他工具（例如Babel实际编译）时）使用它
  },
  "exclude": ["node_modules"]
}
```
  如上配置最主要看 baseUrl 和 paths，它们的作用是快速定位某个文件。防止在页面中引入模块，以 ../../../ 类似这样的相对路径引入。比如我现在的src有如下
目录文件：
```
|---src
| |--- components
| | |--- Header
| | | |--- index.tsx
| | | |--- index.less
| |--- utils
| | |--- index.ts
| |--- app.tsx
| |--- index.tsx
```
  然后我们在 app.tsx 中引入 import Header from 'Components/Header'; 代码，然后vscode编辑器会报错;

  因此我们需要改 .eslintrc.js 文件的配置了，首先我们得安装 <a href="https://github.com/alexgorbatchev/eslint-import-resolver-typescript">eslint-import-resolver-typescript</a>
```
npm install eslint-import-resolver-typescript -D
```
  然后在 .eslintrc.js 文件的 settings 字段修改为以下代码：
```
settings: {
  'import/resolver': {
    node: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    typescript: {},
  },
},
```
  我们只需要添加 typescript: {} 即可。

  其次我们还需要在 webpack.common.js 中的 resolve.alias 添加相同的映射规则配置，如下：
```
module.exports = {
  // other...
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      'Src': path.resolve(PROJECT_PATH, './src'),
      'Components': path.resolve(PROJECT_PATH, './src/components'),
      'Utils': path.resolve(PROJECT_PATH, './src/utils'),
    }
  },
  module: { //... }
  plugins: [ //... ]
}
```
  tsconfig.json 和 webpack.common.js 配置相同就可以了，当然如果我们不在 tsconfig.json 配置的话，直接在 webpack 配置也是可以的， 但是当发生引入文件错误的时候，文件不会实时提示报错，比如引入一个不存在的路径时候，只有在webpack打包的时候会报错。其实配置 tsconfig.json 就是希望文件能实时给我们提示。

#### babel-plugin-transform-runtime

  想了解更多babel配置，可以看我 <a href="https://github.com/kongzhi0707/front-end-learn/blob/master/node/babelrc.md">这篇文章</a>

  如上我们已经使用babel去解析react语法和typescript的语法了，但是在代码中用到的ES6+语法编译之后会全部保留，但是不是所有浏览器都支持ES6+语法的。这个时候我们就需要 @babel/preset-env 了，它会根据设置的目标浏览器环境(browserslist)找到所需的插件去转译 ES6+ 的语法。

  但是碰到最新的es特性，比如Promise， includes 等是没有办法转译到 ES5的，因此我们需要借助 <a href="https://www.babeljs.cn/docs/babel-plugin-transform-runtime">@babel/plugin-transform-runtime</a> 这个插件了。

  并且，babel在编译每一个模块的时候在需要的时候会插入一些辅助函数 比如 _extend, 每一个需要的模块都会生成这个辅助函数，这就会导致代码的冗余，@babel/plugin-transform-runtime 这个插件会将所有的辅助函数都从 @babel/runtime-corejs3 导入（我们下面使用 corejs3），从而减少冗余性。

  我们需要安装如下：
```
npm install @babel/preset-env @babel/plugin-transform-runtime -D
npm install @babel/runtime-corejs3 -S
```
  然后我们需要修改 .babelrc 文件如下配置代码：
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 防止babel将任何模块类型都转译成CommonJS类型，导致tree-shaking失效问题
        "modules": false 
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": {
          "version": 3,
          "proposals": true
        },
        "useESModules": true
      }
    ]
  ]
}
```
  如上就是 react + typeScript 项目开发环境搭配了。现在可以正常开发了。

#### <div id="id12">12) 公共环境优化</div>

#### 1）拷贝公共静态资源

  我们的项目，到现在还没有icon， 如下：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/6.png" />

  比如 create-react-app , 会有 .ico 文件放在 public/目录下，因此我们这边也弄一个 cra 的 favicon.ico 文件。因此我们可以手动复制一个 favicon.ico文件到 public/ 目录下，如下所示：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/7.png" />

  如果我们直接执行 npm run build / npm start 打包，我们会发现我们的dist目录下是没有 favicon.ico 这个文件的。因此我们在打包的时候需要把我们的 public/ 文件夹下的静态资源复制到我们打包后生成的dist目录中。因此我们借助 <a href="https://github.com/webpack-contrib/copy-webpack-plugin">copy-webpack-plugin</a> 插件.

  安装命令如下：
```
npm install copy-webpack-plugin -D
```
  修改 webpack.common.js 文件，增加如下代码：
```
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	plugins: [
    // 其它 plugin...
  	new CopyPlugin({
      patterns: [
        { from: path.resolve(PROJECT_PATH, './public/*'), to: path.resolve(PROJECT_PATH, './dist') }
      ]
    }),
  ]
}
```
  如上配置完成后，我们需要修改我们的 public/index.html 文件加入icon标签了，如下代码：
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React+Typescript 快速开发脚手架</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
  现在我们重新 npm start 后，重启项目，清除页面的缓存，就可以看到有对应的icon了。如下所示：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/8.png" />

  同样的，如果我们还有其他的静态资源文件的话，我们只要往 public/目录下放，打包之后都会自动复制到 dist/ 目录下的。

#### 2) 显示编译进度

  我们现在执行 npm start 或 npm run build 后，控制台没有任何信息告诉我们现在编译的进度怎么样，如果一个项目非常大的话，编译打包的时间会非常多，如果没有任何提示的话，会误认为项目启动是不是卡住了。因此显示进度条提示非常重要。

  进度条我们使用到 progress-bar-webpack-plugin 插件，因此我们需要安装该插件，安装的命令如下：
```
npm install progress-bar-webpack-plugin -D
```
  然后在我们的 webpack.common.js 引入该插件即可，如下代码：
```
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  //...
  plugins: [
    new ProgressBarWebpackPlugin(),
  ],
}
```
  如上配置完成后，我们运行 npm start 后进行打包，然后控制台有进度条如下提示：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/9.png" />

#### 3) 编译时的 TypeScript 类型检查

  我们之前配置babel，为了编译速度，babel编译ts时直接将类型去掉了，并不会对ts的类型做检查。比如 我们的 src/app.tsx 文件下， 我随便结构出一个事先没有
声明的类型：

  多加了一个 sex 属性，之前并没有任何声明，虽然会提示，但是webpack并不会报错，导致有问题也没有去解决，所以这违反了 typescript 类型声明所带来的优势，如下：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/10.png" />

  因此我们需要 借助 <a href="https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#typescript-options">fork-ts-checker-webpack-plugin</a> 插件，在我们打包或启动本地服务时就给予错误，现在我们安装命令如下：
```
npm install fork-ts-checker-webpack-plugin -D
```
  在 webpack.common.js 中增加以下代码：
```
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
	plugins: [
    // 其它 plugin...
  	new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
      },
    }),
  ]
}
```
  然后我们运行 npm start 后，我们的控制台就会报错了，如下所示：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/11.png" />

  我们现在把 sex 去掉，就不会报错了。

#### 4) external 减少打包体积

  到目前为止，我们不管是开发环境还是生产环境，都会将react和react-dom的代码打进我们的最终生成的代码中，这就会导致一个问题的，就是我们的js文件将会很大。
如果以后还会有很多第三方包的话，那么文件将会很大很大。我们的页面的加载速度将会变得很慢，会影响用户体验，因此我们可以将这种第三方包剥离出去或者采用CDN链接的形式。

  修改 webpack.common.js ， 增加以下代码：
```
module.exports = {
	plugins: [
    // 其它 plugin...
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
```
  在开发时，我们是这样使用 react 和 react-dom的：
```
import React from 'react'
import ReactDOM from 'react-dom'
```
  那么，我们最终打完的包已经不注入这两个包的代码了，我们打开 public/index.html 增加cdn的链接形式引入，也就是外链包。
```
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
+   <script crossorigin src="https://unpkg.com/react@16.13.1/umd/react.production.min.js"></script>
+   <script crossorigin src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js"></script>
  </body>
</html>
```
#### 5) 抽离公共代码

  splitChunks 是webpack中一个提取或分离代码的插件，主要作用是提取公共代码，防止代码被重复打包，拆分过大的js文件，合并零散的js文件。

  因此我们需要在 webpack.common.js 增加以下代码：
```
module.exports = {
	// other...
  externals: {//...},
  optimization: {
    splitChunks: {
      chunks: "all",          //async对异步引入的代码分割 initial对同步引入代码分割 all对同步异步引入的分割都开启
      minSize: 30000,         //字节 引入的文件大于30kb才进行分割
      //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
      minChunks: 1,           //模块至少使用次数
      maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件（按需加载模块）
      maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个（加载初始页面）
      automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
      // name: true,                  //缓存组里面的filename生效，覆盖默认命名
      cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
        vendors: {  //自定义打包模块
          test: /[\\/]node_modules[\\/]/,
          priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
          filename: 'vendors.js',
        },
        default: { //默认打包模块
          priority: -20,
          reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
          filename: 'common.js'
        }
      }
    }
  }
}
```
#### <div id="id13">13) 开发环境优化</div>

#### 1）热更新

  热更新期望的是：如果页面只改动了某一个页面，那么我们需要的是进行局部更新。而不需要整个页面进行刷新，因为当项目非常大的时候，重新执行热更新，回很耗时的。

  那么我们要如何做呢？

#### 1.1）将 webpack.dev.js 中的 devServer 下的hot属性设置为 true。如下配置中的 hot 属性即可。
```
module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
  },
  stats: 'errors-only', // 只打印错误日志
});
```
#### 1.2）新增 webpack.HotModuleReplacementPlugin 插件；在 webpack.dev.js 添加配置代码如下：
```
module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
  },
  stats: 'errors-only', // 只打印错误日志
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
});
```
  如上操作后，会报错 TypeError: webpack.HotModuleReplacementPlugin is not a constructor，那是因为webpack升级了， 因此我们改成如下方式：
```
module.exports = merge(common, {
  // ...other
  devServer: { // ... },
  optimization: {
    moduleIds: 'named',
  },
});
```
  因此 webpack.dev.js 改成如下了：
```
module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
  },
  stats: 'errors-only', // 只打印错误日志
  optimization: {
    moduleIds: 'named',
  },
});
```
#### 1.3）修改入口文件

  修改我们的 src/index.tsx 的入口文件代码，添加如下代码：
```
if (module && module.hot) {
  module.hot.accept()
}
```
  整个代码如下：
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';


if (module && module.hot) {
  module.hot.accept()
}

ReactDOM.render(<App name='kongzhi' age={ 33 }/>, document.querySelector('#root'));
```
  但是这个时候因为ts的原因会报错，如下所示：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/12.png" />

  我们修复的方法是只需要安装 @types/webpack-env 即可：安装命令如下：
```
npm install @types/webpack-env -D
```
  然后我们在保存下 对应的文件 就不会报错了， 重启下 npm start 后，就ok了。

#### 2) 跨域请求

  一般情况下，我们使用 devServer 中的 proxy 字段就能配置接口代理进行跨越请求。但是为了构建环境的代码和业务代码进行分离，我们可以将配置文件进行独立出来。
  我们可以按照这样做：

#### 2.1）在 src/ 下新建一个 setProxy.js 文件，并添加如下代码：
```
const proxySettings = {
  // 接口代理1
  '/api/': {
    target: 'http://198.168.111.111:3001',
    changeOrigin: true,
  },
  // 接口代理2
  '/api-2/': {
    target: 'http://198.168.111.111:3002',
    changeOrigin: true,
    pathRewrite: {
      '^/api-2': '',
    },
  },
  // .....
}

module.exports = proxySettings;
```
#### 2.2) 在webpack.dev.js 引入该文件
```
const proxySetting = require('../../src/setProxy.js')

module.exports = merge(common, {
  devServer: {
    //...
    proxy: { ...proxySetting }
  },
})
```
#### <div id="id14">14) 生产环境优化</div>

#### 1）抽离出css样式

  我们现在需要把css文件单独抽出来，之前我们把所有写的样式都打包到js文件中了，如果一直这样的话，那么随着项目逐渐变大，js文件就会越来越大。因此我们可以借助
<a href="https://github.com/webpack-contrib/mini-css-extract-plugin">mini-css-extract-plugin</a> 插件进行css样式拆分，首先我们先安装它。
```
npm install mini-css-extract-plugin -D
```
  然后我们在 webpack.common.js 文件中增加和修改如下代码：
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getCssLoaders = (importLoaders) => [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  // ....
]

module.exports = {
	plugins: [
    // 其它 plugin...
    !isDev && new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false,
    }),
  ]
}
```
  因此我们的 webpack.common.js 所有代码变为如下：
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { PROJECT_PATH, isDev } = require('../constant');

const getCssLoaders = (importLoaders) => [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: isDev, // 开发环境开启，生产环境关闭
        importLoaders, // 指定在 CSS loader 处理前使用的 laoder 数量
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            require('postcss-normalize'),
          ],
        },
        sourceMap: isDev,
      },
    }
  ];

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.tsx'),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[contenthash:8]'}.js`,
    path: path.resolve(PROJECT_PATH, './dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      'Src': path.resolve(PROJECT_PATH, './src'),
      'Components': path.resolve(PROJECT_PATH, './src/components'),
      'Utils': path.resolve(PROJECT_PATH, './src/utils'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: false,
              sourceMap: isDev,
              importLoaders: 1, // 需要先被 sass-loader 处理，所以这里设置为 1
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(PROJECT_PATH, './public/*'), to: path.resolve(PROJECT_PATH, './dist') }
      ]
    }),
    new ProgressBarWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
      },
    }),
    !isDev && new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  optimization: {
    splitChunks: {
      chunks: "all",          //async对异步引入的代码分割 initial对同步引入代码分割 all对同步异步引入的分割都开启
      minSize: 30000,         //字节 引入的文件大于30kb才进行分割
      //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
      minChunks: 1,           //模块至少使用次数
      maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件（按需加载模块）
      maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个（加载初始页面）
      automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
      // name: true,                  //缓存组里面的filename生效，覆盖默认命名
      cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
        vendors: {  //自定义打包模块
          test: /[\\/]node_modules[\\/]/,
          priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
          filename: 'vendors.js',
        },
        default: { //默认打包模块
          priority: -20,
          reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
          filename: 'common.js'
        }
      }
    }
  },
};
```
  然后我们运行 npm run build 后，可以看到css被单独打包出来了，如下所示：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/react/images/13.png" />

  如上我们更改了 getCssLoaders 方法，之前是无论什么环境我们使用的都是 style-loader, 现在我们在生产环境中使用 MiniCssExtractPlugin.loader。

 #### 2）去除无用的样式

  我们在样式中随便写个样式，然后在打包的时候会给打包进去。

  我们在 app.less 随便写了 .xx 样式，如下：
```
body {
  font-size: 12px;
  display: flex;
}

.xx {
  display: block;
}
```
  然后我们运行 npm run build 命令后，在在dist包里面生成如下：
```
body {
  font-size: 12px;
  display: -ms-flexbox;
  display: flex;
}
.xx {
  display: block;
}

.header {
  background: lightgreen;
}
```
  打包后默认保留了 xx 这个样式，但是该代码是无意义的，因此我们需要把它剔除掉， 因此我们使用 <a href="https://github.com/FullHuman/purgecss/tree/master/packages/purgecss-webpack-plugin">purgecss-webpack-plugin</a> 这个插件, 但是我们在这之前我们需要安装查找路径 <a href="https://github.com/isaacs/node-glob">node-glob</a> 插件.
```
npm install purgecss-webpack-plugin glob -D
```
  然后我们在 webpack.prod.js 中增加如下代码：
```
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const glob = require('glob');
const path = require('path');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const { PROJECT_PATH } = require('../constant');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
      whitelist: ['html', 'body']
    }),
  ],
});
```
  然后我们再运行下 npm run build 命令后，就没有了。

#### 3）压缩js和css代码

#### js 代码压缩

  webpack4 中js代码压缩插件 <a href="https://github.com/webpack-contrib/terser-webpack-plugin">terser-webpack-plugin</a>, 它支持对ES6语法的压缩，且在mode为 production 时默认开启。我们先安装该插件：
```
npm install terser-webpack-plugin -D
```
  然后在 webpack.common.js 文件中 optimization 增加以下配置：
```
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	// other...
  externals: {//...},
  optimization: {
    minimize: !isDev,
    minimizer: [
      !isDev && new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        }
      })
    ].filter(Boolean),
    splitChunks: {//...},
  },
}
```
  1) 首先增加了 minimize ，它可以指定压缩器，如果我们设为 true ，就默认使用 terser-webpack-plugin ，设为 false 即不压缩代码。接下来在 minimize 中判断如果是生产环境，就开启压缩。

  2) extractComments 设为 false 意味着去除所有注释，除了有特殊标记的注释，比如 @preserve 标记，后面我们会利另一个插件来生成我们的自定义注释。
  3) pure_funcs 可以设置我们想要去除的函数，比如我就将代码中所有 console.log 去除。

#### css 代码压缩

  css 代码压缩使用的插件是：<a href="https://github.com/NMFR/optimize-css-assets-webpack-plugin">optimize-css-assets-webpack-plugin</a>, 我们可以直接安装它，安装命令如下：
```
npm install optimize-css-assets-webpack-plugin -D
```
  我们在 webpack.common.js 配置代码配置如下：
```
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  optimization: {
    minimizer: [
      // terser
      !isDev && new OptimizeCssAssetsPlugin()
    ].filter(Boolean),
  },
}
```















