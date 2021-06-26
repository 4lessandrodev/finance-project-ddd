import { SignUpDto } from '@app/user/use-cases/signup/signup.dto';
import { Injectable } from '@nestjs/common';
import { Result } from 'types-ddd';

@Injectable()
export class UserService {
	async signup (dto: SignUpDto): Promise<Result<void>> {
		console.log(dto);
		return Result.ok();
	}
}