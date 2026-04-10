import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RegistrationUserDTO {
    @ApiProperty({example:'Nar26-2'})
    @IsString()
    email:string

    @ApiProperty({example:'Nar26-2Nar26-2Nar26-2'})
    @IsString()
    password:string
}