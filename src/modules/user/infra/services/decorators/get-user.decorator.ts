import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUserId = createParamDecorator((_data: any, ctx: ExecutionContext): string => {

	const context = GqlExecutionContext.create(ctx).getContext();

	const req = context.req;

	const userId = req?.user?.userId;

	return userId;
});
