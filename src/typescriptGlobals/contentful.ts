import { BLOCKS, MARKS } from '@contentful/rich-text-types';

// =================================
//      GENERAL CONTENTFUL TYPES
// =================================
export type SysTypes = {
  id: string;
  publishedAt: string;
  firstPublishedAt: string;
};

export type PlatformTypes =
  | 'instagram'
  | 'twitter'
  | 'contentful'
  | 'youtube'
  | 'vimeo'
  | 'dailymotion'
  | 'wistia'
  | 'twitch'
  | 'facebookvideo'
  | 'loom'
  | 'brightcove'
  | 'jwplayer'
  | 'vidyard';

export type LanguageCodeTypes = 'en' | 'zh' | 'es' | 'de' | 'ja';

// =================================
//      METADATA
// =================================
export type ChangeFrequencyTypes =
  'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export type MetadataTypes = {
  changeFrequency: ChangeFrequencyTypes;
  priority: number;
  title: string;
  excerpt: string;
  keywords: string;
  socialPreview: AssetTypes;
  follow: boolean;
  index: boolean;
};

// =================================
//   CONTENTFUL POST SCHEMA
// =================================
export type PostCollectionTypes = {
  items: PostEntryTypes[];
};

export type CategoryCollectionTypes = {
  items: CategoryTypes[];
};

export type CategoryTypes = {
  sys: SysTypes;
  languageCode: string;
  title: PostCategoryTypes;
  slug: string;
  description: string;
  icon: AssetTypes;
};

export type PostCategoryTypes =
  'View All' | 'Pricing and process' | 'Websites' | 'Ownership and support';

export type AssetTypes = {
  width: number;
  height: number;
  url: string;
  description: string;
};

export type PostTypes = {
  title: string;
  sys: SysTypes;
  excerpt: string;
  languageCode: string;
  bodyCopy: BodyCopyTypes;
  featuredImage: AssetTypes;
  categoriesCollection: {
    items: CategoryTypes[];
  };
  slug: string;
  readTime: number;
};

export type PostEntryTypes = {
  title: string;
  sys: SysTypes;
  excerpt: string;
  bodyCopy: BodyCopyTypes;
  featuredImage: AssetTypes;
  categoriesCollection: {
    items: CategoryTypes[];
  };
  slug: string;
  readTime: number;
};

export type LinksTypes = {
  entries: {
    block: EntryBlock[];
  };
  assets: {
    block: AssetBlock[];
  };
};

export type BodyCopyTypes = {
  json: ContentfulRichTextContentNode;
  links: LinksTypes;
};

export type ContentNodeTypes = {
  data: { uri?: string };
  marks?: MarksTypes[];
  value?: string;
  nodeType: 'text' | 'hyperlink' | 'paragraph' | 'list-item' | 'unordered-list' | 'ordered-list';
  content?: CustomTextNodeType[];
};

// ==================================
//             DOCUMENT
// ==================================
export type MarksTypes = {
  type: Extract<MARKS, 'bold' | 'italic' | 'underline'>;
};

export interface CustomTextNodeType {
  nodeType: 'text';
  value: string;
  marks: MarksTypes[];
}

export interface CustomParagraphNode {
  nodeType: BLOCKS.PARAGRAPH;
  content: CustomTextNodeType[];
}

export interface CustomHeadingNode {
  nodeType:
    | BLOCKS.HEADING_1
    | BLOCKS.HEADING_2
    | BLOCKS.HEADING_3
    | BLOCKS.HEADING_4
    | BLOCKS.HEADING_5
    | BLOCKS.HEADING_6;
  content: CustomTextNodeType[];
}

export interface CustomListItemNode {
  nodeType: BLOCKS.LIST_ITEM;
  content: ContentfulRichTextContentNode[]; // Assuming list items contain only paragraphs
  data: object;
}

export interface CustomUnorderedListNode {
  nodeType: BLOCKS.UL_LIST;
  content: ContentfulRichTextContentNode[];
}

export interface CustomOrderedListNode {
  nodeType: BLOCKS.OL_LIST;
  content: ContentfulRichTextContentNode[];
}

export interface CustomHorizontalRuleNode {
  nodeType: BLOCKS.HR;
  content: ContentfulRichTextContentNode[];
  // No content array for horizontal rules as they do not contain any nested nodes
}

export interface CustomTableCellNode {
  nodeType: BLOCKS.TABLE_CELL | BLOCKS.TABLE_HEADER_CELL;
  content: ContentfulRichTextContentNode[];
}

export interface CustomTableRowNode {
  nodeType: BLOCKS.TABLE_ROW;
  content: ContentfulRichTextContentNode[];
}

export interface CustomTableNode {
  nodeType: BLOCKS.TABLE;
  content: ContentfulRichTextContentNode[];
}

export interface CustomDocumentNode {
  nodeType: BLOCKS.DOCUMENT;
  content: ContentfulRichTextContentNode[];
}

export interface CustomEmbeddedAssetBlockNode {
  nodeType: BLOCKS.EMBEDDED_ASSET;
  content: []; // Embedded assets do not have content nodes
  data: {
    target: {
      sys: {
        id: string;
        type: 'Link';
        linkType: 'Asset';
      };
    };
  };
}

export interface TextNode {
  nodeType: 'text';
  value: string;
  marks?: MarksTypes[];
  data: object;
}

export interface HyperlinkNode {
  nodeType: 'hyperlink';
  content: ContentfulRichTextContentNode[];
  data: {
    uri: string;
  };
}

export interface ListItemNode {
  nodeType: 'list-item';
  content: ContentfulRichTextContentNode[];
  data: object;
}

export interface ParagraphNode {
  nodeType: 'paragraph';
  content: ContentfulRichTextContentNode[];
  data: object;
}

// Create a type that can be either a paragraph or a heading
export type ContentfulRichTextContentNode =
  | ParagraphNode
  | TextNode
  | ListItemNode
  | HyperlinkNode
  | CustomDocumentNode
  | CustomParagraphNode
  | CustomHeadingNode
  | CustomUnorderedListNode
  | CustomHorizontalRuleNode
  | CustomOrderedListNode
  | CustomTableNode
  | CustomEmbeddedAssetBlockNode;

// Extend the ContentfulDocument type to include our custom content types
export interface CustomRichTextDocument {
  nodeType: BLOCKS.DOCUMENT;
  content: ContentfulRichTextContentNode[]; // Now this can include both paragraphs and headings
  data: object;
}

// ==================================
//      DOCUMENT ASSETS / ENTRIES
// ==================================

export type ButtonPropAlignTypes = 'left' | 'center' | 'right';

export type ButtonEntryTypes = {
  __typename: 'Button';
  sys: SysTypes;
  text: string;
  url: string;
  type: 'primary' | 'secondary' | 'tertiary';
  align: ButtonPropAlignTypes;
};

export type ImageEntryTypes = {
  __typename: 'Image';
  sys: SysTypes;
  file: AssetFields;
  bodyCopy: BodyCopyTypes;
  width: number;
  alignment: 'Left' | 'Center' | 'Right';
};

export type ProsConsEntryTypes = {
  __typename: 'ProsCons';
  sys: SysTypes;
  pros: BodyCopyTypes;
  cons: BodyCopyTypes;
};

export type SocialEmbedEntryTypes = {
  __typename: 'SocialEmbed';
  sys: SysTypes;
  url: string;
  platform: PlatformTypes;
  bodyCopy: BodyCopyTypes;
  thumbnail: AssetFields;
};

export type TextBoxEntryTypes = {
  __typename: 'TextBox';
  sys: SysTypes;
  bodyCopy: BodyCopyTypes;
  color: 'Primary' | 'Secondary';
};

export type AssetFields = {
  __typename: string;
  sys: SysTypes;
  width: number;
  height: number;
  url: string;
  title: string;
  description: string;
  contentType: string;
  fileName: string;
  size: number;
};

// Define the type for the block entries in `assets`
export type AssetBlock = AssetFields;

// Define the type for the blockquote entry
export interface BlockquoteEntry {
  __typename: string;
  sys: SysTypes;
  name: string;
  bodyCopy: BodyCopyTypes;
}

export interface TableOfContentsEntryTypes {
  __typename: string;
  sys: SysTypes;
  title: string;
  bodyCopy: BodyCopyTypes;
}

// Define the type for the block entries in `entries`
export type EntryBlock =
  | BlockquoteEntry
  | ButtonEntryTypes
  | ImageEntryTypes
  | SocialEmbedEntryTypes
  | TextBoxEntryTypes
  | ProsConsEntryTypes
  | TableOfContentsEntryTypes;

// =================================
//           PAGES TYPES
// =================================
export type HomePageQueryResponseTypes = {
  pageCollection: {
    items: [
      {
        hero: {
          items: [
            {
              preTitle: string;
              title: string;
              intro: BodyCopyTypes;
              buttonCollection: {
                items: ButtonEntryTypes[];
              };
            },
          ];
        };
        mustReadPosts: {
          items: [
            {
              preTitle: string;
              title: string;
              bodyCopy: BodyCopyTypes;
              buttonCollection: {
                items: ButtonEntryTypes[];
              };
            },
          ];
        };
        aboutMe: {
          items: [
            {
              preTitle: string;
              title: string;
              bodyCopy: BodyCopyTypes;
              buttonCollection: {
                items: ButtonEntryTypes[];
              };
            },
          ];
        };
        exploreCategories: {
          items: [
            {
              preTitle: string;
              title: string;
              bodyCopy: BodyCopyTypes;
              buttonCollection: {
                items: ButtonEntryTypes[];
              };
            },
          ];
        };
        faq: {
          items: [
            {
              preTitle: string;
              title: string;
              bodyCopy: BodyCopyTypes;
              qaPairsCollection: {
                items: [
                  {
                    title: string;
                    bodyCopy: BodyCopyTypes;
                  },
                ];
              };
              buttonCollection: {
                items: ButtonEntryTypes[];
              };
            },
          ];
        };
        cta: {
          items: [
            {
              preTitle: string;
              title: string;
              bodyCopy: BodyCopyTypes;
              buttonCollection: {
                items: ButtonEntryTypes[];
              };
            },
          ];
        };
      },
    ];
  };
  latestPosts: PostCollectionTypes;
  categories: CategoryCollectionTypes;
};
