import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUserIp = createParamDecorator((_data: any, ctx: ExecutionContext): string => {

	const context = GqlExecutionContext.create(ctx).getContext();

	const connection = context.req.connection;
	const headers = context.req.headers;

	const remoteIp = connection.remoteAddress;
	const forwardedIp = headers['x-forwarded-for'];

	const initialIp: string = remoteIp ?? forwardedIp;

	let ip = initialIp.replace(/[:]|[\s]|[f]/g, '');

	if (ip === '1') {
		ip = '127.0.0.1';
	}

	return ip;
});
