import { all, call } from 'redux-saga/effects';
import {
  createPolygonTransaction,
  addVertexTransaction
} from './Segmentation.Saga';

/* Collection of Async Transactions */
export default function* RootSaga() {
  yield all([
    call(createPolygonTransaction),
    call(addVertexTransaction)
  ]);
}