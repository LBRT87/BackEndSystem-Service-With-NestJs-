import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DeleteContentDTO {
    @ApiProperty()
    @IsNumber()
    idcontent:number
}