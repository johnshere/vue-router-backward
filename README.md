# vue-router-backward

add backward function to vue-router，the function is difference from browser history

## difference

&emsp;&emsp;It will record the first router to the current router.And a route can only be recorded once. For example:

> browser history：  
>  A > B > C > B > D  
> the 'backward' module will record:  
>  1: A  
>  2: A > B  
>  3: A > B > C  
>  4: A > B  
>  5: A > B > D

&emsp;&emsp;Finally, when you use 'backward' back from page B, you will arrive at page A.

## install

```
  npm install vue-router-backward
```

&emsp;&emsp;or

```
  yarn install vue-router-backward
```

## use

&emsp;&emsp;First, add backward function to router.

```
import Vue from 'vue'
import Router from 'vue-router'
import backward from 'vue-router-backward'

Vue.use(Router)

let router = new Router({
  routes: [
    ...
  ]
})

export default backward(router)
```

&emsp;&emsp;Second, trigger the backward function

```
export default {
  name: 'xxx',
  methods: {
    goBefore () {
      this.$router.backward()
    }
  }
}
```

&emsp;&emsp;You can judge whether it's back or not in the previous page

```
  if (this.$route.params.isBack) {
    this.transitionEffect = ''
    if(this.$route.params.backFrom === 'AMap'){ // When you use 'backward', it brings in the name of the route
      this.AMapComplete = true
    }
  }else {
    this.transitionEffect = 'slideInRight'
  }
```
