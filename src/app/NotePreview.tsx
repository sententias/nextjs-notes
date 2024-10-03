import React from 'react';
import { DateTime } from 'luxon';
import styles from './NotePreviewStyles.module.scss';
import MarkdownRenderer from './MarkdownRenderer';

type NotePreviewType = {
  note: NoteType;
};

// 用户通过在地址栏输入地址就能访问对应的日记其实是不符合开发需求的
// 日记对应的地址应该由服务器控制，而不是让用户可以随意访问
// 所以不应该使用客户端组件，而是用服务器组件
const NotePreview: React.FC<NotePreviewType> = ({ note }) => {
  // 从Home(服务器组件)传过来的日期是直接从数据库里获得的Date对象
  // 从EditNote(客户端组件)传过来的日期是被json包装的字符串
  const dateFormat = (date: string) => {
    return DateTime.fromJSDate(new Date(date))
      .toFormat('yyyy年MM月dd日 EEEE HH:mm');
  };
  const now = new Date();
  return (
    <div className={styles['notes-details']}>
      <div className={styles['notes-title-box']}>{note.title}</div>
      <hr />
      <div className={styles['notes-date-box']}>
        <div
          className={`${styles['notes-date']} ${styles['notes-date-create']}`}
        >
          <span className={styles['notes-date-tag']}>创建于：</span>
          {note.created_at
            ? dateFormat(note.created_at)
            : dateFormat(now.toString())}
        </div>
        <div
          className={`${styles['notes-date']} ${styles['notes-date-update']}`}
        >
          <span className={styles['notes-date-tag']}>更新于：</span>
          {note.updated_at
            ? dateFormat(note.updated_at)
            : dateFormat(now.toString())}
        </div>
        <hr />
      </div>
      {note && <MarkdownRenderer note={note}/>}
    </div>
  );
};

export default NotePreview;
