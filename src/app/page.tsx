import React from 'react'
import Home from '@/app/Home';

export const Page = () => {
  // 非常不优雅，但是找了半天不到解决办法
  // extjs的app router，动态路由的值在TS中需要被显式地指定，但是这会导致动态路由的值无法正确传递
  // DONE 解决办法是让params的值变为可选的，再特殊处理不传递值时的情况
  return(
    <Home />
  )
}

export default Page