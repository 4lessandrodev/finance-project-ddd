import { 
	ConflictException, 
	ForbiddenException, 
	InternalServerErrorException, 
	NotFoundException, 
	PreconditionFailedException, 
	UnauthorizedException, 
	UnprocessableEntityException,
	BadRequestException
} from '@nestjs/common';
import { Result } from "types-ddd";

export const CheckResultInterceptor = <T, F>(result: Result<T, F>): Result<T, F> => {

	if (result.isFailure) {
		switch(result.isFailure) {
		case result.statusCode === 'FORBIDDEN':
			throw new ForbiddenException(result.errorValue());
		case result.statusCode === 'CONFLICT':
			throw new ConflictException(result.errorValue());
		case result.statusCode === 'NOT_FOUND':
			throw new NotFoundException(result.errorValue());
		case result.statusCode === 'PRECONDITION_FAILED':
			throw new PreconditionFailedException(result.errorValue());
		case result.statusCode === 'UNAUTHORIZED':
			throw new UnauthorizedException(result.errorValue());
		case result.statusCode === 'UNPROCESSABLE_ENTITY':
			throw new UnprocessableEntityException(result.errorValue());
		case result.statusCode === 'NOT_MODIFIED':
			throw new BadRequestException(result.errorValue());
		case result.statusCode === 'USE_PROXY':
			throw new BadRequestException(result.errorValue());
		default:
			throw new InternalServerErrorException(result.errorValue());
		}
	}

	return result;
};

export default CheckResultInterceptor;
