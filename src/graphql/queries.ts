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
          isOnboarded{
            message
            status
          }
        }
      `,
      headers:{
        'Authorization': "Bearer "+ getAuthToken(),
        ...headers,
      }
    });
  };