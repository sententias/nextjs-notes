import { Breadcrumb } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import styles from '@/app/NoteContentStyles.module.scss';
import NotePreview from './notes/[id]/page';

type NoteContentType = {
  children: React.ReactNode;
};

// 除侧边栏外的主要展示部分,目前主要展示部分的CSS样式
export const NoteContent: React.FC<NoteContentType> = ({ children }) => {
  return (
    <div>
      <Content style={{ margin: '0 1rem' }}>
        <Breadcrumb
          style={{ margin: '1rem 0' }}
          items={[{ title: 'dash board' }, { title: 'title1' }]}
        />
        {/* 使用module css进行css样式的设置 */}
        <div className={styles['content-box']}>
          {children}
        </div>
      </Content>
    </div>
  );
};

export default NoteContent;
