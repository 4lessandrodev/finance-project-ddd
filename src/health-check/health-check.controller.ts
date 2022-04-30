import { Controller, Get } from "@nestjs/common";

@Controller('/')
export default class HealthCheckController {
	@Get('')
	async check (): Promise<any> {
		return {
			status: 'Ok',
			time: new Date(),
		}; 
	}
}
