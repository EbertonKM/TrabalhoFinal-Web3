import { PartialType } from '@nestjs/mapped-types';
import { CreatePiqueteDto } from './create-piquete.dto';

export class UpdatePiqueteDto extends PartialType(CreatePiqueteDto) {}
