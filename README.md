# 框架攻克记录
## 开始攻克layout，下一个是权限
* isMobile啥时候变呢？
  
  答：在App.vue里面
* NavBar里面的isBreadcrumb是受谁影响呢？

答：受两个影响，一个是布局里面的影响，一个是受hidden-xs-only这个类的影响，在UI框架Layout里面有讲这个，是隐藏类。

* layout里面的Mobaile里的NavBar搞清楚了。2022-12-08  22:54
* TabBar组件里面涉及到的知识点还挺多（撸了一遍了）2022-12-12 16:53
  * router为什么会是这种结构？
  * vueRouter之前没仔细看过
  * 路由和权限挂钩的部分
  * 想补一下递归，好像理解一些了
  * export和import 
    * export default 后面不能跟变量声明语句
    * export * from xxx 会忽略模块的default方法
* AppMain组件搞清楚了
* Menu组件搞清楚了，至此，Mobile组件搞清楚了  2022-12-13 17:25:38
* Layout跟Mobile差不多，还差Horizontal组件没看  2022-12-13  17:50:11

## 看一下国际化是咋搞的  2022-12-15  17:41:16
看懂了，但是我觉得实现方式不是很好，还刷新干嘛，万一有在操作的进程，不就掉了吗。

我来优化一下这个，让他不刷新。
## 想把Vuex替换成pinia