import { delay } from 'redux-saga';
import { takeLatest, select, put } from 'redux-saga/effects';
import { focusPolygon, focusVertex } from '../actions/Segmentation.Actions';

export function* createPolygonTransaction() {
  yield takeLatest('CREATE_POLYGON', doCreatePolygon);
}

function* doCreatePolygon({ payload: { x, y } }) {
  yield delay(100);
  const { Segmentation: state } = yield select();
  const { workspace: { svg, polygonGroup } } = state;

  const polygon = svg.polygon([x, y]);
  polygon.addClass('seg-polygon');
  polygon.addClass('active');
  polygonGroup.add(polygon);
  yield put(focusPolygon(polygon));

  const vertex = svg.circle(x, y, 2.5);
  vertex.addClass('seg-polygon-vertex');
  vertex.addClass('active');
  polygonGroup.add(vertex);
  yield put(focusVertex(vertex));
}

export function* addVertexTransaction() {
  yield takeLatest('ADD_VERTEX', doAddVertex);
}

function* doAddVertex({ payload: { x, y } }) {
  const { Segmentation: state } = yield select();
  const {
    workspace: {
      polygonGroup,
      svg,
      focused: { polygon, vertex: focusedVertex }
    }
  } = state;
  const points = polygon.attr('points');
  points.push(x);
  points.push(y);
  polygon.attr({ points });

  focusedVertex.removeClass('active');
  const vertex = svg.circle(x, y, 2.5);
  vertex.addClass('seg-polygon-vertex');
  vertex.addClass('active');
  polygonGroup.add(vertex);
  yield put(focusVertex(vertex));
}
