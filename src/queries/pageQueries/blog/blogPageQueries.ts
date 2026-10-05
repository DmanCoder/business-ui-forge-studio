import gql from 'graphql-tag';

export const GQL_FETCH_BLOG_PAGE_ENTRIES = gql`
  query ($slug: String, $preview: Boolean) {
    postCollection(
      where: { slug: $slug, contentfulMetadata: { tags: { id_contains_some: "uifs" } } }
      limit: 1
      order: sys_publishedAt_DESC
      preview: $preview
    ) {
      items {
        sys {
          publishedAt
          firstPublishedAt
        }
        slug
        title
        excerpt
        readTime
        languageCode
        featuredImage {
          width
          height
          url
          description
        }
        categoriesCollection {
          items {
            ... on Category {
              title
              slug
            }
          }
        }
        excerpt
        bodyCopy {
          json
          links {
            entries {
              block {
                ... on Blockquote {
                  __typename
                  sys {
                    id
                  }
                  name
                  bodyCopy {
                    json
                  }
                }
                ... on Button {
                  __typename
                  sys {
                    id
                  }
                  align
                  text
                  url
                  type
                }
                ... on Image {
                  __typename
                  sys {
                    id
                  }
                  file {
                    width
                    height
                    url
                    description
                  }
                  bodyCopy {
                    json
                  }
                  alignment
                  width
                }
                ... on TableOfContents {
                  __typename
                  sys {
                    id
                  }
                  title
                  bodyCopy {
                    json
                  }
                }
                ... on SocialEmbed {
                  __typename
                  sys {
                    id
                  }
                  url
                  platform
                  thumbnail {
                    width
                    height
                    url
                    description
                  }
                  bodyCopy {
                    json
                  }
                }
                ... on TextBox {
                  __typename
                  sys {
                    id
                  }
                  bodyCopy {
                    json
                  }
                  color
                }
                ... on ProsCons {
                  __typename
                  sys {
                    id
                  }
                  pros {
                    json
                  }
                  cons {
                    json
                  }
                }
              }
            }
            assets {
              block {
                __typename
                sys {
                  id
                }
                url
                title
                description
                contentType
                fileName
                size
              }
            }
          }
        }
      }
    }
  }
`;

export const GQL_FETCH_POST_ENTRIES_WITH_CATEGORY_ENTRIES = gql`
  query ($slug: String, $locale: String, $preview: Boolean, $limit: Int) {
    pageCollection(
      where: {
        languageCode: $locale
        slug: $slug
        contentfulMetadata: { tags: { id_contains_some: "uifs" } }
      }
      preview: $preview
    ) {
      items {
        slug
        languageCode
        sys {
          publishedAt
          firstPublishedAt
        }
        metadata {
          title
          excerpt
          socialPreview {
            width
            height
            description
            url
          }
        }
      }
    }

    postCollection(
      limit: $limit
      order: sys_publishedAt_DESC
      where: {
        contentfulMetadata: { tags: { id_contains_some: "uifs" } }
        categories: { slug: $slug }
      }
      preview: $preview
    ) {
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        title
        excerpt
        slug
        readTime
        categoriesCollection {
          items {
            ... on Category {
              title
              slug
            }
          }
        }
        featuredImage {
          url
          width
          height
          description
        }
      }
    }
    categoryCollection(
      order: order_ASC
      preview: $preview
      where: { contentfulMetadata: { tags: { id_contains_some: "uifs" } } }
    ) {
      items {
        sys {
          id
        }
        title
        slug
        description
      }
    }
  }
`;

export const GQL_FETCH_POST_ENTRIES = gql`
  query ($slug: String, $preview: Boolean, $limit: Int, $excludeId: String) {
    postCollection(
      limit: $limit
      order: sys_publishedAt_DESC
      where: {
        contentfulMetadata: { tags: { id_contains_some: "uifs" } }
        categories: { slug: $slug }
        sys: { id_not_contains: $excludeId }
      }
      preview: $preview
    ) {
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        title
        excerpt
        slug
        readTime
        categoriesCollection {
          items {
            ... on Category {
              title
              slug
            }
          }
        }
        featuredImage {
          url
          width
          height
          description
        }
      }
    }
  }
`;

export const GQL_FETCH_FEATURED_POST_ENTRIES = gql`
  query ($preview: Boolean) {
    postCollection(
      limit: 1
      order: sys_publishedAt_DESC
      where: { contentfulMetadata: { tags: { id_contains_some: "uifs" } } }
      preview: $preview
    ) {
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        title
        excerpt
        slug
        readTime
        categoriesCollection {
          items {
            ... on Category {
              title
              slug
            }
          }
        }
        featuredImage {
          url
          width
          height
          description
        }
      }
    }
  }
`;

export const GQL_FETCH_POSTS_AND_CATEGORIES_ENTRIES = gql`
  query ($slug: String, $preview: Boolean, $limit: Int, $excludeId: String) {
    postCollection(
      limit: $limit
      order: sys_publishedAt_DESC
      where: {
        contentfulMetadata: { tags: { id_contains_some: "uifs" } }
        categories: { slug: $slug }
        sys: { id_not_contains: $excludeId }
      }
      preview: $preview
    ) {
      items {
        sys {
          id
          publishedAt
          firstPublishedAt
        }
        title
        excerpt
        slug
        readTime
        categoriesCollection {
          items {
            ... on Category {
              title
              slug
            }
          }
        }
        featuredImage {
          url
          width
          height
          description
        }
      }
    }

    categoryCollection(
      order: order_ASC
      preview: $preview
      where: { contentfulMetadata: { tags: { id_contains_some: "uifs" } } }
    ) {
      items {
        sys {
          id
        }
        title
        slug
        description
      }
    }
  }
`;

export const GQL_FETCH_POST_CATEGORIES_ENTRIES = gql`
  query ($preview: Boolean) {
    categoryCollection(
      order: order_ASC
      preview: $preview
      where: { contentfulMetadata: { tags: { id_contains_some: "uifs" } } }
    ) {
      items {
        sys {
          id
        }
        title
        slug
        description
      }
    }
  }
`;

export const GQL_FETCH_BLOGS_PAGE_ENTRIES = gql`
  query ($slug: String, $preview: Boolean) {
    posts: postCollection(
      order: sys_publishedAt_DESC
      where: { category: { slug: $slug } }
      preview: $preview
    ) {
      items {
        sys {
          id
          publishedAt
        }
        title
        excerpt
        slug
        category {
          title
        }
        featuredImage {
          url
          width
          height
          description
        }
        bodyCopy {
          json
        }
      }
    }
    categories: categoryCollection(order: order_ASC) {
      items {
        sys {
          id
        }
        title
        slug
        description
      }
    }
  }
`;

export const GQL_FETCH_BLOG_PAGE_METADATA_ENTRIES = gql`
  query ($slug: String, $preview: Boolean) {
    postCollection(
      where: { slug: $slug }
      limit: 1
      order: sys_publishedAt_DESC
      preview: $preview
    ) {
      items {
        languageCode
        title
        keyword
        excerpt
        featuredImage {
          width
          height
          url
          description
        }
      }
    }
  }
`;

export const GQL_FETCH_BLOGS_SLUGS = gql`
  query ($preview: Boolean) {
    postCollection(order: sys_publishedAt_DESC, preview: $preview) {
      items {
        slug
      }
    }
  }
`;

export const GQL_FETCH_BLOGS_CATEGORY_SLUGS = gql`
  query ($preview: Boolean) {
    categoryCollection(order: order_ASC, preview: $preview) {
      items {
        slug
      }
    }
  }
`;
