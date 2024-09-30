import { Menu, MenuProps } from 'antd';
import React from 'react';
import styles from './styles.module.scss';
import MenuNotesItem from '../MenuNotesItem';

type MenuItem = Required<MenuProps>['items'][number];

export const Page = (note: NoteType) => {
  const menuItems: MenuItem[] = [
    {
      key: '1',
      label:
        'Navigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation OneNavigation One'
    },
    {
      key: '2',
      label: <MenuNotesItem note={{id: 1,}}/>
    }
  ];
  return (
    <Menu
      defaultSelectedKeys={['1']}
      mode='inline'
      items={menuItems}
    />
  );
};

export default Page;
