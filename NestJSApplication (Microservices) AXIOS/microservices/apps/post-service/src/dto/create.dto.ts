import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, isString } from "class-validator";

export class CreateContent {
    @IsNumber()
    user:number

    @IsString()
    title:string

    @IsString()
    pathContent:string
    

}

            