import FirebaseContext, { withFirebase, IFirebaseProps } from './context';
import Firebase from './firebase';

export default Firebase;

export interface FirebaseProps extends IFirebaseProps {
}

export { FirebaseContext, withFirebase };
