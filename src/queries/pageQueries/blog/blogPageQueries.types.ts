import {
  AssetTypes,
  BodyCopyTypes,
  CategoryCollectionTypes,
  CategoryTypes,
  MetadataTypes,
  PostCollectionTypes,
  SysTypes,
} from '@src/typescriptGlobals/contentful';

export type PostQueryResponseTypes = {
  postCollection: {
    items: {
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
    }[];
  };
};

export type BlogsPageQueryResponseTypes = {
  postCollection: PostCollectionTypes;
  categoryCollection: CategoryCollectionTypes;

  // TODO: Fix types
  pageCollection: {
    items: {
      sys: {
        publishedAt: string;
        firstPublishedAt: string;
      };
      slug: string;
      languageCode: string;
      metadata: {
        socialPreview: string;
        title: string;
        excerpt: string;
      };
    }[];
  };
};

export type BlogsPageMetadataQueryResponseTypes = {
  postCollection: {
    items: {
      languageCode: string;
      title: string;
      keyword: string;
      excerpt: string;
      featuredImage: AssetTypes;
      metadata: MetadataTypes;
    }[];
  };
};

export type BlogsSlugQueryResponseTypes = {
  postCollection: {
    items: [{ slug: string }];
  };
};

export type BlogsCategorySlugQueryResponseTypes = {
  categoryCollection: {
    items: [{ slug: string }];
  };
};
