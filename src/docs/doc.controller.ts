import { Controller, Get, Render } from "@nestjs/common";

@Controller('/doc')
export default class DocController {

	@Get('/')
	@Render('index')
	async handle (): Promise<any> {
		return { status: 'ok' };
	}

	@Get('/local')
	@Render('local')
	async localHandle (): Promise<any> {
		return { status: 'ok' };
	}

	@Get('/remote')
	@Render('remote')
	async remoteHandle (): Promise<any> {
		return { status: 'ok' };
	}
}
