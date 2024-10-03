import EditNote from '@/app/EditNote';
import React from 'react';

// 这样会导致编辑的日记key值暴露给用户
// 并且由于后台接口是不区分编辑和新建的，这会导致自增主键和自定义主键出现bug
// 解决办法是，在前端使用状态管理的方式隐藏id值，并且在后端对接口做出修改和限制
type EditType = {
  params: {
    id?: string[];
  };
};

export const Page = ({ params }: EditType) => {
  let noteId = '';
  // 后面的url地址都是无效的，本来也不应该支持用户在地址栏中输入日记id
  if (params.id) {
    noteId = params.id[0];
  }
  return (
    <EditNote id={noteId} />
    // <div>你好</div>
  );
};

export default Page;
