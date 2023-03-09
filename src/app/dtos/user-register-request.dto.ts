export abstract class UserRegisterRequestDto {
    phone: string;
    email: string;
    name: string;
    cpf: string;
    profilesIds: string[];
    addressZipCode: string;
}