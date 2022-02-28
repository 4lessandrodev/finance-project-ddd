import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

interface IRequest extends Request {
	user?: { userId?: string }
}

export const GetUserId = createParamDecorator((_data: any, ctx: ExecutionContext): string => {

	const context = GqlExecutionContext.create(ctx).getContext();

	const req: IRequest = context.req;

	const userId = String(req.user?.userId);

	return userId;
});
