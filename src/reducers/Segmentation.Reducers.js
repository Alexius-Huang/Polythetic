import { handleActions } from 'redux-actions';

const defaultState = {
  tool: 'pencil'
};

const handleSetTool = (state, { payload: toolName }) => ({
  ...state,
  tool: toolName
});

export default handleActions({
  SET_TOOL: handleSetTool
}, defaultState);
