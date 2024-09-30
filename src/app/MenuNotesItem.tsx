import { Collapse } from 'antd';
import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import styled from './MenuNotesItemStyles.module.scss';

export const MenuNotesItem: React.FC<{ note: NoteType }> = ({ note }) => {
  return (
    <Collapse
      className={styled['menu-collapse']}
      bordered={false}
      // expandIcon={({ isActive }) => (
      //   <CaretRightOutlined rotate={isActive ? 90 : 0} />
      // )}
      items={[
        { key: note.id, label: note.title, children: <div>{note.body}</div> }
      ]}
    />
  );
};

export default MenuNotesItem;
