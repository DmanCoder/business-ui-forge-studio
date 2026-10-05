import React from 'react';

import { ContentfulRichTextContentNode } from '@src/typescriptGlobals/contentful';

import NextLink from '@src/components/Shared/NextLink';

import { BodyCopyRendererPropTypes } from './BodyCopyRenderer.types';

const renderNode = (node: ContentfulRichTextContentNode, key?: React.Key): React.ReactNode => {
  switch (node?.nodeType) {
    case 'document':
      return <>{node?.content?.map((childNode, index) => renderNode(childNode, index))}</>;

    case 'ordered-list':
      return (
        <ol key={key} className='ml-[2rem] list-decimal'>
          {node?.content?.map((childNode, index) => renderNode(childNode, index))}
        </ol>
      );

    case 'unordered-list':
      return (
        <ul key={key} className='ml-[2rem] list-disc'>
          {node?.content?.map((childNode, index) => renderNode(childNode, index))}
        </ul>
      );

    case 'list-item':
      return (
        <li key={key}>
          {node?.content?.map((childNode, index) => {
            if (childNode.nodeType === 'paragraph') {
              return childNode.content.map((grandChildNode, grandChildIndex) =>
                renderNode(grandChildNode, `${String(key)}-grandchild-${grandChildIndex}`)
              );
            }
            return renderNode(childNode, index);
          })}
        </li>
      );

    case 'paragraph': {
      // Render children first; if all are null/empty, skip the <p>
      const children = node?.content?.map((child, i) => renderNode(child, i)).filter(Boolean) ?? [];
      if (children.length === 0) return null;

      return (
        <p key={key} className='text-pretty whitespace-pre-line'>
          {children}
        </p>
      );
    }

    case 'text': {
      // Filter out empty text nodes
      if (!node?.value || node?.value.trim() === '') return null;

      let textContent: React.ReactNode = node?.value;
      node?.marks?.forEach((mark) => {
        if (mark?.type === 'bold')
          textContent = <strong className='text-primary font-bold'>{textContent}</strong>;
        if (mark?.type === 'italic') textContent = <em>{textContent}</em>;
        if (mark?.type === 'underline') textContent = <u>{textContent}</u>;
      });
      return <>{textContent}</>;
    }

    case 'hyperlink':
      return (
        <NextLink key={key} href={node?.data?.uri}>
          {node?.content.map((childNode, index) => renderNode(childNode, index))}
        </NextLink>
      );

    default:
      return null;
  }
};

const BodyCopyRenderer: React.FC<BodyCopyRendererPropTypes> = ({
  HTMLTag = 'div',
  style = {},
  bodyCopy,
  className,
}) => {
  return (
    <HTMLTag style={style} className={`flex flex-col gap-[2.4rem] ${className}`}>
      {renderNode(bodyCopy?.json)}
    </HTMLTag>
  );
};

export default BodyCopyRenderer;
