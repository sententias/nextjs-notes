import React from 'react';
import { Flex } from 'antd';
import Sider from 'antd/es/layout/Sider';
import styles from '@/app/NotesSiderStyles.module.scss';
import SiderMenu from './SiderMenu';
import NotesSearch from './NotesSearch';
import NewnoteButton from './NewnoteButton';

export const NotesSider: React.FC = ({
}) => {
  return (
    // 全局侧边栏
    <Sider className={styles['main-menu-sider']}>
      <Flex
        vertical
        gap='small'
      >
        <div className={styles['menu-top-box']}>
          {/* logo展示 */}
          <div className={styles['logo-box']}>
            <div className={styles['logo']} />
            <div className={styles['logo-name']}>React Notes</div>
          </div>

          {/* 搜索栏 */}
          <div className={styles['toolbar']}>
            <Flex gap='small'>
              <NotesSearch />
              <NewnoteButton />
            </Flex>
          </div>
        </div>

        {/* 列表栏 */}
        <div className={styles['sider-menu-scroll-box']}>
          <SiderMenu />
        </div>
      </Flex>
    </Sider>
  );
};

export default NotesSider;
