import { takeLatest, select, put } from 'redux-saga/effects';
import { focusPolygon, focusVertex } from '../actions/Segmentation.Actions';

export function* createPolygonTransaction() {
  yield takeLatest('CREATE_POLYGON', function* doCreatePolygon({ payload: { x, y } }) {
    const { Segmentation: state } = yield select();
    const { workspace: { svg, polygonGroup } } = state;

    const polygon = svg.polygon([x, y]);
    polygon.addClass('seg-polygon');
    polygon.addClass('active');
    polygon.data('complete', false);
    polygonGroup.add(polygon);
    yield put(focusPolygon(polygon));

    const vertex = svg.circle(x, y, 2.5);
    vertex.addClass('seg-polygon-vertex');
    vertex.addClass('active');
    polygonGroup.add(vertex);
    yield put(focusVertex(vertex));
  });
}

export function* addVertexTransaction() {
  yield takeLatest('ADD_VERTEX', function* doAddVertex({ payload: { x, y } }) {
    const { Segmentation: state } = yield select();
    const {
      workspace: {
        polygonGroup,
        svg,
        focused: {
          polygon,
          vertex: focusedVertex
        }
      }
    } = state;
    const points = polygon.attr('points');
    points.push(x);
    points.push(y);
    polygon.attr({
      points
    });

    const line = svg.line(...points.slice(points.length - 4));
    line.addClass('seg-polygon-edge');
    polygonGroup.add(line);

    focusedVertex.removeClass('active');
    const vertex = svg.circle(x, y, 2.5);
    vertex.addClass('seg-polygon-vertex');
    vertex.addClass('active');
    polygonGroup.add(vertex);
    yield put(focusVertex(vertex));
  });
}

export function* unfocusAllTransaction() {
  yield takeLatest('UNFOCUS_ALL', function* doUnfocusAll() {
    const { Segmentation: state } = yield select();
    const { workspace: { polygonGroup, svg } } = state;

    const focusedPolygon = polygonGroup.select('.seg-polygon.active');
    if (focusedPolygon) {
      focusedPolygon.removeClass('active');
    }

    const focusedVertex = polygonGroup.select('.seg-polygon-vertex.active');
    if (focusedVertex) {
      focusedVertex.removeClass('active');
      /* If polygon incomplete, then draw the ending line */
      if (focusedPolygon && !focusedPolygon.data('complete')) {
        const points = focusedPolygon.attr('points');
        if (points.length >= 4) {
          const line = svg.line(...points.slice(points.length - 2), points[0], points[1]);
          line.addClass('seg-polygon-edge');
          polygonGroup.add(line);
        } 
      }
    }
  });
}

