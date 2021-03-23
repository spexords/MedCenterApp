import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { RootStoreContext } from "../stores/rootStore";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const rootStore = useContext(RootStoreContext);
  const { isUserLoggedIn } = rootStore.userStore;
  return (
    <Route
      {...rest}
      render={(props) =>
        isUserLoggedIn ? <Component {...props} /> : <Redirect to={"/"} />
      }
    />
  );
};

export default observer(PrivateRoute);
