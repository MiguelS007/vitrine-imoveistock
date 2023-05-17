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

    featureRoof?: FeatureRoofModel;

    featureInfraCom?: FeatureInfraComModel;

    featureFloor?: FeatureFloorModel;

    featureFicaImovel?: FeatureFicaImovelModel;

    featureDifferential?: FeatureDifferentialModel;

    featureSportCom?: FeatureSportComModel;

    featureFicaImovelCom?: FeatureFicaImovelComModel;

    featureRoofCom?: FeatureRoofComModel;

    featureFloorCom?: FeatureFloorComModel;

    featureCharacteristic?: FeatureCharacteristicModel;

    featureSecurityCom?: FeatureSecurityComModel;

    featureConveniencesCom?: FeatureConveniencesComModel;

    featureProperty?: FeaturePropertyModel;

    latitude: string;

    longitude: string;

    photos?: Photos[];

    videos: Videos[];

    conciergeOpeningHours?: string;

    petsAccepted: boolean;
}

class Videos {
    key: string;
    main: boolean;
    notShow: boolean;
    index: number
    updatedAt
    _id
}
class Photos {
    key: string;
    main: boolean;
    notShow: boolean;
    index: number
    updatedAt
    _id
}

class FeatureDifferentialModel {
    permiteAdicionar: boolean;
    acessoriosBanheiros: boolean;
    acusticaLajes: boolean;
    aguaIndividual: boolean;
    aquecimentoPiso: boolean;
    banheiraHidromassagem: boolean;
    desembacadorEspelhos: boolean;
    esperaSplit: boolean;
    esquadriasImportadas: boolean;
    portasBlindadas: boolean;
    exaustorChurras: boolean;
    hidromassagemVertical: boolean;
    portasLaqueadas: boolean;
    preparadoAutomacao: boolean;
    vidrosDuplos: boolean;
}

class FeaturePropertyModel {
    adega: boolean;

    areaDeServico: boolean;

    banheira: boolean;

    bar: boolean;

    canil: boolean;

    churrasqueiraPrivativa: boolean;

    closet: boolean;

    copa: boolean;

    cozinhaAmericana: boolean;

    cozinhaGourmet: boolean;

    deck: boolean;

    dependenciaDeEmpregados: boolean;

    depositoNoSubsolo: boolean;

    despensa: boolean;

    entradaDeServico: boolean;

    entradaLateral: boolean;

    escritorio: boolean;

    frenteParaMar: boolean;

    geminada: boolean;

    jardim: boolean;

    lareiraPrivativa: boolean;

    mezanino: boolean;

    noPoolDeLocacao: boolean;

    piscinaPrivativa: boolean;

    sacadaComChurrasqueira: boolean;

    sacadaComum: boolean;

    sacadaFechadaComVidro: boolean;

    sistemaDeAlarme: boolean;

    vestiarioParaDiaristas: boolean;

    wcParaEmpregados: boolean;

    caseiro: boolean;

    curral: boolean;

    edicula: boolean;

    horta: boolean;

    lago: boolean;

    cachoeira: boolean;

    casaSede: boolean;

    casaDeCaseiro: boolean;

    celeiro: boolean;

    centralTelefonica: boolean;

    cerca: boolean;

    rural: boolean;

    pasto: boolean;

    pomar: boolean;

    pocoArtesiano: boolean;

    rio: boolean;

    areaVerde: boolean;

    arvoresFrutiferas: boolean;
}

class FeatureConveniencesComModel {
    auditorio: boolean;

    cafe: boolean;

    centralEntregas: boolean;

    foyer: boolean;

    recepcao: boolean;

    restaurante: boolean;

    refeitorio: boolean;

    salaReunioes: boolean;

    vagaFixa: boolean;

    vagaRotativa: boolean;

    vagaIdoso: boolean;

    vagaPne: boolean;

    vallet: boolean;

    vestiario: boolean;
}

class FeatureSecurityComModel {
    acessoEletronico: boolean;

    camerasDeSeguranca: boolean;

    cercaEletrica: boolean;

    circuitoTvInterno: boolean;

    guaritaBlindada: boolean;

    interfone: boolean;

    portaoEletronico: boolean;

    portaria: boolean;

    portaria24h: boolean;

    rondaVigilancia: boolean;
}

class FeatureCharacteristicModel {
    carpete: boolean;

    permiteAdicionar: boolean;

    esperaSplit: boolean;

    pisoElevado: boolean;
}

class FeatureFloorComModel {
    carpete: boolean;

    ceramica: boolean;

    concreto: boolean;

    contraPiso: boolean;

    granito: boolean;

    laminado: boolean;

    madeira: boolean;

    parquet: boolean;

    porcelanato: boolean;
}

class FeatureRoofComModel {
    concreto: boolean;

    gessoRebaixo: boolean;

    madeira: boolean;

    pvc: boolean;
}

class FeatureFicaImovelComModel {
    ar: boolean;

    armarioCozinha: boolean;

    armarioQuarto: boolean;

    coifa: boolean;

    cortinas: boolean;

    fogao: boolean;

    freezer: boolean;

    geladeira: boolean;

    luminarias: boolean;

    microondas: boolean;

    persianas: boolean;

    splitSala: boolean;
}

class FeatureSportComModel {
    bicicletario: boolean;

    fitness: boolean;

    piscinaCoberta: boolean;
}

class FeatureFicaImovelModel {
    ar: boolean;

    armarioCozinha: boolean;

    armarioQuarto: boolean;

    coifa: boolean;

    cortinas: boolean;

    fogao: boolean;

    freezer: boolean;

    geladeira: boolean;

    luminarias: boolean;

    microondas: boolean;

    splitSala: boolean;
}

class FeatureFloorModel {
    carpete: boolean;

    ceramica: boolean;

    concreto: boolean;

    contraPiso: boolean;

    granito: boolean;

    laminado: boolean;

    madeira: boolean;

    parquet: boolean;

    porcelanato: boolean;
}

class FeatureRoofModel {
    concreto: boolean;

    gessoRebaixo: boolean;

    madeira: boolean;

    pvc: boolean;

}

class FeatureInfraComModel {
    acessibilidadeCom: boolean;

    acessoAsfaltadoCom: boolean;

    aquecimentoCentralCom: boolean;

    aquecimentoSolarCom: boolean;

    arCondicionadoCentralCom: boolean;

    automacaoPredialCom: boolean;

    coletaSeletivaCom: boolean;

    economizadoresDeAguaCom: boolean;

    gasCentralCom: boolean;

    geradorCom: boolean;

    gestaoDeResiduosCom: boolean;

    porteCochereCom: boolean;

    proximoAoMetroCom: boolean;

    reaproveitamentoDeAguaCom: boolean;
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

    carWash: boolean;

    casaDeCaseiro: boolean;

    centralDeEntregas: boolean;

    centralDeLimpezaEGovernanca: boolean;

    elevador: boolean;

    elevadorDeServico: boolean;

    entradaCaminhoes: boolean;

    entradaservico: boolean;

    heliponto: boolean;

    lavanderia: boolean;

    marina: boolean;

    petCare: boolean;

    petPlay: boolean;

    proximoAoMetro: boolean;

    vagasDeVisitantes: boolean;

    zelador: boolean;

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
