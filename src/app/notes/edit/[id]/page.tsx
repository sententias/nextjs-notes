'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import styled from './style.module.scss';
import { Button, Flex, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Ribbon from 'antd/es/badge/Ribbon';

export const EditNote = () => {
  const params = useParams();

  return (
    <Flex justify='space-around'>
      <div className={styled['edit-content']}>
        <Input placeholder='请输入标题...' />
        <TextArea></TextArea>
      </div>
      <Flex
        gap='middle'
        className={styled['edit-domin']}
        vertical
      >
        <div className={styled['edit-toolbar']}>
          <Button type='primary'>完成</Button>
          <Button type='primary'>删除</Button>
        </div>
        <Ribbon
          text='预览'
          color='cyan'
          className={styled['edit-preview']}
        >
          <div>TODO</div>
        </Ribbon>
      </Flex>
    </Flex>
  );
};

export default EditNote;
