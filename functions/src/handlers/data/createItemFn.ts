import {firestore} from 'firebase-admin';
import {v4 as uuidv4} from 'uuid';
import {CallableContext} from 'firebase-functions/v1/https';
import {https} from '../../helpers/initFirebaseFunctions';
import {FunctionResponse} from '../../helpers/types';
import {Item} from './types';

export const createItemFn = async (data:any, context: CallableContext) => {
  // if (!context.auth) {
  //   // Throwing an HttpsError cause authentication failed.
  //   throw new https.HttpsError('unauthenticated',
  //       'You are currently unauthenticated', 'Action failed');
  // }
  // const {auth: {uid: userId}} = context;

  const response: FunctionResponse = {
    success: true,
    data: 12345,
  };
  return response;
};

