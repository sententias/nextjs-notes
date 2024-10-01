'use client';

import React from 'react';
import styled from './styles.module.scss';
import { Button, Flex, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Ribbon from 'antd/es/badge/Ribbon';
import NotePreview from '../NotePreview';
import FormItem from 'antd/es/form/FormItem';
import { useForm } from 'antd/es/form/Form';

type FieldType = {
  title?: string;
  body?: string;
};

type EditNoteType = {
  note: NoteType;
};

export const EditNote: React.FC<EditNoteType> = ({ note }) => {
  const [form] = useForm();
  return (
    <div className={styled['edit-box']}>
      <Form
        className={styled['edit-content']}
        name='basic'
        requiredMark={false}
        form={form}
      >
        <FormItem<FieldType>
          label='标题'
          name='title'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder='请输入标题...' />
        </FormItem>
        <FormItem<FieldType>
          label='内容'
          name='body'
        >
          <TextArea className={styled['textarea']}></TextArea>
        </FormItem>
      </Form>

      <Flex
        gap='middle'
        className={styled['edit-domin']}
        vertical
      >
        <Flex
          className={styled['edit-toolbar']}
          gap='middle'
          justify='centure'
        >
          <Button
            variant='solid'
            color='primary'
            size='large'
          >
            完成
          </Button>
          <Button
            variant='solid'
            color='danger'
            size='large'
          >
            删除
          </Button>
        </Flex>
        <Ribbon
          text='预览'
          color='cyan'
          className={styled['edit-preview']}
        >
          <NotePreview note={{ id: 1, body: '112314' }} />
        </Ribbon>
      </Flex>
    </div>
  );
};

export default EditNote;
