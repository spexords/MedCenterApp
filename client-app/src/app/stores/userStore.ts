import { action, computed, observable, runInAction } from "mobx";
import { RootStore } from "./rootStore";
import { IUser } from "../models/user";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @observable changingPassword = false;

  @computed get isUserLoggedIn() {
    return this.user !== null;
  }

  @computed get isAdmin() {
    return this.user && this.user.role === "Admin"
  }

  @action login = async (values: any) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      history.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  @action logout = () => {
    try {
      this.rootStore.commonStore.setToken(null)
      this.user = null;
      history.push("/")
    } catch(error) {
      console.log(error)
    }
  }

  @action getUser = async () => {
    try {
      const user = await agent.User.currentUser()
      runInAction(() => {
        this.user = user
      })
    } catch(error) {
      console.log(error)
    }
  }

  @action updateAccount = async (values: any) => {
    try {
      await agent.User.updateAccount(values);
      runInAction(() => {
        this.user = values;
      })
      toast.success("Account updated.");
    } catch(e) {
      toast.error("Could not update account.")
    }
  }

  @action changePassword = async(oldPassword: string, newPassword: string) => {
    try {
      this.changingPassword = true;
      await agent.User.changePassword(oldPassword, newPassword);
      runInAction(() => {
        this.changingPassword = false;
      })
      toast.success("Password changed.")
    } catch(e) {
      runInAction(() => {
        this.changingPassword = false;
      })
      throw e;
    }

  }

}
