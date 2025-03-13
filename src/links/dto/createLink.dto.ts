import { IsString, IsNotEmpty } from 'class-validator';
export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateLinkResponseDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
