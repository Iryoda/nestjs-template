import { ApiProperty } from '@nestjs/swagger';

export class LogInResponseDTO {
  @ApiProperty()
  token: string;
}
