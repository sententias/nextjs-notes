import { getById } from '@/lib/db';
import NotePreview from './NotePreview';
import { Button } from 'antd';
import Link from 'next/link';

type HomeType = {
  params?: {
    id:string;
  }
}

export default async function Home({ params }: HomeType) {
  const id = params ? params.id : '';
  // 通过动态路由获取数据
  const note = await getById(id, 'notes');

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap:'20px'
      }}
    >
      <div
        style={{
          flex: '1'
        }}
      >
        <NotePreview note={note[0]} />
      </div>

      <Button
        type='primary'
        className='new-note-button'
        size='large'
      >
        <Link href={`/edit/${note[0].id}`}>编辑笔记</Link>
      </Button>
    </div>
  );
}
