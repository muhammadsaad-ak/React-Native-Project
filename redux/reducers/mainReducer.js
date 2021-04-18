import { ADD_DATA, DELETE_DATA, EDIT_DATA } from "../actions/types";
import DummyData from "../../data/DummyData";

const Initial_State = {
    data: DummyData
};

export default (state = Initial_State, action) => {
    switch (action.type) {
        case ADD_DATA:
            return { ...state, data: state.data.concat(action.payload) };

        case DELETE_DATA:
            return {
                ...state,
                data: state.data.filter(
                    (item) => item.id !== action.payload,
                ),
            };

        case EDIT_DATA:
            const allData = [...state.data]
            const findData = allData.findIndex((data) => data.id === action.payload.index)
            allData[findData] = action.payload.data
            return {
                ...state,
                data: allData
            }
        default:
            return state;
    }
}