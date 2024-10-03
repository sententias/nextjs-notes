import { Button } from 'antd';
import Link from 'next/link';
import React from 'react'

// 新建笔记按钮
export const NewnoteButton = () => {
  return(
    <Button type='primary'>
      <Link href='/edit'>新建</Link>
    </Button>
  )
}

export default NewnoteButton