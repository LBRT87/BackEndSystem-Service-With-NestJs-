import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class GetContentByIDDTO {
    @ApiProperty()
    @IsNumber()
    id:number
}