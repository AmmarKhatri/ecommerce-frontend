import { graphQlApiHandler } from "@/lib/helper";
import { Mutation, RegisterUser } from "@/types/graphql";

export const registerAccount = async ({
  email,
  password,
  role,
}: RegisterUser) => {
  return await graphQlApiHandler<
    {
      input: RegisterUser;
    },
    {
      RegisterAccount: Mutation["registerUser"];
    }
  >({
    query: /* GraphQL */ `
      mutation RegisterAccountMutation($input: RegisterUser!) {
        registerUser(input: $input){
          message
          status
        }
      }
    `,
    variables: {
      input: {
        email,
        password,
        role,
      },
    },
  });
};
