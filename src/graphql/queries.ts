import { getAuthToken } from "@/context/AuthStorage";
import { graphQlApiHandler } from "@/lib/helper";
import { Query } from "@/types/graphql";

export const isOnboarded = async ({ headers }: { headers?: any }) => {
  return await graphQlApiHandler<
    {},
    {
      isOnboarded: Query["isOnboarded"];
    }
  >({
    query: /* GraphQL */ `
      query IsOnboardedQuery {
        isOnboarded {
          message
          status
        }
      }
    `,
    headers: {
      Authorization: "Bearer " + getAuthToken(),
      ...headers,
    },
  });
};

export const getEnlistedProducts = async ({ headers }: { headers?: any }) => {
  return await graphQlApiHandler<
    {},
    {
      getEnlistedProducts: Query["getEnlistedProducts"];
    }
  >({
    query: /* GraphQL */ `
      query GetEnlistedProductsQuery {
        getEnlistedProducts {
          message
          status
          products {
            created_at
            description
            id
            image_url
            name
            price
            quantity
            updated_at
          }
        }
      }
    `,
    headers: {
      Authorization: "Bearer " + getAuthToken(),
      ...headers,
    },
  });
};

export const fetchProducts = async () => {
  return await graphQlApiHandler<
    {},
    {
      fetchProducts: Query["fetchProducts"];
    }
  >({
    query: /* GraphQL */ `
      query FetchProductsQuery {
        fetchProducts {
          message
          status
          latest {
            id
            name
            description
            quantity
            price
            image_url
            created_at
          }
          trending {
            id
            name
            description
            quantity
            price
            image_url
            created_at
          }
        }
      }
    `
  });
};
