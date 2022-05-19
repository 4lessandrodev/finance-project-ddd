import { Controller, Get, Render } from "@nestjs/common";

@Controller('/doc')
export default class DocController {

	@Get('/')
	@Render('index')
	async handle (): Promise<any> {
		return { status: 'ok' };
	}
}
