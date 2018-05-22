import { handleActions } from 'redux-actions';

const defaultState = {
  workspace: {
    svg: null,
    image: null,
    polygonGroup: null,
    focused: {
      polygon: null,
      vertex: null
    }
  },
  tool: 'pencil'
};

const assignPayloadTo = (property) => (state, { payload }) => ({
  ...state,
  [property]: payload
})

const handleSetupWorkspace = (state, {
  payload: {
    snapSvgObj: svg,
    snapImageObj: image,
    snapPolygonGroupObj: polygonGroup
  }
}) => ({
  ...state,
  workspace: { ...state.workspace, svg, image, polygonGroup }
});
const handleFocusVertex = (state, { payload: vertex }) => ({
  ...state,
  workspace: {
    ...state.workspace,
    focused: {
      ...state.workspace.focused,
      vertex
    }
  }
});
const handleFocusPolygon = (state, { payload: polygon }) => ({
  ...state,
  workspace: {
    ...state.workspace,
    focused: {
      ...state.workspace.focused,
      polygon
    }
  }
});

export default handleActions({
  SETUP_WORKSPACE: handleSetupWorkspace,
  SET_TOOL: assignPayloadTo('tool'),
  // ADD_POINT: handleAddPoint,
  FOCUS_VERTEX: handleFocusVertex,
  // CREATE_POLYGON: handleCreatePolygon,
  FOCUS_POLYGON: handleFocusPolygon
}, defaultState);
