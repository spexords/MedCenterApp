import { action, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IAppointment } from "../models/appointment";
import { IConditionStat } from "../models/conditions";
import { RootStore } from "./rootStore";

export default class DashboardStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable conditionStats: IConditionStat[] | null = null;
  @observable fetchingConditionStats = false;

  @observable upcommingAppointments: IAppointment[] | null = null;
  @observable fetchingAppointments = false;

  @action fetchConditionStats = async (size: number, desc: boolean) => {
    try {
      this.fetchingConditionStats = true;
      const conditionStats = await agent.Conditions.list(size, desc);
      runInAction(() => {
        this.conditionStats = conditionStats;
        this.fetchingConditionStats = false;
      });
    } catch (e) {
      runInAction(() => {
        this.fetchingConditionStats = false;
      });
      console.log(e);
    }
  };

  @action fetchUpcommingAppointments = async (size: number) => {
    try {
      const params = new URLSearchParams();
      params.append("allAppointments", "false");
      params.append("status", "Upcomming");
      params.append("size", size.toString());
      const appointments = await agent.Appointments.list(params);
      runInAction(() => {
        this.upcommingAppointments = appointments;
        this.fetchingAppointments = false;
      });
    } catch (e) {
      runInAction(() => {
        this.fetchingAppointments = false;
      });
      console.log(e);
    }
  };
}
