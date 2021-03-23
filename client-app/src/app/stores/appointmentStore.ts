import { action, computed, observable, reaction, runInAction } from "mobx";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../api/agent";
import {
  IAppointment,
  IAppointmentFormValues,
  UpdateAppointmentFormValues,
} from "../models/appointment";
import { IPatient } from "../models/patient";
import { RootStore } from "./rootStore";

export default class AppointmentStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    reaction(
      () => this.allAppointmentPredicate,
      () => this.fetchAppointments()
    );
    reaction(
      () => this.datePredicate,
      () => this.fetchAppointments()
    );
  }

  @observable allAppointmentPredicate: string = "true";
  @observable datePredicate: Date = new Date();
  @observable fetchingAppointments = false;
  @observable appointments: IAppointment[] | null = null;
  @observable patients: IPatient[] | null = null;
  @observable doctors: IPatient[] | null = null;
  @observable appointment: IAppointment | null = null;
  @observable loadingAppointment = false;
  @observable updatingAppointment = false;
  @observable loadingCondition = false;
  @observable deletingConditionId = -1;

  @computed get filterParams() {
    const params = new URLSearchParams();
    params.append("allAppointments", this.allAppointmentPredicate);
    params.append("startDate", this.datePredicate.toISOString());
    return params;
  }

  @action setAllAppointmentPredicate = (value: string) => {
    this.allAppointmentPredicate = value;
  };

  @action setDatePredicate = (value: Date) => {
    this.datePredicate = value;
  };

  @action fetchAppointments = async () => {
    try {
      this.fetchingAppointments = true;
      const appointments = await agent.Appointments.list(this.filterParams);
      runInAction(() => {
        this.appointments = appointments;
        this.fetchingAppointments = false;
      });
    } catch (error) {
      runInAction(() => {
        this.fetchingAppointments = false;
      });
      toast.error("Could not fetch appointments.");
    }
  };

  @computed get appointmentsByDate() {
    if (this.appointments !== null) {
      return this.groupAppointmentsByDate(this.appointments!);
    }
    return null
  }

  groupAppointmentsByDate(appointments: IAppointment[]) {
    const sortedAppointments = appointments
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return Object.entries(
      sortedAppointments.reduce((appointments, appointment) => {
        const date = new Date(appointment.date).toISOString().split("T")[0];
        appointments[date] = appointments[date]
          ? [...appointments[date], appointment]
          : [appointment];
        return appointments;
      }, {} as { [key: string]: IAppointment[] })
    );
  }

  @action createAppointment = async (values: IAppointmentFormValues) => {
    try {
      const appointment = await agent.Appointments.create(values);
      runInAction(() => {
        if (new Date(appointment.date) >= new Date(this.datePredicate)) {
          this.appointments = [...this.appointments!, appointment];
        }
      });
      toast.success("Created appointment.");
    } catch (e) {
      toast.error("Could not create appointment.");
    }
  };

  @action loadAppointment = async (id: number) => {
    try {
      this.loadingAppointment = true;
      const appointment = await agent.Appointments.details(id);
      runInAction(() => {
        this.loadingAppointment = false;
        this.appointment = appointment;
      });
    } catch (e) {
      runInAction(() => {
        this.loadingAppointment = false;
      });
      toast.error("Could not load appointment.");
    }
  };

  @action updateAppointment = async (
    appointment: UpdateAppointmentFormValues
  ) => {
    try {
      await agent.Appointments.update(appointment);
      toast.success("Appointment updated.");
    } catch (e) {
      toast.error("Could not update appointment.");
    }
  };

  @action deleteAppointment = async (id: number) => {
    try {
      await agent.Appointments.delete(id);
      runInAction(() => {
        this.appointment = null;
      });
      history.replace("/appointments");
      toast.success("Appointment deleted.");
    } catch (e) {
      toast.error("Could not delete appointment.");
    }
  };

  @action connectCondtion = async (conditionName: string) => {
    try {
      this.loadingCondition = true;
      const condition = await agent.Appointments.connectCondition(
        this.appointment!.id,
        conditionName
      );
      runInAction(() => {
        this.appointment!.conditions = [
          ...this.appointment?.conditions!,
          condition,
        ];
        this.loadingCondition = false;
      });
      toast.success("Added condition.");
    } catch (e) {
      runInAction(() => {
        this.loadingCondition = false;
      });
      toast.error("Could not add condition.");
    }
  };

  @action disconnectCondition = async (conditionId: number) => {
    try {
      this.deletingConditionId = conditionId;
      await agent.Appointments.disconnectCondition(
        this.appointment!.id,
        conditionId
      );
      runInAction(() => {
        this.appointment!.conditions = this.appointment!.conditions?.filter(
          (c) => c.id !== conditionId
        );
        this.deletingConditionId = -1;
        toast.success("Condition deleted.");
      });
    } catch (e) {
      runInAction(() => {
        this.deletingConditionId = -1;
      });
      toast.error("Could not delete condition.");
    }
  };
}
