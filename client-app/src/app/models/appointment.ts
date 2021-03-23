import { combineDateAndTime } from "../common/util/util";
import { ICondition } from "./conditions";
import { IPatient } from "./patient";
import { IUser } from "./user";

export interface IAppointment {
  id: number;
  status: string;
  date: Date;
  reason: string;
  description: string;
  patient?: IPatient;
  doctor?: IUser;
  conditions?: ICondition[];
}

export interface IAppointmentFormValues extends Partial<IAppointment> {
  patientId: number;
  doctorId: string;
  time?: Date;
}

export class UpdateAppointmentFormValues {
  id: number;
  patientId: number;
  doctorId: string;
  date?: Date;
  status: string;
  reason: string;
  description: string;
  constructor(init: AppointmentFormValues) {
    this.id = init.id;
    this.patientId = init.patientId;
    this.doctorId = init.doctorId;
    this.date = combineDateAndTime(new Date(init.date!), new Date(init.time!));
    this.status = init.status;
    this.reason = init.reason;
    this.description = init.description;
  }
}

export class AppointmentFormValues implements IAppointmentFormValues {
  patientId: number = -1;
  doctorId: string = "";
  id: number = -1;
  status: string = "";
  date?: Date = undefined;
  time?: Date = undefined;
  reason: string = "";
  description: string = "";

  constructor(init?: IAppointmentFormValues) {
    Object.assign(this, init);
    if (init && init.date) {
      this.time = init.date;
    }
    if (init && init.doctor) {
      this.doctorId = init.doctor.id;
    }
    if (init && init.patient) {
      this.patientId = init.patient.id;
    }
  }
}
