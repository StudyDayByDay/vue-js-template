## 集成eslint
1、安装vscode eslint插件
2、安装eslin插件
3、设置eslint配置文件
  off或0关闭规则
  warn或1将规则作为警告打开
  error将规则作为错误打开
4、设置prettierrc文件，安装prettier插件
5、设置husky文件，这个用处是：git提交之前运行指定的命令
6、设置stylelint：避免错误和执行惯例，安装vscode插件并填写配置
7、Babel配置：作用是确保JavaScript代码兼容所有的浏览器，工作原理是使用ast把不兼容的代码编译成es15版本，因为大多数浏览器都支持这个版本的JavaScript代码
8、commitlint：使用npx命令生成两个脚本，一个验证eslint一个验证commitlint，在package.json不要再写husky的内容，否则会造成冲突。可以安装git提交插件，帮助写commit
9、postcss：兼容不同浏览器，添加前缀