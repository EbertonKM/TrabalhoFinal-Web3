import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePiqueteDto {
    @IsString()
    @IsNotEmpty()
    readonly nome: string
    @IsString()
    @IsNotEmpty()
    readonly atividade: string
    @IsString()
    @IsNotEmpty()
    readonly cultivo: string
    @IsNumber()
    @IsNotEmpty()
    readonly loteId: number
}
