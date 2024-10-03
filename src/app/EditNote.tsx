'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from './EditNoteStyles.module.scss';
import { Button, Flex, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Ribbon from 'antd/es/badge/Ribbon';
import NotePreview from '@/app/NotePreview';
import FormItem from 'antd/es/form/FormItem';
import { useForm, useWatch } from 'antd/es/form/Form';
import { useRouter } from 'next/navigation';

type FieldType = {
  id?: string;
  title?: string;
  body?: string;
};

interface EditNoteProps {
  // 可选的隐藏字段
  id?: string;
  note?: NoteType;
}

export const EditNote: React.FC<EditNoteProps> = ({ id }) => {
  // 引用form
  const [form] = useForm();
  // 初始化路由
  const router = useRouter();

  // 监控form属性值
  const title = useWatch('title', form);
  const body = useWatch('body', form);

  // 如果是编辑defultNote，用于存储note数据
  const [defultNote, setDefultNote] = useState<NoteType>();

  // 如果是从笔记页面跳转过来的，需要查询笔记内容并初始化到表格中
  useLayoutEffect(() => {
    const getNoteFunc = async () => {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`);
      const { note } = await response.json();
      setDefultNote(note);
      form.setFieldsValue(note);
    };
    // 如果传递了id才查询，否则不需要浪费性能
    if (id) {
      getNoteFunc();
    }
  }, [id]);

  // 用于表单提交逻辑
  const submitNote = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/notes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          body,
          // 如果 id 存在，添加 { id }，否则添加空对象
          ...(id ? { id } : {})
        })
      });

      if (!response.ok) {
        throw new Error('网络错误，请重试');
      }

      const result = await response.json();

      // 页面跳转到新创建的笔记详情
      if (result.newId) {
        router.push(`/notes/${result.newId}`);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const deleteNote = async (id: string | undefined) => {
    if (!id) {
      return;
    }
    const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    if(result) {
      router.push(`/edit`);
    }
    return result;
  };

  return (
    <div className={styled['edit-box']}>
      <Form
        className={styled['edit-content']}
        name='note'
        requiredMark={false}
        form={form}
        onFinish={submitNote}
        initialValues={defultNote}
      >
        <FormItem<FieldType>
          label='标题'
          name='title'
          rules={[{ required: true, message: '请输入标题!' }]}
        >
          <Input placeholder='请输入标题...' />
        </FormItem>
        <FormItem<FieldType>
          label='内容'
          name='body'
        >
          <TextArea className={styled['textarea']} />
        </FormItem>

        <FormItem<FieldType>
          name='id'
          style={{ display: 'none' }}
        >
          <Input
            type='hidden'
            value={id}
          />
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
          justify='center'
        >
          <Button
            variant='solid'
            color='primary'
            size='large'
            onClick={() => form.submit()}
          >
            完成
          </Button>
          <Button
            variant='solid'
            color='danger'
            size='large'
            onClick={() => deleteNote(id)}
          >
            删除
          </Button>
        </Flex>
        <Ribbon
          text='预览'
          color='cyan'
          className={styled['edit-preview']}
        >
          <NotePreview
            note={{
              title,
              body,
              created_at: defultNote?.created_at,
              updated_at: defultNote?.updated_at
            }}
          />
        </Ribbon>
      </Flex>
    </div>
  );
};

export default EditNote;
