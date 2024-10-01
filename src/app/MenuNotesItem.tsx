import { Collapse } from 'antd';
import React from 'react';
import styled from './MenuNotesItemStyles.module.scss';
import Link from 'next/link';

// 侧边栏菜单项中每个笔记的展开组件
export const MenuNotesItem: React.FC<{ note: NoteType }> = ({ note }) => {
  return (
    <Collapse
      collapsible='icon'
      className={styled['menu-collapse']}
      bordered={false}
      // expandIcon={({ isActive }) => (
      //   <CaretRightOutlined rotate={isActive ? 90 : 0} />
      // )}
      items={[
        { key: note.id, label: <Link href={`/notes/${note.id}`}>{note.title}</Link>, children: <Link  href={`/notes/${note.id}`}>{note.body}</Link> }
        // { key: note.id, label: note.id, children: <div>{note.body}</div> }
      ]}
    />
  );
};

export default MenuNotesItem;
