import React from 'react';
import firebase from './firebase';

const FirebaseContext = React.createContext<firebase|null>(null);

export interface IFirebaseProps {
    firebase?: firebase;
}

export const withFirebase = <T extends IFirebaseProps>(Comp: React.ComponentType<T>) => (props: T) => (
    <FirebaseContext.Consumer>
        {firebase => <Comp {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;
