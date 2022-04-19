import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type BudgetBoxType = {
  __typename?: 'BudgetBoxType';
  balanceAvailable: Scalars['Float'];
  budgetPercentage: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isPercentage: Scalars['Boolean'];
  reasons: Array<ReasonType>;
  updatedAt: Scalars['DateTime'];
};

export type CreateBudgetBoxInput = {
  budgetPercentage: Scalars['Float'];
  description: Scalars['String'];
  isPercentage: Scalars['Boolean'];
};

export type JwtPayloadType = {
  __typename?: 'JwtPayloadType';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBudgetBox: Scalars['Boolean'];
  signin: JwtPayloadType;
  signup: Scalars['Boolean'];
};


export type MutationCreateBudgetBoxArgs = {
  CreateBudgetBoxInput: CreateBudgetBoxInput;
};


export type MutationSigninArgs = {
  SigninInput: SigninInput;
};


export type MutationSignupArgs = {
  SignupInput: SignupInput;
};

export type Query = {
  __typename?: 'Query';
  getBudgetBoxes: Array<BudgetBoxType>;
  whoAmI?: Maybe<UserType>;
};

export type ReasonType = {
  __typename?: 'ReasonType';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type SigninInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupInput = {
  acceptedTerms: Scalars['Boolean'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type TermType = {
  __typename?: 'TermType';
  acceptedAt: Scalars['String'];
  ip: Scalars['String'];
  userAgent: UserAgentType;
};

export type UserAgentType = {
  __typename?: 'UserAgentType';
  name: Scalars['String'];
  os: Scalars['String'];
  type: Scalars['String'];
  version: Scalars['String'];
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String'];
  id: Scalars['ID'];
  terms?: Maybe<Array<TermType>>;
};



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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BudgetBoxType: ResolverTypeWrapper<BudgetBoxType>;
  CreateBudgetBoxInput: CreateBudgetBoxInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  JwtPayloadType: ResolverTypeWrapper<JwtPayloadType>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReasonType: ResolverTypeWrapper<ReasonType>;
  SigninInput: SigninInput;
  SignupInput: SignupInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  TermType: ResolverTypeWrapper<TermType>;
  UserAgentType: ResolverTypeWrapper<UserAgentType>;
  UserType: ResolverTypeWrapper<UserType>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  BudgetBoxType: BudgetBoxType;
  CreateBudgetBoxInput: CreateBudgetBoxInput;
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  JwtPayloadType: JwtPayloadType;
  Mutation: {};
  Query: {};
  ReasonType: ReasonType;
  SigninInput: SigninInput;
  SignupInput: SignupInput;
  String: Scalars['String'];
  TermType: TermType;
  UserAgentType: UserAgentType;
  UserType: UserType;
};

export type BudgetBoxTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BudgetBoxType'] = ResolversParentTypes['BudgetBoxType']> = {
  balanceAvailable?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  budgetPercentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPercentage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reasons?: Resolver<Array<ResolversTypes['ReasonType']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type JwtPayloadTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['JwtPayloadType'] = ResolversParentTypes['JwtPayloadType']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBudgetBox?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateBudgetBoxArgs, 'CreateBudgetBoxInput'>>;
  signin?: Resolver<ResolversTypes['JwtPayloadType'], ParentType, ContextType, RequireFields<MutationSigninArgs, 'SigninInput'>>;
  signup?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'SignupInput'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getBudgetBoxes?: Resolver<Array<ResolversTypes['BudgetBoxType']>, ParentType, ContextType>;
  whoAmI?: Resolver<Maybe<ResolversTypes['UserType']>, ParentType, ContextType>;
};

export type ReasonTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReasonType'] = ResolversParentTypes['ReasonType']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TermTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TermType'] = ResolversParentTypes['TermType']> = {
  acceptedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userAgent?: Resolver<ResolversTypes['UserAgentType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAgentTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAgentType'] = ResolversParentTypes['UserAgentType']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  os?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserType'] = ResolversParentTypes['UserType']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  terms?: Resolver<Maybe<Array<ResolversTypes['TermType']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BudgetBoxType?: BudgetBoxTypeResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JwtPayloadType?: JwtPayloadTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReasonType?: ReasonTypeResolvers<ContextType>;
  TermType?: TermTypeResolvers<ContextType>;
  UserAgentType?: UserAgentTypeResolvers<ContextType>;
  UserType?: UserTypeResolvers<ContextType>;
};

