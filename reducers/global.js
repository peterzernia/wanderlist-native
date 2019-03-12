const initialState = {
  globalState: {}
};

/* Reducer Function*/
export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_STATE": {
      return {
        ...state,
        globalState: action.globalState
      };
    }
    default:
      return state;
  }
}
