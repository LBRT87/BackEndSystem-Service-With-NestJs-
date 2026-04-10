import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RegistDTO {
    @ApiProperty({example:'elbert@gmail.com'})
    @IsString()
    email:string
    @ApiProperty({example:'akuaku'})
    @IsString()
    password:string
}