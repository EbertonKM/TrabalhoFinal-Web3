import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateAnimalDto {
    @IsString()
    @IsNotEmpty()
    readonly identificador: string
    @IsString()
    readonly raça: string
    @IsDate()
    readonly nascimento: Date
    @IsString()
    readonly peso: string
    @IsString()
    readonly sexo: string
    @IsString()
    readonly estagioDeVida: string
    @IsNumber()
    @IsNotEmpty()
    readonly loteId: number
}
