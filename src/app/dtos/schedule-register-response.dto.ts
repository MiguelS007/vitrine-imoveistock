import { UserGetResponseDto } from "./user-get-response.dtos";

export class ScheduleRegisterResponseDto {
    _id: string;
    time: string;
    day: string;
    days: string;
    userId: string;
    announcement?: Announcement;
}
class Announcement {

    _id: string;

    typeOfAd: string;

    goal: string;

    status: string;

    propertyType: string;

    cityAddress: string;

    ufAddress: string;

    publicPlaceAddress: string;

    districtAddress: string;

    propertyCharacteristics: string;

    cepAddress: string;

    numberAddress: string;

    complementAddress: string;

    advertiser: UserGetResponseDto;

    propertyStatus: string;

    whoLivesInTheProperty?: string;

    usefulArea?: string;

    rooms?: number;

    bedrooms?: number;

    suites?: number;

    bathrooms?: number;

    propertyPosition?: string;

    yearOfConstruction?: string;

    appearanceOfTheProperty?: string;

    dateOfLastRenovation?: Date;

    whichFloorOfTheProperty?: number;

    numberOfTowers?: number;

    howManyFloors?: number;

    apartmentsPerrFloor?: number;

    elevatorsPerTower?: number;

    typeOfKeys?: string;

    keyLocation?: string;

    parkingSpaces?: number;

    howManyCovers?: number;

    typeOfVacancy?: string;

    vacancyLocation?: string;

    vacancyNumber?: string;

    description?: string;

    propertyPaidOff?: boolean;

    debitBalance?: string;

    relationshipWithTheProperty?: string;

    ownerName?: string;

    ownerCpf?: string;

    condominiumValue?: string;

    valueOfIptu?: string;

    additionalIptu?: boolean;

    howIsTheIptuPaid?: string;

    leaseValue?: string;

    saleValue?: string;

    commissionCheck?: boolean;

    exclusivity?: boolean;

    letterOfAttorneyDoc?: string;

    keysForPhotographer?: string;

    bestDayPhotos?: Date;

    whatIsTheBestTimePhotographer?: string;

    advertiserId: string;
}