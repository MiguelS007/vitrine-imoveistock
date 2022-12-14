export class UserAuthenticatedDto {
    constructor(
        public phone: string,
        public accesstoken: string,
    ) { }
}