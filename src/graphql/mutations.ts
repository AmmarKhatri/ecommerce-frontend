import { graphQlApiHandler } from "@/lib/helper";
import { LoginUser, Mutation, RegisterUser } from "@/types/graphql";

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
      registerUser: Mutation["registerUser"];
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

export const loginUser = async ({
  email,
  password,
}: LoginUser) => {
  return await graphQlApiHandler<
    {
      input: LoginUser;
    },
    {
      loginUser: Mutation["loginUser"];
    }
  >({
    query: /* GraphQL */ `
      mutation LoginUserMutation($input: LoginUser!) {
        loginUser(input: $input){
          message
          status
          token
        }
      }
    `,
    variables: {
      input: {
        email,
        password,
      },
    },
  });
};

