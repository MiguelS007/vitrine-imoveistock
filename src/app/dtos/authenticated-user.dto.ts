export class AuthetincatedUserDto {

    constructor(
        public userId: string,
        public phone: string,
        public token: string,
        public profileId: string,
        public apiFunctionsId: [],
    ) {
    }
}