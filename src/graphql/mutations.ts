import { getAuthToken } from "@/context/AuthStorage";
import { graphQlApiHandler } from "@/lib/helper";
import { AddUserInfo, LoginUser, Mutation, RegisterUser, EnlistProduct, DelistProduct, ChangeInventory, PlaceOrder, BuyerOrderItem, HandleOrder, GiveRating, AddAddress, RemoveAddress } from "@/types/graphql";

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

export const enlistProduct = async ({
  name,
  description,
  image_url,
  price,
  quantity
}: EnlistProduct, { headers }: { headers?: any }) => {
  return await graphQlApiHandler<
    {
      input: EnlistProduct;
    },
    {
      enlistProduct: Mutation["enlistProduct"];
    }
  >({
    query: /* GraphQL */ `
      mutation EnlistProductMutation($input: EnlistProduct!) {
        enlistProduct(input: $input){
          message
          status
        }
      }
    `,
    variables: {
      input: {
        name,
        description,
        image_url,
        price,
        quantity
      },
    },
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
};

export const delistProduct = async ({
  id
}: DelistProduct, { headers }: { headers?: any }) =>{
  return await graphQlApiHandler<
    {
      input: DelistProduct;
    },
    {
      delistProduct: Mutation["delistProduct"];
    }
  >({
    query: /* GraphQL */ `
      mutation EnlistProductMutation($input: DelistProduct!) {
        delistProduct(input: $input){
          message
          status
        }
      }
    `,
    variables: {
      input: {
        id,
      },
    },
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
}

export const changeInventory = async ({
  product_id,
  quantity
}: ChangeInventory, { headers }: { headers?: any }) =>{
  return await graphQlApiHandler<
    {
      input: ChangeInventory;
    },
    {
      changeInventory: Mutation["changeInventory"];
    }
  >({
    query: /* GraphQL */ `
      mutation EnlistProductMutation($input: ChangeInventory!) {
        changeInventory(input: $input){
          message
          status
        }
      }
    `,
    variables: {
      input: {
        product_id,
        quantity
      },
    },
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
}

export const createOrder = async ({
  address,
  cart
}: PlaceOrder, { headers }: { headers?: any }) =>{
  return await graphQlApiHandler<
    {
      input: PlaceOrder;
    },
    {
      placeOrder: Mutation["placeOrder"];
    }
  >({
    query: /* GraphQL */ `
      mutation PlaceOrderMutation($input: PlaceOrder!) {
        placeOrder(input: $input){
          message
          status
          order_reference
        }
      }
    `,
    variables: {
      input: {
        address,
        cart
      },
    },
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
}

export const handleOrder = async ({
  deliver,
  order_id,
  product_id,
  quantity
}: HandleOrder, { headers }: { headers?: any }) =>{
  return await graphQlApiHandler<
    {
      input: HandleOrder;
    },
    {
      handleOrder: Mutation["handleOrder"];
    }
  >({
    query: /* GraphQL */ `
      mutation HandleOrderMutation($input: HandleOrder!) {
        handleOrder(input: $input){
          message
          status
        }
      }
    `,
    variables: {
      input: {
        deliver,
        order_id,
        product_id,
        quantity
      },
    },
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
}

export const giveRating = async ({
  rating,
  order_id,
  product_id,
  comment
}: GiveRating, { headers }: { headers?: any }) =>{
  return await graphQlApiHandler<
    {
      input: GiveRating;
    },
    {
      giveRating: Mutation["giveRating"];
    }
  >({
    query: /* GraphQL */ `
      mutation GiveRatingMutation($input: GiveRating!) {
        giveRating(input: $input){
          message
          status
        }
      }
    `,
    variables: {
      input: {
        rating,
        order_id,
        product_id,
        comment
      },
    },
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
}

export const addAddress = async ({
  add1,
  add2,
  city,
  postal_code
}: AddAddress, { headers }: { headers?: any }) =>{
  return await graphQlApiHandler<
    {
      input: AddAddress;
    },
    {
      addAddress: Mutation["addAddress"];
    }
  >({
    query: /* GraphQL */ `
      mutation AddAddressMutation($input: AddAddress!) {
        addAddress(input: $input){
          message
          status
        }
      }
    `,
    variables: {
      input: {
        add1,
        add2,
        city,
        postal_code
      },
    },
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
}

export const removeAddress = async ({
  id
}: RemoveAddress, { headers }: { headers?: any }) =>{
  return await graphQlApiHandler<
    {
      input: RemoveAddress;
    },
    {
      removeAddress: Mutation["removeAddress"];
    }
  >({
    query: /* GraphQL */ `
      mutation RemoveAddressMutation($input: RemoveAddress!) {
        removeAddress(input: $input){
          message
          status
        }
      }
    `,
    variables: {
      input: {
        id
      },
    },
    headers:{
      'Authorization': "Bearer "+ getAuthToken(),
      ...headers,
    }
  });
}

