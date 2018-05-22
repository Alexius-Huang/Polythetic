import { createActions } from 'redux-actions';

export const {
  zoomIn,
  zoomOut,
  zoomTo
} = createActions({
  ZOOM_IN: rate => rate,
  ZOOM_OUT: rate => rate,
  ZOOM_TO: rate => rate
});
