import React from 'react'
import Home from '@/app/Home';

export const Page = () => {
  // TODO 非常不优雅，但是找了半天不到解决办法
  // extjs的app router，动态路由的值在TS中需要被显式地指定，但是这会导致动态路由的值无法正确传递
  return(
    <Home params={{id:'-1'}} />
  )
}

export default Page