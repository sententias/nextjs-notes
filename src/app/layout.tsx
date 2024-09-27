import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import NotesSider from './NotesSider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout } from 'antd';
import NoteContent from './NoteContent';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'Next笔记',
  description: 'Next笔记demo'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <Layout style={{ height: '100vh', overflow: 'hidden' }}>
            {/* 侧边栏 */}
            <NotesSider />
            {/* 内容展示 */}
            <Layout>
              <NoteContent>{children}</NoteContent>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
