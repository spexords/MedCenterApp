export interface IUser {
    id: string;
    token: string;
    username: string;
    email: string;
    displayName: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    pesel: string;
    role: string;
    gender: string;
}

export interface IUserFormValues {
    email: string,
    password: string
}

export interface IRegisterUserFormValues {
    firstName: string;
    lastName: string;
    email?: string;
    birthDate: Date;
    pesel: string;
    gender: string;
}