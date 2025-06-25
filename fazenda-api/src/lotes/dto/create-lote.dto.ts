import { IsNotEmpty, IsString } from "class-validator";

export class CreateLoteDto {
    @IsString()
    @IsNotEmpty()
    readonly categoria: string
}
