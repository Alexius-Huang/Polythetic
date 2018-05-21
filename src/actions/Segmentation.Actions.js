import { createActions } from 'redux-actions';

export const {
  setTool
} = createActions({
  SET_TOOL: toolName => toolName
});
