import { Breadcrumb } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import styles from '@/app/NoteContentStyles.module.scss';

export const NoteContent: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <div>
      <Content style={{ margin: '0 1rem' }}>
        <Breadcrumb
          style={{ margin: '1rem 0' }}
          items={[{ title: 'sample' }, { title: 'title1' }]}
        />
        {/* 使用module css进行css样式的设置 */}
        <div className={styles['content-box']}>{children}</div>
      </Content>
    </div>
  );
};

export default NoteContent;
