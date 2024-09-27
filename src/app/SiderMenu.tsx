import React from 'react';
import { Menu, MenuProps } from 'antd';

// 获取菜单子项类型
// 使用 [number] 可以提取数组中某个单独元素的类型，而不需要将整个数组都包括在内。
type MenuItem = Required<MenuProps>['items'][number];

// 类似于class，用于快速构建menuItem对象
function getItem(
  key: React.Key,
  label: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    label,
    icon,
    children
  } as MenuItem;
}

// 暂时先把Menu的数据写死，后面可以转为从数据库读取信息
const menuItems = [
  getItem(1, 'item1'),
  getItem(2, 'item2'),
  getItem(3, 'item3'),
  getItem(4, 'item1'),
  getItem(2, 'item2'),
  getItem(3, 'item3'),
  getItem(4, 'item1'),
  getItem(2, 'item2'),
  getItem(3, 'item3'),
  getItem(4, 'item1'),
  getItem(2, 'item2'),
  getItem(3, 'item3'),
  getItem(4, 'item1'),
  getItem(2, 'item2'),
  getItem(3, 'item3'),
  getItem(4, 'item1'),
  getItem(2, 'item2'),
  getItem(3, 'item3')
];
export const SiderMenu = () => {
  return (
      <Menu
        theme='dark'
        defaultSelectedKeys={['1']}
        mode='inline'
        items={menuItems}
      />
  );
};

export default SiderMenu;
