import app from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";

import * as CONFIG from '../../constants/config';

import { EventEmitter } from "events";

class Firebase {

  public fieldValue: any;

  // public auth: app.auth.Auth;
  private db: app.firestore.Firestore;

  public analytics: app.analytics.Analytics;

  private emitter: EventEmitter;

  constructor() {
    app.initializeApp(CONFIG.FIREBASE_CONFIG);

    /* Firebase APIs */

    // this.auth = app.auth();
    this.db = app.firestore();

    this.analytics = app.analytics();

    this.emitter = new EventEmitter();

    // Enable offline persistence
    this.db.enablePersistence({
      synchronizeTabs: true
    })
  }

  // *** Game API ***

  game = (cid: string) => this.db.collection('games').doc(`${cid}`);

  games = () => this.db.collection('games');

}


export default Firebase;
