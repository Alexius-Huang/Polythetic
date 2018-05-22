import { combineReducers } from 'redux';
import Segmentation from './Segmentation.Reducers';
import Editor from './Editor.Reducer';

export default combineReducers({
  Segmentation,
  Editor
});
