export class AuthetincatedUserDto {

    constructor(
        public phone: string,
        public accessToken: string
    ) {
    }
}