import React from "react";
import "./ShowObservatory.scss";
import Observatory from "../Observatory/Observatory";
import { useAppDispatch } from "../../store/store";
import {
  getMeans,
  getObservatory,
  getTypes,
} from "../../store/vocabularySlice";
import {
  getMeansByStatDay,
  getObservatoryByStatDay,
  getObservatoryByStatDaySender,
} from "../../store/dataSlice";

const ShowObservatory: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getTypes());
    dispatch(getObservatory());
    dispatch(getMeans());
    dispatch(getObservatoryByStatDay());
    dispatch(getMeansByStatDay());
    dispatch(getObservatoryByStatDaySender());
  }, []);
  return (
    <div className="table__wrapper">
      <Observatory isShow={true} />
    </div>
  );
};

export default ShowObservatory;
