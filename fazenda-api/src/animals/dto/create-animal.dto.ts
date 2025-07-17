import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateAnimalDto {
    @IsString()
    @IsNotEmpty()
    readonly identificador: string
    @IsString()
    readonly raça: string
    @IsString()
    readonly peso: string
    @IsString()
    readonly sexo: string
    @IsNumber()
    @IsNotEmpty()
    readonly loteId: number
}
