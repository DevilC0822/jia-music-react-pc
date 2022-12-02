module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser", // 解析器
  extends: [], // 扩展
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint/eslint-plugin",
    "prettier"
  ], // 插件
  rules: {
    "prettier/prettier": "error",
    /**
     * 常规配置
     */
    // 0:关闭 1:警告 2:报错
    quotes: [2, 'single'], // 强制使用一致的单引号
    semi: [2, 'never'], // 强制是否使用分号
    'no-shadow': 0, // 关闭:函数参数名与全局作用域名重复
    'no-console': 0, // 允许使用console
    'prefer-const': 1, // 关闭建议使用const
    'max-len': 0, // 关闭最大长度校验
    'no-useless-escape': 0, // 关闭正则表达式中不规则数据校验
    'implicit-arrow-linebreak': 0, // 关闭在箭头函数体之前不允许换行
    'object-curly-newline': 0, // 关闭在对象文字或解构赋值的大括号内强制执行一致的换行符
    'arrow-parens': 0, // 关闭箭头函数只有一个参数时要带括号
    'max-classes-per-file': 0, // 关闭只能暴露一个类
    'no-plusplus': 0, // 关闭i++报错
    'prefer-destructuring': 0, // 关闭强制执行解构
    'no-param-reassign': 0, // 关闭不能修改函数参数 setCount(state: State, count: number) state.count = count
    'no-use-before-define': [1, 'nofunc'], // 未定义前不能使用
    'vue/no-unused-components': 'off', // 当存在定义而未使用的组件时，关闭报错
    'no-lonely-if': 'off', // if过多
    'no-else-return': 'off', // 取消最后一个else
    'jsx-a11y/anchor-is-valid': 0,
    'import/no-anonymous-default-export': 0,
  }
};
