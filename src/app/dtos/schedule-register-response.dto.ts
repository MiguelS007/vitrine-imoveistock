import { AnnouncementGetResponseDto } from "./announcement-get-response.dto";
import { UserGetResponseDto } from "./user-get-response.dtos";

export class ScheduleRegisterResponseDto {
    _id: string;
    visitDate: Date;
    cancellationReason: string;
    status?: string;
    user?: UserGetResponseDto;
    announcement?: AnnouncementGetResponseDto;
}