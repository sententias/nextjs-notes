'use client';

import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useParams } from 'next/navigation';
import styled from './styles.module.scss';
import EditButton from './EditButton';

const NotesDetails: React.FC = () => {
  const params = useParams();
  const [note, setNote] = useState<NoteType | null>(null); // 允许 note 为 null
  const [error, setError] = useState<string | null>(null); // 添加错误状态

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/notes/${params.id}`
        );

        if (!response.ok) {
          throw new Error('无法获取笔记');
        }

        const data = await response.json();
        setNote(data); // 更新状态
      } catch (err) {
        setError(err.message); // 捕获错误并更新状态
      }
    };

    fetchNote(); // 调用异步函数
  }, [params.id]); // 依赖 params.id

  return (
    <>
      <div className={styled['notes-details']}>
        {error && <div className={styled['error-message']}>{error}</div>}{' '}
        {/* 显示错误信息 */}
        <div className={styled['notes-date-box']}>
          <div className={styled['notes-date-create']}>
            {DateTime.local().toISO()}
            {/* {note ? DateTime.fromISO(note.createdAt).toISO() : '加载中...'} */}
          </div>
          <div className={styled['notes-date-update']}>
            {DateTime.local().toISO()}
            {/* {note ? DateTime.fromISO(note.updatedAt).toISO() : '加载中...'} */}
          </div>
        </div>
        {note && <div>{note.body}</div>} {/* 显示笔记内容 */}
      </div>
      <div className={styled['edit-button-box']}>
        <EditButton />
      </div>
    </>
  );
};

export default NotesDetails;
