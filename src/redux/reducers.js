import {ADDPRESS, DELETEUSER} from './actions';

const initialState={
  scores:[]
}


const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDPRESS: {
      return {
        ...state,
        scores: state.scores.concat({
          name: action.name,
          score: action.score,
          id: new Date(),
        }),
      };
    }
    case DELETEUSER: {
      let newList = state.scores.filter((player) => player.id !== action.id);
      return {...state, scores: newList};
    }
    default: {
      return state;
    }
  }
};
export default mainReducer;
