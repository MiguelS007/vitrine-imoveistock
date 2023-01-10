export class UserGetResponseDto {
    phone: string;
    email: string;
    name: string;
    cpf: string;
    photo?: Photo;
}
class Photo {
    key?: string;
    location?: string;
}
