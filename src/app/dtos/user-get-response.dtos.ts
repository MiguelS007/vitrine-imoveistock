export class UserGetResponseDto {
    phone: string;
    email: string;
    name: string;
    cpf: string;
    photo?: Photo;
}
class Photo {
    _id?: string;
    key?: string;
    location?: string;
}
