import { getAuthToken } from "@/context/AuthStorage";
import { graphQlApiHandler } from "@/lib/helper";
import { BuyerOrderItem, FetchOrderItemsForBuyer, FetchOrderItemsForSeller, Query, SearchProduct } from "@/types/graphql";

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

export const searchProducts = async ({text}: SearchProduct, { headers }: { headers?: any }) => {
  return await graphQlApiHandler<
    {input: SearchProduct},
    {
      searchProducts: Query["searchProducts"];
    }
  >({
    query: /* GraphQL */ `
      query SearchProductsQuery($input: SearchProduct!) {
        searchProducts(input: $input) {
          message
          status
          products {
            id
            name
            description
            quantity
            price
            image_url
            seller_id
            created_at
          }
        }
      }
    `,
    variables: {
      input: {
        text
      },
    },
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
};

export const fetchOrderItemsForBuyer = async ({status}: FetchOrderItemsForBuyer, { headers }: { headers?: any }) => {
  return await graphQlApiHandler<
    {input: FetchOrderItemsForBuyer},
    {
      fetchOrderItemsForBuyer: Query["fetchOrderItemsForBuyer"];
    }
  >({
    query: /* GraphQL */ `
      query FetchOrderItemsForBuyerQuery($input: FetchOrderItemsForBuyer!) {
        fetchOrderItemsForBuyer(input: $input) {
          message
          status
          orders {
            id
            image_url
            name
            order_reference
            price
            address
            product_id
            quantity
            status
          }
        }
      }
    `,
    variables: {
      input: {
        status
      },
    },
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
};

export const fetchOrderItemsForSeller = async ({status}: FetchOrderItemsForSeller, { headers }: { headers?: any }) => {
  return await graphQlApiHandler<
    {input: FetchOrderItemsForSeller},
    {
      fetchOrderItemsForSeller: Query["fetchOrderItemsForSeller"];
    }
  >({
    query: /* GraphQL */ `
      query FetchOrderItemsForBuyerQuery($input: FetchOrderItemsForSeller!) {
        fetchOrderItemsForSeller(input: $input) {
          message
          status
          orders {
            id
            image_url
            name
            buyer_name
            order_reference
            price
            address
            product_id
            quantity
            status
          }
        }
      }
    `,
    variables: {
      input: {
        status
      },
    },
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
};

export const getAddresses = async ({ headers }: { headers?: any }) => {
  return await graphQlApiHandler<
    {},
    {
      getAddresses: Query["getAddresses"];
    }
  >({
    query: /* GraphQL */ `
      query GetAddressesQuery {
        getAddresses {
          message
          status
          addresses {
            id
            user_ref
            add1
            add2
            city
            postal_code
            created_at
            updated_at
          }
        }
      }
    `,
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
};