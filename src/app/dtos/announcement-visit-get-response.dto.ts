import { AnnouncementGetResponseDto } from "./announcement-get-response.dto";
import { UserGetResponseDto } from "./user-get-response.dtos";

export abstract class AnnouncementVisitGetResponseDto {
    _id:string;
    status:string;
    visitDate: Date;
    announcement:AnnouncementGetResponseDto;
    user:UserGetResponseDto;
    visitTypeOfAd?:string;
    user_broker?:UserGetResponseDto;
    userBrokerPartner?:UserGetResponseDto;
    cancellationReason?:string;
    companion?:Companion[];
  }
  interface Companion {
    _id:string;
    name:string;
    phone:string;
    degreeOfKinship:string;
  }