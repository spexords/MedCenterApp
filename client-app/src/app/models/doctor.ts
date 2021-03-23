import { IAppointment } from "./appointment";

export interface IDoctor {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    pesel: string;
    gender: string;
    appointments: IAppointment[];
}