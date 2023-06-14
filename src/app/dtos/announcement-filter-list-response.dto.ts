export abstract class AnnouncementFilterListResponseDto {
    typeOfAdd: string;

    propertyType?: string[];

    ufAddress?: string;

    cityAddress?: string;

    districtAddress?:string[];

    goal?: string;

    initialValue?: number;

    finalValue?: number;

    bedrooms?: number;

    suites?: number;

    bathrooms?: number;

    parkingSpaces?: number;

    yearOfConstruction?: string;

    initialUsefulArea?: number;

    finalUsefulArea?: number;

    propertyTypeList?: ListDisplay[];

    page?: number;

}

class ListDisplay {
    item_id: string;
    item_text: string;
}
