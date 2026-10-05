import React from 'react';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types';
import parse from 'html-react-parser';

import {
  BlockquoteEntry,
  ButtonEntryTypes,
  ContentfulRichTextContentNode,
  CustomHeadingNode,
  ImageEntryTypes,
  LinksTypes,
  ProsConsEntryTypes,
  TableOfContentsEntryTypes,
  TextBoxEntryTypes,
  SocialEmbedEntryTypes,
} from '@src/typescriptGlobals/contentful';

import Blockquote from '@src/components/Shared/Blockquote';
import BodyCopyRenderer from '@src/components/Shared/BodyCopyRenderer';
import Button from '@src/components/Shared/Button';
import NextImage from '@src/components/Shared/NextImage';
import NextLink from '@src/components/Shared/NextLink';
import TableOfContents from '@src/components/Shared/TableOfContents';
import SocialEmbeds from '../SocialEmbeds';

import getButtonStyleProps from '@src/utils/getButtonStyleProps';

const isBlockish = (n: React.ReactNode) =>
  React.isValidElement(n) &&
  typeof n.type === 'string' &&
  [
    'code',
    'pre',
    'table',
    'blockquote',
    'hr',
    'ol',
    'ul',
    'iframe',
    'div',
    'section',
    'article',
    'figure',
  ].includes(n.type);

const RichTextRenderer: React.FC<{
  documents?: ContentfulRichTextContentNode;
  links?: LinksTypes;
}> = ({ documents, links }) => {
  const options: Options = {
    renderMark: {
      [MARKS.CODE]: (text: React.ReactNode) => {
        return (
          <code className='text-[clamp(10px,2.8vw,14px)]'>
            {typeof text === 'string' ? parse(text) : text}
          </code>
        );
      },
      [MARKS.BOLD]: (text) => <strong className='text-primary font-semibold'>{text}</strong>,
      [MARKS.ITALIC]: (text) => <span className='italic'>{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => {
        // Flatten and strip pure-whitespace strings
        const flat = React?.Children?.toArray(children).filter(
          (c) => !(typeof c === 'string' && c?.trim() === '')
        );

        // If this "paragraph" only contains block-level nodes (e.g., <pre>),
        // return them directly — no <p> wrapper.
        if (flat.length > 0 && flat.every(isBlockish)) {
          return <>{flat}</>;
        }

        return (
          <p className='text-[1.6rem] leading-[3.2rem] text-pretty whitespace-pre-line md:text-[1.8rem]'>
            {children}
          </p>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        const heading = node as CustomHeadingNode;
        const dataId = heading?.content?.[0]?.value
          ?.replace(/[^a-zA-Z]+/g, '-')
          ?.replace(/^-+|-+$/g, '')
          ?.toLowerCase();

        return (
          <header>
            <h2
              scrollto-id={dataId}
              className='text-body-copy--dark mt-[1.8rem] mb-[-1rem] text-[2.6rem] font-semibold text-pretty md:text-[3rem]'
            >
              {children}
            </h2>
          </header>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        const heading = node as CustomHeadingNode;
        const dataId = heading?.content?.[0]?.value
          ?.replace(/[^a-zA-Z]+/g, '-')
          ?.replace(/^-+|-+$/g, '')
          ?.toLowerCase();

        return (
          <header>
            <h3
              scrollto-id={dataId}
              className='text-body-copy--dark mb-[-1rem] text-[2rem] font-semibold text-pretty md:text-[2.4rem]'
            >
              {children}
            </h3>
          </header>
        );
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        const heading = node as CustomHeadingNode;
        const dataId = heading?.content?.[0]?.value
          ?.replace(/[^a-zA-Z]+/g, '-')
          ?.replace(/^-+|-+$/g, '')
          ?.toLowerCase();

        return (
          <header>
            <h4
              scrollto-id={dataId}
              className='text-body-copy--dark mb-[-1rem] text-[1.6rem] font-semibold text-pretty md:text-[2rem]'
            >
              {children}
            </h4>
          </header>
        );
      },
      [INLINES.HYPERLINK]: (node, children) => {
        return <NextLink href={node?.data?.uri}>{children}</NextLink>;
      },
      [BLOCKS.HR]: () => <hr className='text-border' />,
      [BLOCKS.OL_LIST]: (_, children) => (
        <ol className='ml-[2rem] list-decimal leading-[3.2rem]'>{children}</ol>
      ),
      [BLOCKS.UL_LIST]: (_, children) => (
        <ul className='ml-[2rem] list-disc leading-[3.2rem] [&>li>ul]:list-[circle]'>{children}</ul>
      ),
      [BLOCKS.LIST_ITEM]: (_node, children) => {
        const normalized: React.ReactNode[] = React.Children.toArray(children).flatMap((node) => {
          // Only elements have .props; this narrows the type
          if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.type === 'p') {
            // Keep the paragraph's children (text/links/etc.)
            return React.Children.toArray(node.props.children);
          }
          // Keep anything else (e.g., nested <ul>/<ol>)
          return node;
        });

        return <li>{normalized}</li>;
      },
      [BLOCKS.TABLE]: (_, children) => (
        <table className='border-border border-separate border-spacing-[0] overflow-hidden rounded-2xl border-[0.1rem]'>
          <thead className='bg-primary text-background-primary! [&>tr>td>strong]:text-background-primary!'>
            {/* Assuming first row in children is the header, adjust as needed */}
            {React.Children.toArray(children)[0]}
          </thead>
          <tbody className='border-border [&>tr>td]:border-border border-[0.1rem] [&>tr>td]:border-t-[0.1rem] [&>tr>td:not(:first-child)]:border-l-[0.1rem]'>
            {/* All other rows are part of the body, adjust as needed */}
            {React.Children.toArray(children).slice(1)}
          </tbody>
        </table>
      ),
      [BLOCKS.TABLE_ROW]: (_, children) => <tr>{children}</tr>,
      [BLOCKS.TABLE_CELL]: (_, children) => {
        // If the children contain paragraphs, we need to unwrap them
        const unwrappedChildren = React.Children.map(children, (child) => {
          if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.type === 'p') {
            // If the child is a <p> element, return its children directly
            return child.props.children;
          }
          return child;
        });

        return <td className='p-[1rem]'>{unwrappedChildren}</td>;
      },
      [BLOCKS.QUOTE]: (_, children) => {
        const inline = React.Children.toArray(children)
          .flatMap((n) =>
            React.isValidElement(n) && n.type === 'p'
              ? React.Children.toArray((n as any).props.children)
              : [n]
          )
          // optional: strip whitespace-only text nodes
          .filter((n) => !(typeof n === 'string' && n.trim() === ''));

        return (
          <blockquote className='border-primary rounded-[0.8rem] border-l-[0.7rem] pl-[1.5rem] text-[1.6rem] leading-[2.4rem] font-medium text-pretty whitespace-pre-line md:text-[2.4rem] md:leading-[3.6rem] [&>a]:font-medium'>
            {inline}
          </blockquote>
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        // Assuming that your entries are stored in an array called `entries`
        const entryId = node?.data?.target?.sys?.id;
        const entry = links?.entries?.block.find((entry) => entry?.sys?.id === entryId);

        // If the entry is of the type 'Blockquote', you render it
        if (entry && entry.__typename === 'Blockquote') {
          return <Blockquote data={entry as BlockquoteEntry} />;
        }

        if (entry && entry.__typename === 'Button') {
          const { text, type, url, align } = entry as ButtonEntryTypes;

          return (
            <Button
              HtmlTag='Link'
              className='[&>span]:text-background-primary w-full sm:w-[unset]'
              {...getButtonStyleProps(type)}
              href={url}
              text={text}
              align={align}
            />
          );
        }

        if (entry && entry.__typename === 'Image') {
          const { file, bodyCopy, alignment, width, sys } = entry as ImageEntryTypes;
          const align = { Left: 'mr-auto', Center: 'mx-auto', Right: 'ml-auto' };

          return (
            <NextImage
              key={sys?.id}
              className={`w-[${width}%] ${align?.[alignment]} overflow-hidden md:block [&>img]:rounded-[0.8rem]`}
              src={file?.url}
              aspectRatio={file?.width / file?.height}
              width={file?.width}
              alt={file?.description}
              caption={bodyCopy}
              sizes='(min-width: 836px) 836px, 100vw'
            />
          );
        }

        if (entry && entry.__typename === 'TableOfContents') {
          return <TableOfContents data={entry as TableOfContentsEntryTypes} />;
        }

        if (entry && entry.__typename === 'SocialEmbed') {
          return <SocialEmbeds data={entry as SocialEmbedEntryTypes} />;
        }

        if (entry && entry.__typename === 'TextBox') {
          const { sys, bodyCopy, color } = entry as TextBoxEntryTypes;
          const colors = {
            Primary: {
              background: '#F0E7FF',
              border: '0.2rem solid #7F56D9',
              borderLeft: '1.7rem solid #7F56D9',
            },
            Secondary: {
              background: '#fafafa',
              border: '0.2rem solid #e5e7eb',
              borderLeft: '1.7rem solid #e5e7eb',
            },
          };

          return (
            <BodyCopyRenderer
              key={sys?.id}
              style={colors?.[color]}
              HTMLTag='aside'
              className='border-left-[0.3rem] border-border text-body-copy--dark [&>p>a]:text-body-copy--dark [&>p>strong]:text-body-copy--dark rounded-[0.8rem] border-[0.2rem] p-[1rem] text-[1.6rem] leading-[3.2rem] md:text-[1.8rem]'
              bodyCopy={bodyCopy}
            />
          );
        }

        if (entry && entry.__typename === 'ProsCons') {
          const { sys, pros, cons } = entry as ProsConsEntryTypes;

          return (
            <div className='gap-[2.4rem] md:grid md:auto-rows-fr md:grid-cols-2'>
              <div className='flex h-full flex-col'>
                <h4 className='text-success mb-[1.3rem] text-[1.6rem] font-semibold md:text-[2rem]'>
                  Pros
                </h4>
                <BodyCopyRenderer
                  key={sys?.id}
                  className='border-left-[0.3rem] border-success bg-success--light text-body-copy--dark [&>a]:text-body-copy--dark [&>strong]:text-body-copy--dark [&>ul>li>strong]:text-body-copy--dark! h-full rounded-[0.8rem] border-[0.2rem] p-[1rem] text-[1.6rem] leading-[3.2rem] md:text-[1.8rem]'
                  bodyCopy={pros}
                />
              </div>

              <div className='mt-[2.4rem] flex h-full flex-col md:mt-[unset]'>
                <h4 className='text-error mb-[1.3rem] text-[1.6rem] font-semibold md:text-[2rem]'>
                  Cons
                </h4>
                <BodyCopyRenderer
                  key={sys?.id}
                  className='border-left-[0.3rem] border-error bg-error--light text-body-copy--dark [&>a]:text-body-copy--dark [&>strong]:text-body-copy--dark [&>ul>li>strong]:text-body-copy--dark! h-full rounded-[0.8rem] border-[0.2rem] p-[1rem] text-[1.6rem] leading-[3.2rem] md:text-[1.8rem]'
                  bodyCopy={cons}
                />
              </div>
            </div>
          );
        }

        return null;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const assetId = node?.data?.target?.sys?.id;
        // Assuming links is accessible in this scope and contains the assets
        const asset = links?.assets?.block.find((asset) => asset.sys.id === assetId);
        if (asset) {
          // The alt text comes from the asset's description
          const altText = asset.description || 'Image'; // Fallback alt text if none provided
          const captionText = asset.description; // Using the title as the caption
          return (
            <NextImage
              className='overflow-hidden md:block [&>img]:rounded-[0.8rem]'
              src={asset.url}
              alt={altText}
              caption={captionText}
              sizes='(min-width: 836px) 836px, 100vw'
            />
          );
        }
        return null;
      },
      // Add more blocks if needed
    },
  };
  return (
    <div className='flex flex-col gap-[2.4rem]'>
      {documentToReactComponents(documents as Document, options)}
    </div>
  );
};

export default RichTextRenderer;
