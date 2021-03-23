import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Header, Segment, Statistic } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const DashboardStatistics = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    fetchConditionStats,
    fetchingConditionStats,
    conditionStats,
  } = rootStore.dashboardStore;
  useEffect(() => {
    fetchConditionStats(5, true);
  }, [fetchConditionStats]);
  return (
    <div className="dashboard__statistics">
      <Header as="h1">Condition Statistics</Header>
      <Segment style={{ marginTop: "0" }} loading={fetchingConditionStats}>
        <div className="dashboard__conditions">
          {conditionStats?.map((condition) => (
            <Statistic key={condition.name}>
              <Statistic.Value>{condition.count}</Statistic.Value>
              <Statistic.Label>{condition.name}</Statistic.Label>
            </Statistic>
          ))}
        </div>
      </Segment>
    </div>
  );
};

export default observer(DashboardStatistics);
