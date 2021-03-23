import { action, computed, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { IRegisterUserFormValues, IUser } from "../models/user";
import { RootStore } from "./rootStore";

export default class AdminStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable fetchingUsers: boolean = false;
  @observable users: IUser[] | null = null;

  @computed get userOptions() {
    return this.users?.map((u) => ({
      key: u.id,
      value: u.id,
      text: `${u.firstName} ${u.lastName} (${u.username})`,
    }));
  }

  @action loadUsers = async () => {
    try {
      this.fetchingUsers = true;
      const users = await agent.User.listUsers();
      runInAction(() => {
        this.users = users;
        this.fetchingUsers = false;
      });
    } catch (error) {
      runInAction(() => (this.fetchingUsers = false));
      toast.error("Could not fetch users.");
    }
  };

  @action register = async (values: IRegisterUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      runInAction(() => {
        this.users = [...this.users!, user];
      });
      toast.success("User created.");
    } catch (error) {
      toast.error(Object.values(error?.data?.errors).join("\n"));
    }
  };

  @action resetPassword = async (userId: string) => {
    try {
      await agent.User.resetPassword(userId);
      toast.success("Password reseted.");
    } catch (error) {
      toast.error("Could not reset password.");
    }
  };

  @action deleteUser = async (userId: string) => {
    try {
      await agent.User.delete(userId);
      runInAction(() => {
        this.users = this.users!.filter((u) => u.id !== userId);
      });
      toast.success("User deleted.");
    } catch (error) {
      toast.error("Could not delete user.");
    }
  };
}
