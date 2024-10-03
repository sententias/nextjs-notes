import React from 'react';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const MarkdownRenderer = ({ note }: { note: NoteType }) => {
  if (!note) return <div></div>;
  let rawMarkup;
  // 将 Markdown 转换为 HTML
  if (note.body) {
    rawMarkup = marked(note.body);
  }

  // 使用 sanitize-html 清理 HTML
  const cleanMarkup = sanitizeHtml(rawMarkup as string, {
    // 添加允许的标签
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      // 允许 img 标签的 src 和 alt 属性
      img: ['src', 'alt']
    }
  });

  return <div dangerouslySetInnerHTML={{ __html: cleanMarkup }} />;
};

export default MarkdownRenderer;
