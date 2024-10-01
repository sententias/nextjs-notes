import React from 'react';
import { DateTime } from 'luxon';
import styled from './NotePreviewStyles.module.scss';

type NotePreviewType = {
  note: NoteType
}

// 用户通过在地址栏输入地址就能访问对应的日记其实是不符合开发需求的
// 日记对应的地址应该由服务器控制，而不是让用户可以随意访问
// 所以不应该使用客户端组件，而是用服务器组件
const NotePreview: React.FC<NotePreviewType> = ({note}) => {
  return (
    <div className={styled['notes-details']}>
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
  );
};

export default NotePreview;
