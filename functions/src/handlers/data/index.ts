import initFirebase from '../../helpers/initFirebase';
import {createItemFn} from './createItemFn';
import {deleteItemFn} from './deleteItemFn';
import {updateItemFn} from './updateItemFn';
import {functions} from '../../helpers/initFirebaseFunctions';
import {getDataByUidsFn} from './getDataByUidsFn';

initFirebase();

const getDataByUids = functions.onCall(getDataByUidsFn);
// const createItem = functions.onCall(createItemFn);
// const deleteItem = functions.onCall(deleteItemFn);
// const updateItem = functions.onCall(updateItemFn);

export {
  getDataByUids,
  // createItem,
  // deleteItem,
  // updateItem,
};
