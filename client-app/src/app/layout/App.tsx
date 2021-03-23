import React, {useContext, useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../../features/home/LoginPage";
import LeftSidebar from "../../features/nav/LeftSidebar";
import Dashboard from "../../features/dashboard/Dashboard";
import PatientDashboard from "../../features/patients/dashboard/PatientDashboard";
import AppointmentDashboard from "../../features/appointments/dashboard/AppointmentDashboard";
import AdminDashboard from "../../features/admin/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import AvatarDropdown from "../../features/nav/AvatarDropdown";
import ModalContainer from "../common/modals/ModalContainer";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "./LoadingComponent";
import PatientDetails from "../../features/patients/details/PatientDetails";
import NotFound from "./NotFound";
import AppointmentDetails from "../../features/appointments/details/AppointmentDetails";
import Settings from "../../features/settings/Settings";

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { getUser } = rootStore.userStore;
  const { token, appLoaded, setAppLoaded } = rootStore.commonStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [token, getUser, setAppLoaded]);

  if (!appLoaded) {
    return <LoadingComponent content="Loading app..." />;
  }

  return (
    <>
      <Route exact path="/" component={LoginPage} />
      <Route
        exact
        path="/(.+)"
        render={() => (
          <>
            <div className="app">
              <ModalContainer />
              <ToastContainer position="bottom-right" />
              <div className="app__wrapper">
                <LeftSidebar />
                <div className="app__content">
                  <Switch>
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <PrivateRoute
                      exact
                      path="/patients"
                      component={PatientDashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/patients/:id"
                      component={PatientDetails}
                    />
                    <PrivateRoute
                      exact
                      path="/appointments"
                      component={AppointmentDashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/appointments/:id"
                      component={AppointmentDetails}
                    />
                    <PrivateRoute
                      exact
                      path="/admin"
                      component={AdminDashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/settings"
                      component={Settings}
                    />
                    <PrivateRoute component={NotFound} />
                  </Switch>
                </div>
                <AvatarDropdown />
              </div>
            </div>
          </>
        )}
      />
    </>
  );
};

export default observer(App);
