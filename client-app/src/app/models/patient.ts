import { IAppointment } from "./appointment";

export interface IPatient {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  pesel: string;
  gender: string;
  appointments: IAppointment[];
}

export interface IPatientFormValues {
  id?: number
  firstName: string;
  lastName: string;
  pesel: string;
  birthDate?: Date;
  gender: string;
}
