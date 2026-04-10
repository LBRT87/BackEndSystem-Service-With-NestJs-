import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateContentDTO {
    @ApiProperty()
    @IsNumber()
    idContent:number

    @ApiProperty()
    @IsString()
    title:string

    @ApiProperty({type:'file',format:'binary'})
    file:any
    
}