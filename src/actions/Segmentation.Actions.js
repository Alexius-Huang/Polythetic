import { createActions } from 'redux-actions';

export const {
  setupWorkspace,
  setTool,
  addVertex,
  focusVertex,
  createPolygon,
  focusPolygon,
  unfocusAll
} = createActions({
  SETUP_WORKSPACE: snapObjParams => snapObjParams,
  SET_TOOL: toolName => toolName,
  ADD_VERTEX: (x, y) => ({ x, y }),
  FOCUS_VERTEX: snapVertexObj => snapVertexObj,
  CREATE_POLYGON: (x, y) => ({ x, y }),
  FOCUS_POLYGON: snapPolygonObj => snapPolygonObj,
  UNFOCUS_ALL: () => undefined
});

/* Workspace included params:
 *   snapSvgObj: the main Snap svg object represent the whole canvas
 *   snapImageObj: the image element in Snap Element object
 *   snapPolygonGroupObj: the group element in Snap element object which stores
 *     a collection of segmentation polygons
 */
