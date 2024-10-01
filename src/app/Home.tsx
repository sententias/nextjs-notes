import { getById } from '@/lib/db';
import NotePreview from './NotePreview';
import { Button, Flex, Space } from 'antd';
import Link from 'next/link';

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  // 通过动态路由获取数据
  const note = await getById(id, 'notes');

  // console.log('note', note);
  if (note.length === 0) {
    return (
      <div className='note--empty-state'>
        <span className='note-text--empty-state'>
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }
  return (
    <Flex
      gap='middle'
      justify='space-between'
    >
      <NotePreview note={note[0]} />
      <Button
        type='primary'
        className='new-note-button'
        size='large'
      >
        <Link href='/'>新建笔记</Link>
      </Button>
    </Flex>
  );
}
