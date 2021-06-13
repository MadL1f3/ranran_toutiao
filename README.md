# 嘉然头条

## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + dayjs+ less+ flex + axios+localstorage

## 项目运行

```
git clone https://github.com/MadL1f3/ranran_toutiao.git   

cd jiaran_toutiao

npm install 或 yarn(推荐)

npm run serve
```

## 关于接口数据

此项目的所有接口数据都来源于配套的后台系统，[我是传送门](./api/接口文档.html)

后台api均是别人提供

## 说明

如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

需要自提不必询

## 目标功能

登录注册----------√

个人中心----------√

首页频道列表----------√

首页文章列表----------√

文章列表----------√

文章详情----------√

文章评论----------√

用户页面----------√

文章关注、点赞、收藏----------√

我的收藏----------√

编辑用户资料----------√

语音机器人----------×（暂未完成）

消息动态提示----------错（接口不对）

## 部分截图

已登录

![2](https://github.com/MadL1f3/ranran_toutiao/blob/master/img/2.png)![1](https://github.com/MadL1f3/ranran_toutiao/blob/master/img/1.png)

未登录

![3](https://github.com/MadL1f3/ranran_toutiao/blob/master/img/3.png)![3](https://github.com/MadL1f3/ranran_toutiao/blob/master/img/7.png)

文章详情

![4](https://github.com/MadL1f3/ranran_toutiao/blob/master/img/4.png)

用户收藏列表（需要登录）

![6](https://github.com/MadL1f3/ranran_toutiao/blob/masterimg/6.png)

登录界面（需要未登录）

![8](https://github.com/MadL1f3/ranran_toutiao/blob/master/img/8.png)

评论、点赞功能

![9](https://github.com/MadL1f3/ranran_toutiao/blob/master/img/9.png)![10](https://github.com/MadL1f3/ranran_toutiao/blob/master/img/10.png)![11](https://github.com/MadL1f3/ranran_toutiao/blob/master/img/11.png)![12](https://github.com/MadL1f3/ranran_toutiao/blob/master/img/12.png)

jiaran_toutiao 目录结构

dist 编译好后的文件直接上线服务器即可

public 存放项目网页图标

src：

​		api 各种api请求

​		assets 图片资源

​		components  可以复用的组件包括点赞 文章收藏  文章列表展示 关注用户

​		router  路由配置

​		store  vuex的配置使用

​		styles  全局公共样式

​		utils  包括dayjs初始化设置 axios请求拦截器  localstorage设置

​		views 存放router里面的各种路由组件

main.js项目入口

