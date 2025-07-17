import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator"

export class CreateAnimalDto {
    @IsString()
    @IsNotEmpty()
    readonly identificador: string

    @IsOptional()
    @IsString()
    readonly raca?: string

    @IsOptional()
    @IsString()
    readonly peso?: string

    @IsOptional()
    @IsString()
    readonly sexo?: string

    @IsOptional()
    @IsNumber()
    readonly loteId?: number
}