### React+TypeScript 项目搭建

搭建一套 React+TypeScript 项目环境， 方便后续开发。

#### 注意：我这边前端编辑器是使用 vscode 编码的。

### 一：环境搭建

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

# 在项目的根目录下 创建 .npmrc 文件

```
touch .npmrc
```

在该文件内输入配置

```
registry=https://registry.npm.taobao.org/
```

#### 4. README.md

在项目的根目录下 新建 README.md，该文件可以编写一些项目配置环境的说明文档。

### 二：规范代码与提交

多人共同开发一个项目最大的问题就是代码风格各异，有的人习惯使用 2 个空格，有的人习惯使用 4 个空格，导致后续其他人维护代码越来越困难。因此我们从项目开始
就要定一个规则将大家编码的风格统一。这样最终的结果是：增强代码的可维护性。

#### 1. EditorConfig

.editorconfig 是跨编辑器维护一致编码风格的配置文件。有的编辑器会默认集成读取该配置文件的功能，但是 vscode 需要安装相应的扩展 EditorConfig For vs Code.

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/react/master/images/1.png" />

安装完此扩展后，我们在项目的根目录下新建 .editorconfig 文件，然后我们在该文件下 添加如下配置：

# 如果未指定 root = true，则 EditorConfig 将继续在项目外部查找 .editorconfig 文件。

```
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

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/react/master/images/2.png" />

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

{
"scripts": {
"prepare": "husky install"
}
}

然后我们运行下 npm run prepare

该命令会在 src 同级目录下创建 .husky/目录并指定该目录为 git hooks 所在的目录。

然后我们再运行下面这个命令 就会在 .husky 目录下面生成一个 pre-commit 脚本。

npx husky add .husky/pre-commit "npm run lint-staged"

在我们的 package.json 中的 scripts 需要添加如下配置：

{
"scripts": {
"lint-staged": "lint-staged",
}
}
这个脚本就是我们在 git commit 的时候就会运行这个脚本执行 npm run lint-staged 这个命令。 这样就可以解决了 pre-commit 不生效的问题。

当然我们还有一个更直接的版本， 更改版本号，在 package.json 中更改 "husky": "^4.3.8", 为这个版本。
