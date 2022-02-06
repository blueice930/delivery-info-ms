import initFirebase from './helpers/initFirebase';
import * as dataHandler from './handlers/data';

initFirebase();

export const data = dataHandler;
