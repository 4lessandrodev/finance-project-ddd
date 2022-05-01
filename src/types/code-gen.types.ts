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

export type AddReasonToBudgetBoxInput = {
  budgetBoxId: Scalars['String'];
  reasonDescription: Scalars['String'];
};

export type BalanceTransferenceInput = {
  attachment?: InputMaybe<Scalars['String']>;
  destinationBoxId: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  reason: Scalars['String'];
  sourceBoxId: Scalars['String'];
  total: Scalars['Float'];
};

export type BoxTransactionType = {
  __typename?: 'BoxTransactionType';
  attachment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  paymentDate: Scalars['DateTime'];
  reason: Scalars['String'];
  totalValue: CurrencyType;
  transactionCalculations: Array<TransactionCalculationType>;
  transactionStatus: TransactionStatusEnum;
  transactionType: TransactionTypeEnum;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
};

export enum BudgetBoxCurrencies {
  Brl = 'BRL',
  Eur = 'EUR',
  Jpy = 'JPY',
  Usd = 'USD'
}

export type BudgetBoxCurrencyType = {
  __typename?: 'BudgetBoxCurrencyType';
  currency: BudgetBoxCurrencies;
  value: Scalars['Float'];
};

export type BudgetBoxType = {
  __typename?: 'BudgetBoxType';
  balanceAvailable: BudgetBoxCurrencyType;
  budgetPercentage: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isPercentage: Scalars['Boolean'];
  reasons: Array<ReasonType>;
  updatedAt: Scalars['DateTime'];
};

export type ChangeBudgetBoxNameInput = {
  budgetBoxId: Scalars['String'];
  description: Scalars['String'];
};

export type ChangeBudgetBoxPercentageInput = {
  budgetBoxId: Scalars['String'];
  budgetPercentage: Scalars['Float'];
};

export type ChangeReasonDescriptionBoxInput = {
  budgetBoxId: Scalars['String'];
  reasonDescription: Scalars['String'];
  reasonId: Scalars['String'];
};

export type CreateBudgetBoxInput = {
  budgetPercentage: Scalars['Float'];
  description: Scalars['String'];
  isPercentage: Scalars['Boolean'];
};

export type CreateExpenseInput = {
  attachment?: InputMaybe<Scalars['String']>;
  budgetBoxId: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  paymentDate?: InputMaybe<Scalars['DateTime']>;
  reason: Scalars['String'];
  status: TransactionStatus;
  total: Scalars['Float'];
};

export type CurrencyType = {
  __typename?: 'CurrencyType';
  currency: TransactionCurrencies;
  value: Scalars['Float'];
};

export type DeleteBudgetBoxInput = {
  budgetBoxId: Scalars['String'];
};

export type DeleteUserAccountInput = {
  password: Scalars['String'];
};

export type GetBudgetBoxByIdInput = {
  budgetBoxId: Scalars['String'];
};

export type GetTransactionByIdInput = {
  transactionId: Scalars['String'];
};

export type JwtPayloadType = {
  __typename?: 'JwtPayloadType';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addReasonToBudgetBox: Scalars['Boolean'];
  changeBudgetName: Scalars['Boolean'];
  changeBudgetPercentage: Scalars['Boolean'];
  changeReasonDescription: Scalars['Boolean'];
  createBudgetBox: Scalars['Boolean'];
  createExpense: Scalars['Boolean'];
  deleteBudgetBox: Scalars['Boolean'];
  deleteUserAccount: Scalars['Boolean'];
  percentageCapitalInflowPosting: Scalars['Boolean'];
  postingToBenefit: Scalars['Boolean'];
  removeReasonFromBudgetBox: Scalars['Boolean'];
  signin: JwtPayloadType;
  signup: Scalars['Boolean'];
  transferBalance: Scalars['Boolean'];
};


export type MutationAddReasonToBudgetBoxArgs = {
  AddReasonToBudgetBoxInput: AddReasonToBudgetBoxInput;
};


export type MutationChangeBudgetNameArgs = {
  ChangeBudgetBoxNameInput: ChangeBudgetBoxNameInput;
};


export type MutationChangeBudgetPercentageArgs = {
  ChangeBudgetBoxPercentageInput: ChangeBudgetBoxPercentageInput;
};


export type MutationChangeReasonDescriptionArgs = {
  ChangeReasonDescriptionBoxInput: ChangeReasonDescriptionBoxInput;
};


export type MutationCreateBudgetBoxArgs = {
  CreateBudgetBoxInput: CreateBudgetBoxInput;
};


export type MutationCreateExpenseArgs = {
  CreateExpenseInput: CreateExpenseInput;
};


export type MutationDeleteBudgetBoxArgs = {
  DeleteBudgetBoxInput: DeleteBudgetBoxInput;
};


export type MutationDeleteUserAccountArgs = {
  DeleteUserAccountInput: DeleteUserAccountInput;
};


export type MutationPercentageCapitalInflowPostingArgs = {
  PercentageCapitalInflowPostingInput: PercentageCapitalInflowPostingInput;
};


export type MutationPostingToBenefitArgs = {
  PostingToBenefitInput: PostingToBenefitInput;
};


export type MutationRemoveReasonFromBudgetBoxArgs = {
  RemoveReasonFromBudgetBoxInput: RemoveReasonFromBudgetBoxInput;
};


export type MutationSigninArgs = {
  SigninInput: SigninInput;
};


export type MutationSignupArgs = {
  SignupInput: SignupInput;
};


export type MutationTransferBalanceArgs = {
  BalanceTransferenceInput: BalanceTransferenceInput;
};

export type PercentageCapitalInflowPostingInput = {
  attachment?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  paymentDate?: InputMaybe<Scalars['DateTime']>;
  reason: Scalars['String'];
  status: TransactionStatus;
  total: Scalars['Float'];
};

export type PostingToBenefitInput = {
  attachment?: InputMaybe<Scalars['String']>;
  budgetBoxId: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  paymentDate?: InputMaybe<Scalars['DateTime']>;
  reason: Scalars['String'];
  status: TransactionStatus;
  total: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getBudgetBoxById: BudgetBoxType;
  getBudgetBoxes: Array<BudgetBoxType>;
  getTransactionById: BoxTransactionType;
  getTransactions: Array<BoxTransactionType>;
  whoAmI?: Maybe<UserType>;
};


export type QueryGetBudgetBoxByIdArgs = {
  GetBudgetBoxByIdInput: GetBudgetBoxByIdInput;
};


export type QueryGetTransactionByIdArgs = {
  GetTransactionByIdInput: GetTransactionByIdInput;
};

export type ReasonType = {
  __typename?: 'ReasonType';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type RemoveReasonFromBudgetBoxInput = {
  budgetBoxId: Scalars['String'];
  reasonId: Scalars['String'];
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

export type TransactionCalculationType = {
  __typename?: 'TransactionCalculationType';
  budgetBoxId: Scalars['ID'];
  budgetBoxName: Scalars['String'];
  currency: CurrencyType;
};

export enum TransactionCurrencies {
  Brl = 'BRL',
  Eur = 'EUR',
  Jpy = 'JPY',
  Usd = 'USD'
}

export enum TransactionStatus {
  Concluido = 'CONCLUIDO',
  Pendente = 'PENDENTE'
}

export enum TransactionStatusEnum {
  Concluido = 'CONCLUIDO',
  Estornado = 'ESTORNADO',
  Pendente = 'PENDENTE'
}

export enum TransactionTypeEnum {
  Entrada = 'ENTRADA',
  Estorno = 'ESTORNO',
  Saida = 'SAIDA',
  Transferencia = 'TRANSFERENCIA'
}

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
  AddReasonToBudgetBoxInput: AddReasonToBudgetBoxInput;
  BalanceTransferenceInput: BalanceTransferenceInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BoxTransactionType: ResolverTypeWrapper<BoxTransactionType>;
  BudgetBoxCurrencies: BudgetBoxCurrencies;
  BudgetBoxCurrencyType: ResolverTypeWrapper<BudgetBoxCurrencyType>;
  BudgetBoxType: ResolverTypeWrapper<BudgetBoxType>;
  ChangeBudgetBoxNameInput: ChangeBudgetBoxNameInput;
  ChangeBudgetBoxPercentageInput: ChangeBudgetBoxPercentageInput;
  ChangeReasonDescriptionBoxInput: ChangeReasonDescriptionBoxInput;
  CreateBudgetBoxInput: CreateBudgetBoxInput;
  CreateExpenseInput: CreateExpenseInput;
  CurrencyType: ResolverTypeWrapper<CurrencyType>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteBudgetBoxInput: DeleteBudgetBoxInput;
  DeleteUserAccountInput: DeleteUserAccountInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GetBudgetBoxByIdInput: GetBudgetBoxByIdInput;
  GetTransactionByIdInput: GetTransactionByIdInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  JwtPayloadType: ResolverTypeWrapper<JwtPayloadType>;
  Mutation: ResolverTypeWrapper<{}>;
  PercentageCapitalInflowPostingInput: PercentageCapitalInflowPostingInput;
  PostingToBenefitInput: PostingToBenefitInput;
  Query: ResolverTypeWrapper<{}>;
  ReasonType: ResolverTypeWrapper<ReasonType>;
  RemoveReasonFromBudgetBoxInput: RemoveReasonFromBudgetBoxInput;
  SigninInput: SigninInput;
  SignupInput: SignupInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  TermType: ResolverTypeWrapper<TermType>;
  TransactionCalculationType: ResolverTypeWrapper<TransactionCalculationType>;
  TransactionCurrencies: TransactionCurrencies;
  TransactionStatus: TransactionStatus;
  TransactionStatusEnum: TransactionStatusEnum;
  TransactionTypeEnum: TransactionTypeEnum;
  UserAgentType: ResolverTypeWrapper<UserAgentType>;
  UserType: ResolverTypeWrapper<UserType>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddReasonToBudgetBoxInput: AddReasonToBudgetBoxInput;
  BalanceTransferenceInput: BalanceTransferenceInput;
  Boolean: Scalars['Boolean'];
  BoxTransactionType: BoxTransactionType;
  BudgetBoxCurrencyType: BudgetBoxCurrencyType;
  BudgetBoxType: BudgetBoxType;
  ChangeBudgetBoxNameInput: ChangeBudgetBoxNameInput;
  ChangeBudgetBoxPercentageInput: ChangeBudgetBoxPercentageInput;
  ChangeReasonDescriptionBoxInput: ChangeReasonDescriptionBoxInput;
  CreateBudgetBoxInput: CreateBudgetBoxInput;
  CreateExpenseInput: CreateExpenseInput;
  CurrencyType: CurrencyType;
  DateTime: Scalars['DateTime'];
  DeleteBudgetBoxInput: DeleteBudgetBoxInput;
  DeleteUserAccountInput: DeleteUserAccountInput;
  Float: Scalars['Float'];
  GetBudgetBoxByIdInput: GetBudgetBoxByIdInput;
  GetTransactionByIdInput: GetTransactionByIdInput;
  ID: Scalars['ID'];
  JwtPayloadType: JwtPayloadType;
  Mutation: {};
  PercentageCapitalInflowPostingInput: PercentageCapitalInflowPostingInput;
  PostingToBenefitInput: PostingToBenefitInput;
  Query: {};
  ReasonType: ReasonType;
  RemoveReasonFromBudgetBoxInput: RemoveReasonFromBudgetBoxInput;
  SigninInput: SigninInput;
  SignupInput: SignupInput;
  String: Scalars['String'];
  TermType: TermType;
  TransactionCalculationType: TransactionCalculationType;
  UserAgentType: UserAgentType;
  UserType: UserType;
};

export type BoxTransactionTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BoxTransactionType'] = ResolversParentTypes['BoxTransactionType']> = {
  attachment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalValue?: Resolver<ResolversTypes['CurrencyType'], ParentType, ContextType>;
  transactionCalculations?: Resolver<Array<ResolversTypes['TransactionCalculationType']>, ParentType, ContextType>;
  transactionStatus?: Resolver<ResolversTypes['TransactionStatusEnum'], ParentType, ContextType>;
  transactionType?: Resolver<ResolversTypes['TransactionTypeEnum'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BudgetBoxCurrencyTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BudgetBoxCurrencyType'] = ResolversParentTypes['BudgetBoxCurrencyType']> = {
  currency?: Resolver<ResolversTypes['BudgetBoxCurrencies'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BudgetBoxTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BudgetBoxType'] = ResolversParentTypes['BudgetBoxType']> = {
  balanceAvailable?: Resolver<ResolversTypes['BudgetBoxCurrencyType'], ParentType, ContextType>;
  budgetPercentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPercentage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reasons?: Resolver<Array<ResolversTypes['ReasonType']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrencyTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrencyType'] = ResolversParentTypes['CurrencyType']> = {
  currency?: Resolver<ResolversTypes['TransactionCurrencies'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
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
  addReasonToBudgetBox?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddReasonToBudgetBoxArgs, 'AddReasonToBudgetBoxInput'>>;
  changeBudgetName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangeBudgetNameArgs, 'ChangeBudgetBoxNameInput'>>;
  changeBudgetPercentage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangeBudgetPercentageArgs, 'ChangeBudgetBoxPercentageInput'>>;
  changeReasonDescription?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationChangeReasonDescriptionArgs, 'ChangeReasonDescriptionBoxInput'>>;
  createBudgetBox?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateBudgetBoxArgs, 'CreateBudgetBoxInput'>>;
  createExpense?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateExpenseArgs, 'CreateExpenseInput'>>;
  deleteBudgetBox?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteBudgetBoxArgs, 'DeleteBudgetBoxInput'>>;
  deleteUserAccount?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserAccountArgs, 'DeleteUserAccountInput'>>;
  percentageCapitalInflowPosting?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationPercentageCapitalInflowPostingArgs, 'PercentageCapitalInflowPostingInput'>>;
  postingToBenefit?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationPostingToBenefitArgs, 'PostingToBenefitInput'>>;
  removeReasonFromBudgetBox?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveReasonFromBudgetBoxArgs, 'RemoveReasonFromBudgetBoxInput'>>;
  signin?: Resolver<ResolversTypes['JwtPayloadType'], ParentType, ContextType, RequireFields<MutationSigninArgs, 'SigninInput'>>;
  signup?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'SignupInput'>>;
  transferBalance?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationTransferBalanceArgs, 'BalanceTransferenceInput'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getBudgetBoxById?: Resolver<ResolversTypes['BudgetBoxType'], ParentType, ContextType, RequireFields<QueryGetBudgetBoxByIdArgs, 'GetBudgetBoxByIdInput'>>;
  getBudgetBoxes?: Resolver<Array<ResolversTypes['BudgetBoxType']>, ParentType, ContextType>;
  getTransactionById?: Resolver<ResolversTypes['BoxTransactionType'], ParentType, ContextType, RequireFields<QueryGetTransactionByIdArgs, 'GetTransactionByIdInput'>>;
  getTransactions?: Resolver<Array<ResolversTypes['BoxTransactionType']>, ParentType, ContextType>;
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

export type TransactionCalculationTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionCalculationType'] = ResolversParentTypes['TransactionCalculationType']> = {
  budgetBoxId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  budgetBoxName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['CurrencyType'], ParentType, ContextType>;
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
  BoxTransactionType?: BoxTransactionTypeResolvers<ContextType>;
  BudgetBoxCurrencyType?: BudgetBoxCurrencyTypeResolvers<ContextType>;
  BudgetBoxType?: BudgetBoxTypeResolvers<ContextType>;
  CurrencyType?: CurrencyTypeResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JwtPayloadType?: JwtPayloadTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReasonType?: ReasonTypeResolvers<ContextType>;
  TermType?: TermTypeResolvers<ContextType>;
  TransactionCalculationType?: TransactionCalculationTypeResolvers<ContextType>;
  UserAgentType?: UserAgentTypeResolvers<ContextType>;
  UserType?: UserTypeResolvers<ContextType>;
};

