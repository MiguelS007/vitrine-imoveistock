import { UserGetResponseDto } from "./user-get-response.dtos";

export abstract class AnnouncementGetResponseDto {

    _id: string;

    typeOfAd: string;

    goal: string;

    liked?: boolean;

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

    whatWasRenovated?: WhatWasRenovated[];

    whichFloorOfTheProperty?: number;

    mainPhoto?: string;

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

    paymentMethods?: PaymentMethods[];

    documentsOwner: DocumentOwner[];

    commissionCheck?: boolean;

    exclusivity?: boolean;

    letterOfAttorneyDoc?: string;

    keysForPhotographer?: string;

    bestDayPhotos?: Date;

    whatIsTheBestTimePhotographer?: string;

    advertiserId: string;

    characteristicInfrastructureOfTheCondominium?: CharacteristicInfrastructureOfTheCondominiumModel;

    featureConveniences?: FeatureConveniencesModel;

    securityFeature?: SecurityFeatureModel;

    featureLeisure?: FeatureLeisureModel;

    featureSport?: FeatureSportModel;

    featureInfantile?: FeatureInfantileModel;

    latitude: string;
    
    longitude: string;
}

class CharacteristicInfrastructureOfTheCondominiumModel {

    acessibilidade: boolean;

    automacaoPredial: boolean;

    proximoAoMetro: boolean;

    acessoAsfaltado: boolean;

    coletaSeletiva: boolean;

    gestaoDeResiduos: boolean;

    aquecimentoCentral: boolean;

    economizadoresDeAgua: boolean;

    porteCochere: boolean;

    reaproveitamentoDeAgua: boolean;

    aquecimentoSolar: boolean;

    gasCentral: boolean;

    gerador: boolean;

    arCondicionadoCentral?: boolean;
}

class FeatureConveniencesModel {
    acessoParaDeficientes: boolean;

    bicicletario: boolean;

    casaDeCaseiro: boolean;

    centralDeEntregas: boolean;

    centralDeLimpezaEGovernanca: boolean;

    elevador: boolean;

    elevadorDeServico: boolean;

    heliponto: boolean;

    lavanderia: boolean;

    petCare: boolean;

    vagasDeVisitantes: boolean;

    proximoAoMetro: boolean;
}

class SecurityFeatureModel {
    acessoEletronico: boolean;

    camerasDeSeguranca: boolean;

    cercaEletrica: boolean;

    circuitoTvInterno: boolean;

    guaritaBlindada: boolean;

    interfone: boolean;

    portaoEletronico: boolean;

    portariaNoturna: boolean;

    portaria24h: boolean;

    rondaVigilancia: boolean;
}

class FeatureLeisureModel {
    barNaPiscina: boolean;

    bosque: boolean;

    churrasqueira: boolean;

    salaoDeFestas: boolean;

    piscina: boolean;

    cinema: boolean;

    coworking: boolean;

    espacoDeLeituras: boolean;

    espacoGourmet: boolean;

    espacoPet: boolean;

    espacoZen: boolean;

    fornoDePizza: boolean;

    garageBandDanceteria: boolean;

    miniGolf: boolean;

    ofuro: boolean;

    praca: boolean;

    redario: boolean;
}

class FeatureSportModel {
    bicicletario: boolean;

    fitnessAoArLivre: boolean;

    salaDeGinastica: boolean;

    muroEscalada: boolean;

    pistaDeCaminhada: boolean;

    gestaoDeResiduos: boolean;

    quadraDeFutebolDeSalao: boolean;

    quadraDeSquash: boolean;

    quadraDeTenis: boolean;

    quadraPoliesportiva: boolean;

    salaDeYoga: boolean;

    studioDePilates: boolean;

    vertuarios: boolean;

    reaproveitamentoDeAgua: boolean;
}

class FeatureInfantileModel {
    brinquedoteca: boolean;

    casaDaArvore: boolean;

    casaDeBoneca: boolean;

    piscinaInfantil: boolean;

    pistaDeCaminhada: boolean;

    playground: boolean;
}


class WhatWasRenovated {
    retired?: string;
}

class PaymentMethods {
    type?: string;
    value: number;
}

class DocumentOwner {
    documentName: string;
    documentKey: string;
}
