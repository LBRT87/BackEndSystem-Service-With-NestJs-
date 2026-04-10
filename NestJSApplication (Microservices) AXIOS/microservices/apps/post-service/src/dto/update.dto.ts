import { IsNumber, IsString } from "class-validator"

export class UpdateContent {
    @IsNumber()
    user:number

    @IsString()
    pathContent:string

    @IsString()
    title:string

    @IsNumber()
    idcontent:number
}
