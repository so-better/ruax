#### 一个轻量级的Javascript异步数据请求库，类似于axios或者ajax，独立封装，快速上手


```
npm install ruax --save
```

```
import Ruax from "ruax"
```

> 使用方法

```
//创建实例对象
var ruax = new Ruax();
```

```
//通过ruax.defaults来设置ruax的全局默认参数，ruax.defaults是一个object类型的数据
ruax.defaults.baseUrl = 'https://www.mvi-web.cn';//设置基本路径
ruax.defaults.type = 'POST';//设置所有的ruax对象请求都是post请求
```

```
//ruax通过create方法发送请求
ruax.create(config).then((result)=>{
    console.log(result);//请求成功
}).catch((xhr)=>{
    console.log('请求超时');//请求失败
})
```


```
//可以通过ruax.beforeRequest和ruax.beforeResponse来设置全局的发送前处理方法和响应后处理方法

//此方法对该ruax对象发出的所有请求生效
ruax.beforeRequest = (config)=>{
    config.type = 'POST';//对数据进行修改
}
//此方法对该ruax对象发出的所有请求生效
ruax.beforeResponse = (xhr,result)=>{
    if(result){
        //请求成功
    }else{
        alert('请求失败');
    }
}
```

### 更加详细的使用方法请到我的网站查看：[ruax](https://www.mvi-web.cn/library/7)