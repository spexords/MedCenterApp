import { configure } from "mobx";
import { createContext } from "react";
import AdminStore from "./adminStore";
import AppointmentStore from "./appointmentStore";
import CommonStore from "./commonStore";
import DashboardStore from "./dashboardStore";
import DoctorStore from "./doctorStore";
import ModalStore from "./modalStore";
import PatientStore from "./patientStore";
import UserStore from "./userStore";

configure({ enforceActions: "always" });

export class RootStore {
  userStore: UserStore;
  commonStore: CommonStore;
  adminStore: AdminStore;
  modalStore: ModalStore;
  patientStore: PatientStore;
  appointmentStore: AppointmentStore;
  doctorStore: DoctorStore;
  dashboardStore: DashboardStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.adminStore = new AdminStore(this);
    this.modalStore = new ModalStore(this);
    this.patientStore = new PatientStore(this);
    this.appointmentStore = new AppointmentStore(this);
    this.doctorStore = new DoctorStore(this);
    this.dashboardStore = new DashboardStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
