import { IsNumber } from "class-validator";

export class DeleteContent {
    @IsNumber() 
    userid:number
    @IsNumber()
    idcontent:number
}