export class ModelUser {
    public id: string;
    public name: string;
    public username: string;
    public city: string;
    public phone: number;
    public gameRank: string;
    public steamProfile: string;
    public imgLink: string;
    public coverImgLink: string;
    public email: string;
}

export class ModelStatus {
    public success: boolean;
    public msg: string;
}

export class ModelUserLogin {
    public success: boolean;
    public token: string;
    public msg: string;
    public user: ModelUser;
}