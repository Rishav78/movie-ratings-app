import { IsNumber, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

export class PostRating {
  @IsUUID("4")
  user!: string;

  @IsUUID()
  movie!: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  stars!: number;

  @IsOptional()
  @IsString()
  comment?: string;
}