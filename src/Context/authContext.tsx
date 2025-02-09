import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {clearBookings, setBookings} from '../Redux/Features/BookingsSlice';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {clearUser, setUser} from '../Redux/Features/UserSlice';
import axios from 'axios';
import BackendConstants from '../Config/Config';

interface AuthContextType {
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface OzoveProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<OzoveProviderProps> = ({
  children,
}) => {
  const [ServerLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // Configure Google Sign-in
    console.log('Configuring Google Sign-in...');
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId:
        '858599621341-e823upusu29g3nud7hnlvivvus2ajv8v.apps.googleusercontent.com',
    });
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const {data} = await GoogleSignin.signIn();
      if (data?.idToken) {
        const credential = auth.GoogleAuthProvider.credential(data.idToken);
        await auth()
          .signInWithCredential(credential)
          .then(async userInfo => {
            try {
              const response = await axios.post(
                `${BackendConstants.Url}/register`,
                {
                  name: userInfo?.user?.displayName,
                  email: userInfo?.user?.email,
                  uid: userInfo?.user?.uid,
                },
              );
              const data = await response.data;
              console.log('data from backend >>', data);
            } catch (error) {
              console.log(error);
            }

            dispatch(setUser(userInfo));
            dispatch(clearBookings());
          });
      } else {
        console.log('Google Signing now working');
      }
    } catch (error) {
      console.log(error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            console.log(error);
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            console.log(error);
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
        console.log(error);
      }
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      // Sign out from Google
      await GoogleSignin.signOut();
      await auth()
        .signOut()
        .then(() => {
          dispatch(setUser(null));
          dispatch(setBookings([]));
          console.log('Successfully signed out.');
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{signInWithGoogle, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useOzove must be used within an OzoveProvider');
  }
  return context;
};
