import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Header, Label, Icon, Input, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

const AppointmentDetailedConditions: React.FC<{ edit: boolean }> = ({
  edit,
}) => {
  const rootStore = useContext(RootStoreContext);
  const [conditionName, setConditionName] = useState("");
  const [requiredLength, setRequiredLength] = useState(false);
  const {
    appointment,
    connectCondtion,
    disconnectCondition,
    deletingConditionId,
    loadingCondition,
  } = rootStore.appointmentStore;

  const handleAddCondition = () => {
    if (requiredLength) {
      connectCondtion(conditionName);
      setConditionName("");
    }
  };

  useEffect(() => {
    setRequiredLength(conditionName.length >= 3);
  }, [conditionName]);

  const handleDeleteCondition = (id: number) => {
    disconnectCondition(id);
  };

  return (
    <div className="appointmentDetails__conditions">
      <Header as="h5" style={{ margin: 0, padding: 0 }}>
        Conditions
      </Header>
      <div className="conditions__list">
        {appointment?.conditions?.map((condition) => (
          <div className="conditionListItem" key={condition.id}>
            <Label color={`${!edit ? "grey" : "blue"}` as any}>
              {condition.name}
              <Icon
                disabled={!edit}
                onClick={() => handleDeleteCondition(condition.id)}
                name="close"
                loading={deletingConditionId === condition.id}
              />
            </Label>
          </div>
        ))}
      </div>
      <div className="conditions__input">
        <Input 
          style={{ flex: 1 }}
          disabled={!edit}
          type='text'
          placeholder='Condition'
          action
          value={conditionName}
          onChange={(e) => setConditionName(e.currentTarget.value)}
        >
          <input/>
          <Button
            type='submit'
            disabled={!edit && requiredLength}
            loading={loadingCondition}
            onClick={handleAddCondition}
          >
            Add
          </Button>
        </Input>
      </div>
    </div>
  );
};

export default observer(AppointmentDetailedConditions);
