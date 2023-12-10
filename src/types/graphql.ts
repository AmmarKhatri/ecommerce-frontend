import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
}

export interface AddUserInfo {
  dob: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  phone_number: Scalars['String']['input'];
}

export interface AddUserInfoResponse {
  __typename?: 'AddUserInfoResponse';
  message: Scalars['String']['output'];
  private_info?: Maybe<PrivateUserInfo>;
  status: Scalars['Int']['output'];
}

export interface BuyerOrderItem {
  __typename?: 'BuyerOrderItem';
  id: Scalars['Int']['output'];
  image_url: Scalars['String']['output'];
  name: Scalars['String']['output'];
  order_reference: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  product_id: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  status: Scalars['String']['output'];
}

export interface ChangeInventory {
  product_id: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
}

export interface ChangeInventoryResponse {
  __typename?: 'ChangeInventoryResponse';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
}

export interface DelistProduct {
  id: Scalars['Int']['input'];
}

export interface DelistProductResponse {
  __typename?: 'DelistProductResponse';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
}

export interface EditUserInfo {
  dob?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
}

export interface EnlistProduct {
  description: Scalars['String']['input'];
  image_url: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Int']['input'];
}

export interface EnlistProductResponse {
  __typename?: 'EnlistProductResponse';
  message: Scalars['String']['output'];
  product?: Maybe<Product>;
  status: Scalars['Int']['output'];
}

export interface FetchOrderItemsForBuyer {
  status: Scalars['String']['input'];
}

export interface FetchOrderItemsForBuyerResponse {
  __typename?: 'FetchOrderItemsForBuyerResponse';
  message: Scalars['String']['output'];
  orders?: Maybe<Array<BuyerOrderItem>>;
  status: Scalars['Int']['output'];
}

export interface FetchOrderItemsForSeller {
  status: Scalars['String']['input'];
}

export interface FetchOrderItemsForSellerResponse {
  __typename?: 'FetchOrderItemsForSellerResponse';
  message: Scalars['String']['output'];
  orders?: Maybe<Array<SellerOrderItem>>;
  status: Scalars['Int']['output'];
}

export interface FetchUserPrivateInfoResponse {
  __typename?: 'FetchUserPrivateInfoResponse';
  message: Scalars['String']['output'];
  private_info?: Maybe<PrivateUserInfo>;
  status: Scalars['Int']['output'];
}

export interface FetchUserPublicInfo {
  user_id: Scalars['Int']['input'];
}

export interface FetchUserPublicInfoResponse {
  __typename?: 'FetchUserPublicInfoResponse';
  message: Scalars['String']['output'];
  public_info?: Maybe<PublicUserInfo>;
  status: Scalars['Int']['output'];
}

export interface GetEnlistedProductsResponse {
  __typename?: 'GetEnlistedProductsResponse';
  message: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
  status: Scalars['Int']['output'];
}

export interface HandleOrder {
  deliver: Scalars['Boolean']['input'];
  order_id: Scalars['Int']['input'];
  product_id: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
}

export interface HandleOrderResponse {
  __typename?: 'HandleOrderResponse';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
}

export interface LoginUser {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}

export interface LoginUserResponse {
  __typename?: 'LoginUserResponse';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
  token?: Maybe<Scalars['String']['output']>;
}

export interface Mutation {
  __typename?: 'Mutation';
  addUserInfo: AddUserInfoResponse;
  changeInventory: ChangeInventoryResponse;
  delistProduct: DelistProductResponse;
  editUserInfo: FetchUserPrivateInfoResponse;
  enlistProduct: EnlistProductResponse;
  handleOrder: HandleOrderResponse;
  loginUser: LoginUserResponse;
  placeOrder: PlaceOrderResponse;
  registerUser: RegisterUserResponse;
}


export interface MutationAddUserInfoArgs {
  input?: InputMaybe<AddUserInfo>;
}


export interface MutationChangeInventoryArgs {
  input?: InputMaybe<ChangeInventory>;
}


export interface MutationDelistProductArgs {
  input?: InputMaybe<DelistProduct>;
}


export interface MutationEditUserInfoArgs {
  input?: InputMaybe<EditUserInfo>;
}


export interface MutationEnlistProductArgs {
  input?: InputMaybe<EnlistProduct>;
}


export interface MutationHandleOrderArgs {
  input?: InputMaybe<HandleOrder>;
}


export interface MutationLoginUserArgs {
  input?: InputMaybe<LoginUser>;
}


export interface MutationPlaceOrderArgs {
  input?: InputMaybe<PlaceOrder>;
}


export interface MutationRegisterUserArgs {
  input?: InputMaybe<RegisterUser>;
}

export interface PlaceOrder {
  cart: Array<Array<InputMaybe<Scalars['Int']['input']>>>;
}

export interface PlaceOrderResponse {
  __typename?: 'PlaceOrderResponse';
  message: Scalars['String']['output'];
  order_reference?: Maybe<Scalars['Int']['output']>;
  status: Scalars['Int']['output'];
}

export interface PrivateUserInfo {
  __typename?: 'PrivateUserInfo';
  dob?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  onboard: Scalars['Boolean']['output'];
  phone_number?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
}

export interface Product {
  __typename?: 'Product';
  created_at: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image_url: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  quantity: Scalars['Int']['output'];
  seller_id: Scalars['Int']['output'];
  updated_at: Scalars['String']['output'];
}

export interface PublicUserInfo {
  __typename?: 'PublicUserInfo';
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
}

export interface Query {
  __typename?: 'Query';
  fetchOrderItemsForBuyer: FetchOrderItemsForBuyerResponse;
  fetchOrderItemsForSeller: FetchOrderItemsForSellerResponse;
  fetchProducts: TrendingLatestProducts;
  fetchUserPrivateInfo: FetchUserPrivateInfoResponse;
  fetchUserPublicInfo: FetchUserPublicInfoResponse;
  getEnlistedProducts: GetEnlistedProductsResponse;
  isOnboarded: IsOnboardedResponse;
  searchProducts: SearchProductResponse;
}


export interface QueryFetchOrderItemsForBuyerArgs {
  input?: InputMaybe<FetchOrderItemsForBuyer>;
}


export interface QueryFetchOrderItemsForSellerArgs {
  input?: InputMaybe<FetchOrderItemsForSeller>;
}


export interface QueryFetchUserPublicInfoArgs {
  input?: InputMaybe<FetchUserPublicInfo>;
}


export interface QuerySearchProductsArgs {
  input?: InputMaybe<SearchProduct>;
}

export interface RegisterUser {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
}

export interface RegisterUserResponse {
  __typename?: 'RegisterUserResponse';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
}

export interface SearchProduct {
  text: Scalars['String']['input'];
}

export interface SearchProductResponse {
  __typename?: 'SearchProductResponse';
  message: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
  status: Scalars['Int']['output'];
}

export interface SellerOrderItem {
  __typename?: 'SellerOrderItem';
  buyer_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image_url: Scalars['String']['output'];
  name: Scalars['String']['output'];
  order_reference: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  product_id: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  status: Scalars['String']['output'];
}

export interface TrendingLatestProducts {
  __typename?: 'TrendingLatestProducts';
  latest?: Maybe<Array<Product>>;
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
  trending?: Maybe<Array<Product>>;
}

export interface IsOnboardedResponse {
  __typename?: 'isOnboardedResponse';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddUserInfo: AddUserInfo;
  AddUserInfoResponse: ResolverTypeWrapper<AddUserInfoResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BuyerOrderItem: ResolverTypeWrapper<BuyerOrderItem>;
  ChangeInventory: ChangeInventory;
  ChangeInventoryResponse: ResolverTypeWrapper<ChangeInventoryResponse>;
  DelistProduct: DelistProduct;
  DelistProductResponse: ResolverTypeWrapper<DelistProductResponse>;
  EditUserInfo: EditUserInfo;
  EnlistProduct: EnlistProduct;
  EnlistProductResponse: ResolverTypeWrapper<EnlistProductResponse>;
  FetchOrderItemsForBuyer: FetchOrderItemsForBuyer;
  FetchOrderItemsForBuyerResponse: ResolverTypeWrapper<FetchOrderItemsForBuyerResponse>;
  FetchOrderItemsForSeller: FetchOrderItemsForSeller;
  FetchOrderItemsForSellerResponse: ResolverTypeWrapper<FetchOrderItemsForSellerResponse>;
  FetchUserPrivateInfoResponse: ResolverTypeWrapper<FetchUserPrivateInfoResponse>;
  FetchUserPublicInfo: FetchUserPublicInfo;
  FetchUserPublicInfoResponse: ResolverTypeWrapper<FetchUserPublicInfoResponse>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GetEnlistedProductsResponse: ResolverTypeWrapper<GetEnlistedProductsResponse>;
  HandleOrder: HandleOrder;
  HandleOrderResponse: ResolverTypeWrapper<HandleOrderResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginUser: LoginUser;
  LoginUserResponse: ResolverTypeWrapper<LoginUserResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  PlaceOrder: PlaceOrder;
  PlaceOrderResponse: ResolverTypeWrapper<PlaceOrderResponse>;
  PrivateUserInfo: ResolverTypeWrapper<PrivateUserInfo>;
  Product: ResolverTypeWrapper<Product>;
  PublicUserInfo: ResolverTypeWrapper<PublicUserInfo>;
  Query: ResolverTypeWrapper<{}>;
  RegisterUser: RegisterUser;
  RegisterUserResponse: ResolverTypeWrapper<RegisterUserResponse>;
  SearchProduct: SearchProduct;
  SearchProductResponse: ResolverTypeWrapper<SearchProductResponse>;
  SellerOrderItem: ResolverTypeWrapper<SellerOrderItem>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TrendingLatestProducts: ResolverTypeWrapper<TrendingLatestProducts>;
  isOnboardedResponse: ResolverTypeWrapper<IsOnboardedResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddUserInfo: AddUserInfo;
  AddUserInfoResponse: AddUserInfoResponse;
  Boolean: Scalars['Boolean']['output'];
  BuyerOrderItem: BuyerOrderItem;
  ChangeInventory: ChangeInventory;
  ChangeInventoryResponse: ChangeInventoryResponse;
  DelistProduct: DelistProduct;
  DelistProductResponse: DelistProductResponse;
  EditUserInfo: EditUserInfo;
  EnlistProduct: EnlistProduct;
  EnlistProductResponse: EnlistProductResponse;
  FetchOrderItemsForBuyer: FetchOrderItemsForBuyer;
  FetchOrderItemsForBuyerResponse: FetchOrderItemsForBuyerResponse;
  FetchOrderItemsForSeller: FetchOrderItemsForSeller;
  FetchOrderItemsForSellerResponse: FetchOrderItemsForSellerResponse;
  FetchUserPrivateInfoResponse: FetchUserPrivateInfoResponse;
  FetchUserPublicInfo: FetchUserPublicInfo;
  FetchUserPublicInfoResponse: FetchUserPublicInfoResponse;
  Float: Scalars['Float']['output'];
  GetEnlistedProductsResponse: GetEnlistedProductsResponse;
  HandleOrder: HandleOrder;
  HandleOrderResponse: HandleOrderResponse;
  Int: Scalars['Int']['output'];
  LoginUser: LoginUser;
  LoginUserResponse: LoginUserResponse;
  Mutation: {};
  PlaceOrder: PlaceOrder;
  PlaceOrderResponse: PlaceOrderResponse;
  PrivateUserInfo: PrivateUserInfo;
  Product: Product;
  PublicUserInfo: PublicUserInfo;
  Query: {};
  RegisterUser: RegisterUser;
  RegisterUserResponse: RegisterUserResponse;
  SearchProduct: SearchProduct;
  SearchProductResponse: SearchProductResponse;
  SellerOrderItem: SellerOrderItem;
  String: Scalars['String']['output'];
  TrendingLatestProducts: TrendingLatestProducts;
  isOnboardedResponse: IsOnboardedResponse;
};

export type AddUserInfoResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddUserInfoResponse'] = ResolversParentTypes['AddUserInfoResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  private_info?: Resolver<Maybe<ResolversTypes['PrivateUserInfo']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BuyerOrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['BuyerOrderItem'] = ResolversParentTypes['BuyerOrderItem']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order_reference?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeInventoryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeInventoryResponse'] = ResolversParentTypes['ChangeInventoryResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DelistProductResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DelistProductResponse'] = ResolversParentTypes['DelistProductResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnlistProductResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnlistProductResponse'] = ResolversParentTypes['EnlistProductResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FetchOrderItemsForBuyerResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FetchOrderItemsForBuyerResponse'] = ResolversParentTypes['FetchOrderItemsForBuyerResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<ResolversTypes['BuyerOrderItem']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FetchOrderItemsForSellerResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FetchOrderItemsForSellerResponse'] = ResolversParentTypes['FetchOrderItemsForSellerResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<ResolversTypes['SellerOrderItem']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FetchUserPrivateInfoResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FetchUserPrivateInfoResponse'] = ResolversParentTypes['FetchUserPrivateInfoResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  private_info?: Resolver<Maybe<ResolversTypes['PrivateUserInfo']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FetchUserPublicInfoResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FetchUserPublicInfoResponse'] = ResolversParentTypes['FetchUserPublicInfoResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  public_info?: Resolver<Maybe<ResolversTypes['PublicUserInfo']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetEnlistedProductsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetEnlistedProductsResponse'] = ResolversParentTypes['GetEnlistedProductsResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HandleOrderResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['HandleOrderResponse'] = ResolversParentTypes['HandleOrderResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginUserResponse'] = ResolversParentTypes['LoginUserResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addUserInfo?: Resolver<ResolversTypes['AddUserInfoResponse'], ParentType, ContextType, Partial<MutationAddUserInfoArgs>>;
  changeInventory?: Resolver<ResolversTypes['ChangeInventoryResponse'], ParentType, ContextType, Partial<MutationChangeInventoryArgs>>;
  delistProduct?: Resolver<ResolversTypes['DelistProductResponse'], ParentType, ContextType, Partial<MutationDelistProductArgs>>;
  editUserInfo?: Resolver<ResolversTypes['FetchUserPrivateInfoResponse'], ParentType, ContextType, Partial<MutationEditUserInfoArgs>>;
  enlistProduct?: Resolver<ResolversTypes['EnlistProductResponse'], ParentType, ContextType, Partial<MutationEnlistProductArgs>>;
  handleOrder?: Resolver<ResolversTypes['HandleOrderResponse'], ParentType, ContextType, Partial<MutationHandleOrderArgs>>;
  loginUser?: Resolver<ResolversTypes['LoginUserResponse'], ParentType, ContextType, Partial<MutationLoginUserArgs>>;
  placeOrder?: Resolver<ResolversTypes['PlaceOrderResponse'], ParentType, ContextType, Partial<MutationPlaceOrderArgs>>;
  registerUser?: Resolver<ResolversTypes['RegisterUserResponse'], ParentType, ContextType, Partial<MutationRegisterUserArgs>>;
};

export type PlaceOrderResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlaceOrderResponse'] = ResolversParentTypes['PlaceOrderResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order_reference?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrivateUserInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PrivateUserInfo'] = ResolversParentTypes['PrivateUserInfo']> = {
  dob?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  onboard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  phone_number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seller_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicUserInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicUserInfo'] = ResolversParentTypes['PublicUserInfo']> = {
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  fetchOrderItemsForBuyer?: Resolver<ResolversTypes['FetchOrderItemsForBuyerResponse'], ParentType, ContextType, Partial<QueryFetchOrderItemsForBuyerArgs>>;
  fetchOrderItemsForSeller?: Resolver<ResolversTypes['FetchOrderItemsForSellerResponse'], ParentType, ContextType, Partial<QueryFetchOrderItemsForSellerArgs>>;
  fetchProducts?: Resolver<ResolversTypes['TrendingLatestProducts'], ParentType, ContextType>;
  fetchUserPrivateInfo?: Resolver<ResolversTypes['FetchUserPrivateInfoResponse'], ParentType, ContextType>;
  fetchUserPublicInfo?: Resolver<ResolversTypes['FetchUserPublicInfoResponse'], ParentType, ContextType, Partial<QueryFetchUserPublicInfoArgs>>;
  getEnlistedProducts?: Resolver<ResolversTypes['GetEnlistedProductsResponse'], ParentType, ContextType>;
  isOnboarded?: Resolver<ResolversTypes['isOnboardedResponse'], ParentType, ContextType>;
  searchProducts?: Resolver<ResolversTypes['SearchProductResponse'], ParentType, ContextType, Partial<QuerySearchProductsArgs>>;
};

export type RegisterUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterUserResponse'] = ResolversParentTypes['RegisterUserResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchProductResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchProductResponse'] = ResolversParentTypes['SearchProductResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SellerOrderItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['SellerOrderItem'] = ResolversParentTypes['SellerOrderItem']> = {
  buyer_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order_reference?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrendingLatestProductsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TrendingLatestProducts'] = ResolversParentTypes['TrendingLatestProducts']> = {
  latest?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trending?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IsOnboardedResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['isOnboardedResponse'] = ResolversParentTypes['isOnboardedResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AddUserInfoResponse?: AddUserInfoResponseResolvers<ContextType>;
  BuyerOrderItem?: BuyerOrderItemResolvers<ContextType>;
  ChangeInventoryResponse?: ChangeInventoryResponseResolvers<ContextType>;
  DelistProductResponse?: DelistProductResponseResolvers<ContextType>;
  EnlistProductResponse?: EnlistProductResponseResolvers<ContextType>;
  FetchOrderItemsForBuyerResponse?: FetchOrderItemsForBuyerResponseResolvers<ContextType>;
  FetchOrderItemsForSellerResponse?: FetchOrderItemsForSellerResponseResolvers<ContextType>;
  FetchUserPrivateInfoResponse?: FetchUserPrivateInfoResponseResolvers<ContextType>;
  FetchUserPublicInfoResponse?: FetchUserPublicInfoResponseResolvers<ContextType>;
  GetEnlistedProductsResponse?: GetEnlistedProductsResponseResolvers<ContextType>;
  HandleOrderResponse?: HandleOrderResponseResolvers<ContextType>;
  LoginUserResponse?: LoginUserResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PlaceOrderResponse?: PlaceOrderResponseResolvers<ContextType>;
  PrivateUserInfo?: PrivateUserInfoResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  PublicUserInfo?: PublicUserInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterUserResponse?: RegisterUserResponseResolvers<ContextType>;
  SearchProductResponse?: SearchProductResponseResolvers<ContextType>;
  SellerOrderItem?: SellerOrderItemResolvers<ContextType>;
  TrendingLatestProducts?: TrendingLatestProductsResolvers<ContextType>;
  isOnboardedResponse?: IsOnboardedResponseResolvers<ContextType>;
};

