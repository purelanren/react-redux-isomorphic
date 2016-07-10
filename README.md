# react-redux-isomorphic

### 开始

```sh
npm install
npm run api
```
```sh
npm start
```

访问 http://localhost:3000

注意：直接访问 http://localhost:3000/description 服务器端会将异步请求的数据放入`state`后再渲染，并将初始化的state通过全局变量`__INITIAL_STATE__`发送给客户端
