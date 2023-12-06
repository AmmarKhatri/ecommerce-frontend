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

export interface EditUserInfo {
  dob?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
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
  editUserInfo: FetchUserPrivateInfoResponse;
  loginUser: LoginUserResponse;
  registerUser: RegisterUserResponse;
}


export interface MutationAddUserInfoArgs {
  input?: InputMaybe<AddUserInfo>;
}


export interface MutationEditUserInfoArgs {
  input?: InputMaybe<EditUserInfo>;
}


export interface MutationLoginUserArgs {
  input?: InputMaybe<LoginUser>;
}


export interface MutationRegisterUserArgs {
  input?: InputMaybe<RegisterUser>;
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

export interface PublicUserInfo {
  __typename?: 'PublicUserInfo';
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
}

export interface Query {
  __typename?: 'Query';
  fetchUserPrivateInfo: FetchUserPrivateInfoResponse;
  fetchUserPublicInfo: FetchUserPublicInfoResponse;
  isOnboarded: IsOnboardedResponse;
}


export interface QueryFetchUserPublicInfoArgs {
  input?: InputMaybe<FetchUserPublicInfo>;
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
  EditUserInfo: EditUserInfo;
  FetchUserPrivateInfoResponse: ResolverTypeWrapper<FetchUserPrivateInfoResponse>;
  FetchUserPublicInfo: FetchUserPublicInfo;
  FetchUserPublicInfoResponse: ResolverTypeWrapper<FetchUserPublicInfoResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginUser: LoginUser;
  LoginUserResponse: ResolverTypeWrapper<LoginUserResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  PrivateUserInfo: ResolverTypeWrapper<PrivateUserInfo>;
  PublicUserInfo: ResolverTypeWrapper<PublicUserInfo>;
  Query: ResolverTypeWrapper<{}>;
  RegisterUser: RegisterUser;
  RegisterUserResponse: ResolverTypeWrapper<RegisterUserResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  isOnboardedResponse: ResolverTypeWrapper<IsOnboardedResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddUserInfo: AddUserInfo;
  AddUserInfoResponse: AddUserInfoResponse;
  Boolean: Scalars['Boolean']['output'];
  EditUserInfo: EditUserInfo;
  FetchUserPrivateInfoResponse: FetchUserPrivateInfoResponse;
  FetchUserPublicInfo: FetchUserPublicInfo;
  FetchUserPublicInfoResponse: FetchUserPublicInfoResponse;
  Int: Scalars['Int']['output'];
  LoginUser: LoginUser;
  LoginUserResponse: LoginUserResponse;
  Mutation: {};
  PrivateUserInfo: PrivateUserInfo;
  PublicUserInfo: PublicUserInfo;
  Query: {};
  RegisterUser: RegisterUser;
  RegisterUserResponse: RegisterUserResponse;
  String: Scalars['String']['output'];
  isOnboardedResponse: IsOnboardedResponse;
};

export type AddUserInfoResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddUserInfoResponse'] = ResolversParentTypes['AddUserInfoResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  private_info?: Resolver<Maybe<ResolversTypes['PrivateUserInfo']>, ParentType, ContextType>;
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

export type LoginUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginUserResponse'] = ResolversParentTypes['LoginUserResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addUserInfo?: Resolver<ResolversTypes['AddUserInfoResponse'], ParentType, ContextType, Partial<MutationAddUserInfoArgs>>;
  editUserInfo?: Resolver<ResolversTypes['FetchUserPrivateInfoResponse'], ParentType, ContextType, Partial<MutationEditUserInfoArgs>>;
  loginUser?: Resolver<ResolversTypes['LoginUserResponse'], ParentType, ContextType, Partial<MutationLoginUserArgs>>;
  registerUser?: Resolver<ResolversTypes['RegisterUserResponse'], ParentType, ContextType, Partial<MutationRegisterUserArgs>>;
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

export type PublicUserInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicUserInfo'] = ResolversParentTypes['PublicUserInfo']> = {
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  fetchUserPrivateInfo?: Resolver<ResolversTypes['FetchUserPrivateInfoResponse'], ParentType, ContextType>;
  fetchUserPublicInfo?: Resolver<ResolversTypes['FetchUserPublicInfoResponse'], ParentType, ContextType, Partial<QueryFetchUserPublicInfoArgs>>;
  isOnboarded?: Resolver<ResolversTypes['isOnboardedResponse'], ParentType, ContextType>;
};

export type RegisterUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterUserResponse'] = ResolversParentTypes['RegisterUserResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IsOnboardedResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['isOnboardedResponse'] = ResolversParentTypes['isOnboardedResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AddUserInfoResponse?: AddUserInfoResponseResolvers<ContextType>;
  FetchUserPrivateInfoResponse?: FetchUserPrivateInfoResponseResolvers<ContextType>;
  FetchUserPublicInfoResponse?: FetchUserPublicInfoResponseResolvers<ContextType>;
  LoginUserResponse?: LoginUserResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PrivateUserInfo?: PrivateUserInfoResolvers<ContextType>;
  PublicUserInfo?: PublicUserInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterUserResponse?: RegisterUserResponseResolvers<ContextType>;
  isOnboardedResponse?: IsOnboardedResponseResolvers<ContextType>;
};

