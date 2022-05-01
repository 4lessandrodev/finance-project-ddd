import { Controller, Get, Ip } from "@nestjs/common";

@Controller('/health-check')
export default class HealthCheckController {
	@Get('/')
	async check (@Ip() ip: string): Promise<any> {
		return {
			status: 'Ok',
			time: new Date(),
			ip: ip
		}; 
	}
}
