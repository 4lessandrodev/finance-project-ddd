import { Module } from "@nestjs/common";
import DocController from "./doc.controller";

@Module({
	controllers:[DocController]
})
export class DocModule { }
