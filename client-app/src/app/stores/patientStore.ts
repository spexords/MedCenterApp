import { action, computed, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../api/agent";
import { IPatient, IPatientFormValues } from "../models/patient";
import { RootStore } from "./rootStore";

export default class PatientStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable predicate = new Map<string, string>();
  @observable patients: IPatient[] | null = null;
  @observable fetchingPatients = false;
  @observable patient: IPatient | null = null;
  @observable loadingPatient = false;

  @action setPredicate = (key: string, value: string) => {
    this.predicate.set(key, value);
  };

  @computed get filterParams() {
    const params = new URLSearchParams();
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  @action fetchPatients = async (resetPredicate: boolean = false) => {
    try {
      this.fetchingPatients = true;
      if (resetPredicate) {
        this.predicate.clear();
      }
      const params = this.filterParams;
      const patients = await agent.Patients.list(params);
      runInAction(() => {
        this.patients = patients;
        this.fetchingPatients = false;
      });
    } catch (error) {
      runInAction(() => {
        this.fetchingPatients = false;
      });
      toast.error("Could not fetch patients.");
    }
  };

  @action createPatient = async (values: IPatientFormValues) => {
    try {
      const patient = await agent.Patients.create(values);
      runInAction(() => {
        this.patients = [...this.patients!, patient];
      });
      toast.success("Patient created.");
    } catch (error) {
      toast.error(Object.values(error?.data?.errors).join("\n"));
    }
  };

  @action loadPatient = async (id: number) => {
    try {
      this.loadingPatient = true;
      const patient = await agent.Patients.details(id);
      runInAction(() => {
        this.patient = patient;
        this.loadingPatient = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingPatient = false;
      });
      history.push("/notfound");
    }
  };

  @action deletePatient = async (id: number) => {
    try {
      await agent.Patients.delete(id);
      runInAction(() => {
        this.patient = null;
      });
      history.replace("/patients");
      toast.success("Patient deleted.");
    } catch (error) {
      toast.error("Could not delete patient.");
    }
  };

  @action updatePatient = async (patient: IPatient) => {
    try {
      await agent.Patients.update(patient);
      runInAction(() => {
        this.patient = patient;
      });
      toast.success("Patient updated.");
    } catch (error) {
      toast.error("Could not update patient.");
    }
  };
}
