import { getAuthToken } from "@/context/AuthStorage";
import { graphQlApiHandler } from "@/lib/helper";
import { AddUserInfo, LoginUser, Mutation, RegisterUser } from "@/types/graphql";

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
export const addUserInfo = async ({
  first_name,
  last_name,
  dob,
  phone_number
}: AddUserInfo, { headers }: { headers?: any }) => {
  return await graphQlApiHandler<
    {
      input: AddUserInfo;
    },
    {
      addUserInfo: Mutation["addUserInfo"];
    }
  >({
    query: /* GraphQL */ `
      mutation AddUserInfoMutation($input: AddUserInfo!) {
        addUserInfo(input: $input){
          message
          status
        }
      }
    `,
    variables: {
      input: {
        first_name,
        last_name,
        dob,
        phone_number
      },
    },
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
};

