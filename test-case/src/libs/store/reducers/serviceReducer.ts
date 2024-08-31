


const initialState = {
    metaData: {
        character_count: 0,
        episode_count: 0,
        location_count: 0
    },

    status: "ERROR"
};

export default function serviceReducer(state = initialState, action:any) {
    switch (action.type) {
        case "SET_META_DATA":
            return {
                ...state,
                metaData: action.payload
            };
        case "SET_STATUS":
            return {
                ...state,
                status: action.payload
            };
        default:
            return state;
    }
}