export abstract class AnnouncementFilterListResponseDto {
    typeOfAdd: string;

    propertyType?: string[];

    ufAddress?: string;

    cityAddress?: string;

    goal?: string;

    initialValue?: number;

    finalValue?: number;

    bedrooms?: number;

    bathrooms?: number;

    parkingSpaces?: number;

    yearOfConstruction?: string;

    initialUsefulArea?: number;

    finalUsefulArea?: number;
}