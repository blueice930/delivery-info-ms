import * as firebaseFunctions from 'firebase-functions';

export const functions = firebaseFunctions.runWith({
  timeoutSeconds: 120,
  memory: '256MB',
}).region('asia-east2').https;

export const https = firebaseFunctions.https;
