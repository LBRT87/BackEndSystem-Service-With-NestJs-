import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateContentDTO {
    @ApiProperty()
    @IsString()
    title:string
    
    @ApiProperty({type:'string',format:'binary'})
    file:any
    
}
