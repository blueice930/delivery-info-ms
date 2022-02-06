import {database} from 'firebase-admin';
import {CallableContext} from 'firebase-functions/v1/https';
import {https} from '../../helpers/initFirebaseFunctions';
import {FunctionResponse} from '../../helpers/types';

export const getDataByUidsFn = async (data:any, context: CallableContext) => {
  // if (!context.auth) {
  //   // Throwing an HttpsError so that the client gets the error details.
  //   throw new https.HttpsError('unauthenticated',
  //       'You are currently unauthenticated', 'Action failed');
  // }

  // const {auth: {uid: userId}} = context;
  const db = database();
  const itemUids = data?.itemUids || [];

  const emptyRes: FunctionResponse = {
    success: true,
    data: [],
  };
  if (!itemUids.length) {
    return emptyRes;
  }

  const response: FunctionResponse = {
    success: true,
    data: 2312,
  };
  return response;
};
