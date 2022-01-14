export const SET_TRADE_MODAL_VISIBILTY = 'SET_TRADE_MODAL_VISIBILTY';

export const setTradeModalVisibiltySuccess = isVisible => ({
  type: SET_TRADE_MODAL_VISIBILTY,
  payload: {isVisible},
});

export const setTradeModalVisibilty = isVisible => {
  return dispatch => {
    dispatch(setTradeModalVisibiltySuccess(isVisible));
  };
};
