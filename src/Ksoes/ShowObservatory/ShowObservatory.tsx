import React from "react";
import './ShowObservatory.scss';
import Observatory from "../Observatory/Observatory";
import { useAppDispatch } from "../../store/store";
import { getMeans, getObservatory, getTypes, setCatalogs } from "../../store/vocabularySlice";
import { getMeansByStatDay, getObservatoryByStatDay, getObservatoryByStatDaySender } from "../../store/dataSlice";


const ShowObservatory: React.FC = () => {

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (localStorage.getItem('catalogTypes')) {
            dispatch(setCatalogs())
        } else {
            dispatch(getTypes())
            dispatch(getObservatory())
            dispatch(getMeans())
        }
        dispatch(getObservatoryByStatDay())
        dispatch(getMeansByStatDay())
        dispatch(getObservatoryByStatDaySender())

    }, [])
    return (
        <>
            <Observatory isShow={true} />
        </>
    )
}

export default ShowObservatory;