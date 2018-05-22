import { handleActions } from 'redux-actions';

const defaultState = {
  zoomRate: 1
};

const assignPayloadTo = (property) => (state, { payload }) => ({
  ...state,
  [property]: payload
})


const handleZoomIn = (state, { payload: rate }) => ({
  ...state,
  zoomRate: state.zoomRate + rate
});
const handleZoomOut = (state, { payload: rate }) => ({
  ...state,
  zoomRate: state.zoomRate - rate
});

export default handleActions({
  ZOOM_IN: handleZoomIn,
  ZOOM_OUT: handleZoomOut,
  ZOOM_TO: assignPayloadTo('zoomRate')
}, defaultState);
