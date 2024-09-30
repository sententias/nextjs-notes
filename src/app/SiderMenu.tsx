import React from 'react';
import { Menu, MenuProps } from 'antd';
import { getAll, getMenuList } from '@/lib/db';
import MenuNotesItem from './MenuNotesItem';
import style from './SiderMenuStyles.module.scss';

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

async function getDBList(): Promise<MenuItem[]> {
  // 获取菜单列表
  const menuList = await getAll('notes');
  const menuListItem = menuList.map((item) => {
    if (item.id) {
      return getItem(
        item.id,
          <MenuNotesItem note={item} />
      );
      // return getItem(item.id, <div>asdasdasdasdassssssssssssssssssssssssssssssssssssssssssssss</div>);
    }
    return getItem(0, 'null') as MenuItem;
  });
  return menuListItem;
}

export const SiderMenu = async () => {
  const menuItems = await getDBList();
  return (
    <Menu
    // 由于antd的默认菜单项是固定高度，用于通过CSS选择器实现伸缩菜单项
    /**
     * #collapse-menu-item {
     *   li {
     *     height: fit-content !important;
     *   }
     * }
     */
      id={style['collapse-menu-item']}
      defaultSelectedKeys={['1']}
      mode='inline'
      items={menuItems}
    />
  );
};

export default SiderMenu;
