import * as actionKeys from './marketing.action-keys';

const DEFAULT_STATE = {
  banners: []
};

export function marketingReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case actionKeys.Set_Banners:
      return {
        ...state,
        banners: action.payload
      };

    default:
      return state;
  }
}
