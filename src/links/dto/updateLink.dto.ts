import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateLinkDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
