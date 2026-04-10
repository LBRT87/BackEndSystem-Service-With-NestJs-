import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDTO {
    @ApiProperty({example:'elbert@gmail.com'})
    @IsString()
    email:string
    @ApiProperty({example:'xxxxxxx'})
    @IsString()
    password:string
}