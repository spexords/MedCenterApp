import Axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import {
  IAppointment,
  IAppointmentFormValues,
  UpdateAppointmentFormValues,
} from "../models/appointment";
import { ICondition, IConditionStat } from "../models/conditions";
import { IDoctor } from "../models/doctor";
import { IPatient, IPatientFormValues } from "../models/patient";
import {
  IRegisterUserFormValues,
  IUser,
  IUserFormValues,
} from "../models/user";

//63446
Axios.defaults.baseURL = process.env.REACT_APP_API;

Axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(undefined, (error) => {
  const { status, headers } = error.response;
  if (status === 401 && headers["www-authenticate"].includes("Bearer error")) {
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.info("Your session has expired. Please login again");
  }
  else {
    throw error.response;
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => Axios.get(url).then(responseBody),
  post: (url: string, body: {}) => Axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => Axios.put(url, body).then(responseBody),
  delete: (url: string) => Axios.delete(url).then(responseBody),
};

const User = {
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post("/user/login", user),
  register: (user: IRegisterUserFormValues): Promise<IUser> =>
    requests.post("/user/register", user),
  delete: (id: string) => requests.delete(`/user/${id}`),
  resetPassword: (id: string) => requests.post(`/user/${id}/reset`, {}),
  listUsers: () => requests.get("/users"),
  currentUser: (): Promise<IUser> => requests.get("/user"),
  updateAccount: (account: IUser) => requests.put("/user", account),
  changePassword: (oldPassword: string, newPassword: string) =>
    requests.put("user/password", { oldPassword, newPassword }),
};

const Patients = {
  list: (params: URLSearchParams | null): Promise<IPatient[]> =>
    Axios.get("/patients", { params: params }).then(responseBody),
  create: (patient: IPatientFormValues): Promise<IPatient> =>
    requests.post("/patients", patient),
  details: (id: number): Promise<IPatient> => requests.get(`/patients/${id}`),
  delete: (id: number) => requests.delete(`/patients/${id}`),
  update: (patient: IPatient) =>
    requests.put(`/patients/${patient.id}`, patient),
};

const Appointments = {
  list: (params: URLSearchParams): Promise<IAppointment[]> =>
    Axios.get("/appointments", { params: params }).then(responseBody),
  create: (values: IAppointmentFormValues): Promise<IAppointment> =>
    requests.post("/appointments", values),
  details: (id: number): Promise<IAppointment> =>
    requests.get(`/appointments/${id}`),
  update: (values: UpdateAppointmentFormValues) =>
    requests.put(`/appointments/${values.id}`, values),
  delete: (id: number) => requests.delete(`/appointments/${id}`),
  connectCondition: (
    appointmentId: number,
    conditionName: string
  ): Promise<ICondition> =>
    requests.put(`/appointments/${appointmentId}/conditions`, {
      Condition: conditionName,
    }),
  disconnectCondition: (appointmentId: number, conditionId: number) =>
    requests.delete(`/appointments/${appointmentId}/conditions/${conditionId}`),
};

const Doctors = {
  list: (): Promise<IDoctor[]> => requests.get("/doctors"),
};

const Conditions = {
  list: (size: number, desc: boolean): Promise<IConditionStat[]> =>
    requests.get(`/conditions?size=${size}&descending=${desc}`),
};

export default {
  User,
  Patients,
  Appointments,
  Doctors,
  Conditions,
};
