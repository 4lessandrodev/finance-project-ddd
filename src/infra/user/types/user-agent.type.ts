import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IOs, systemTypes } from "@domain/user/value-objects";

registerEnumType(IOs, {
	name: 'IOs'
}) 


@ObjectType()
export class UserAgentType{
	@Field(()=> String)
	name!: string;

	@Field(()=> String)
	version!: string;

	@Field(()=> IOs)
	os!: systemTypes;

	@Field(()=> String)
	type!: string;
}