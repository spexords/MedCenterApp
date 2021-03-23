import { action, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { IDoctor } from "../models/doctor";
import { RootStore } from "./rootStore";

export default class DoctorStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable doctors: IDoctor[] | null = null;
  @action fetchDoctors = async() => {
      try {
          const doctors = await agent.Doctors.list();
          runInAction(() => {
              this.doctors = doctors
          })
      } catch(e) {
          toast.error("Could not fetch doctors")
      }
  }
}
