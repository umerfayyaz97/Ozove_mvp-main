import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {setBookings} from '../Redux/Features/BookingsSlice';
import {useAppSelector} from '../hooks/useRedux';
import {Booking} from './Types/ozove';
import axios from 'axios';
import {getAuth} from '@react-native-firebase/auth';

interface bookingData {
  OrderId: string;
  From: string;
  PickupCoordinates: {
    lat: number;
    long: number;
  };
  DropoffCoordinates: {
    lat: number;
    long: number;
  };
  To: string;
  Date: string;
  Time: string;
  selectedVehicle: number | null;
  selectedAdditonalServices: number | null;
  createdAtDate: string;
  contactDetails: string;
  driverNote: string;
  TimeStamp: string;
  Status: string;
}

interface AuthContextType {
  testFunction: () => void;
  _handleBooking: (booking: Booking) => Promise<void>;
  _getStripePublishableKey: () => Promise<string | undefined>;
  _getGeoApiKey: () => Promise<string | undefined>;
  _getlocationSuggestions: (query: string) => Promise<string[] | undefined>;
  _updateBookingData: (key: string, value: any) => void;
  _update_BookingData: (updates: any) => void;
  Generate_OrderID: () => string;
  ServerLoading: boolean;
  bookingData: bookingData;
}

const OZoveContext = createContext<AuthContextType | undefined>(undefined);

interface OzoveProviderProps {
  children: ReactNode;
}

export const OzoveProvider: React.FC<OzoveProviderProps> = ({children}) => {
  const auth = getAuth();
  const [ServerLoading, setLoading] = useState(false);
  const [error, set_error] = useState('');
  const [success, set_success] = useState('');
  const [bookingData, set_bookingData] = useState<bookingData>({
    OrderId: '',
    From: '',
    PickupCoordinates: {
      lat: 0,
      long: 0,
    },
    DropoffCoordinates: {
      lat: 0,
      long: 0,
    },
    To: '',
    Date: '',
    Time: '',
    selectedVehicle: null,
    selectedAdditonalServices: null,
    createdAtDate: '',
    contactDetails: '',
    driverNote: '',
    TimeStamp: '',
    Status: '',
  });

  const dispatch = useDispatch();
  const User = useAppSelector(state => state.user.user);

  useEffect(() => {
    if (!User?.uid) return; // Ensure User is available before subscribing

    const unsubscribe = firestore()
      .collection('bookings')
      .doc(`${auth.currentUser?.uid}`)
      .collection('individual_bookings')
      .onSnapshot(
        snapshot => {
          const bookings: bookingData[] = snapshot.docs.map(doc => {
            const data = doc.data();

            return {
              id: doc.id, // Document ID
              OrderId: data.OrderId || '',
              From: data.From || '',
              PickupCoordinates: {
                lat: data.PickupCoordinates.lat || 0,
                long: data.PickupCoordinates.long || 0,
              },
              DropoffCoordinates: {
                lat: data.DropoffCoordinates.lat || 0,
                long: data.DropoffCoordinates.long || 0,
              },
              To: data.To || '',
              Date: data.Date || '',
              Time: data.Time || '',
              selectedVehicle: data.selectedVehicle || null,
              selectedAdditonalServices: data.selectedAdditonalServices || null,
              createdAtDate: data.createdAtDate || '',
              contactDetails: data.contactDetails || '',
              driverNote: data.driverNote || '',
              TimeStamp: data.TimeStamp || '',
              Status: data.Status || '',
            };
          });

          // Dispatch the bookings to Redux
          dispatch(setBookings(bookings));
        },
        error => {
          console.error('Error fetching bookings:', error);
        },
      );

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [User?.uid, dispatch]);

  const testFunction = () => {
    console.log('Test from Context test function');
  };

  const reinitialize = () => {
    set_bookingData({
      OrderId: '',
      From: '',
      PickupCoordinates: {
        lat: 0,
        long: 0,
      },
      DropoffCoordinates: {
        lat: 0,
        long: 0,
      },
      To: '',
      Date: '',
      Time: '',
      selectedVehicle: null,
      selectedAdditonalServices: null,
      createdAtDate: '',
      contactDetails: '',
      driverNote: '',
      TimeStamp: '',
      Status: '',
    });
  };
  const _updateBookingData = (key: string, value: any) => {
    set_bookingData((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const _update_BookingData = (updates: any) => {
    set_bookingData((prev: any) => {
      const newData = {...prev};
      updates.forEach(({key, value}: any) => {
        if (key.includes('.')) {
          const [parentKey, childKey] = key.split('.');
          newData[parentKey] = {
            ...newData[parentKey],
            [childKey]: value,
          };
        } else {
          newData[key] = value;
        }
      });
      return newData;
    });
  };

  const Generate_OrderID = () => {
    const randomPart = Math.floor(100000 + Math.random() * 900000); // Generate 6 random digits
    const timestampPart = Date.now().toString().slice(-2); // Use the last 2 digits of the timestamp

    return `${randomPart}${timestampPart}`; // Combine to form an 8-digit number
  };

  const _getGeoApiKey = async (): Promise<string | undefined> => {
    try {
      setLoading(true);
      const doc = await firestore()
        .collection('GEOAPIFY_API_KEY')
        .doc('GEO_KEY')
        .get();

      if (doc.exists) {
        const data = doc.data();
        setLoading(false);
        return data?.key ?? undefined; // Ensure a string or undefined is returned
      } else {
        console.warn('Geo Api key document does not exist.');
        setLoading(false);
        return undefined;
      }
    } catch (error) {
      console.error('Error in getting the Geo Api key', error);
      setLoading(false);
      return undefined;
    }
  };

  const _getlocationSuggestions = async (
    query: string,
  ): Promise<string[] | undefined> => {
    try {
      const apiKey = await _getGeoApiKey();
      if (!apiKey) {
        return undefined;
      }
      const perthBBox = '115.7,-32.1,116.0,-31.8'; // minLon, minLat, maxLon, maxLat

      const response = await axios.get(
        'https://api.geoapify.com/v1/geocode/autocomplete',
        {
          params: {
            text: query,
            apiKey: apiKey,
            format: 'json',
            limit: 5,
            bbox: perthBBox, // Add bounding box
            filter: 'countrycode:au', // Restrict to Australia
          },
        },
      );

      const suggestions = response.data.results.map((result: any) => ({
        formatted: result.formatted,
        lat: result.lat,
        lon: result.lon,
      }));
      console.log('Suggestions:', suggestions);

      return suggestions;
    } catch (error) {
      console.log('Error in getting the Location Suggestions', error);
      setLoading(false);
      return undefined;
    }
  };

  {
    /*Functions to contact with the server */
  }

  const _getStripePublishableKey = async (): Promise<string | undefined> => {
    try {
      setLoading(true);
      const doc = await firestore()
        .collection('STRIPE_PUBLISHABLE_KEY')
        .doc('STRIPE_KEY')
        .get();

      if (doc.exists) {
        const data = doc.data();
        setLoading(false);
        return data?.KEY ?? undefined; // Ensure a string or undefined is returned
      } else {
        console.warn('Stripe key document does not exist.');
        setLoading(false);
        return undefined;
      }
    } catch (error) {
      console.error('Error in getting the Stripe key:', error);
      setLoading(false);
      return undefined;
    }
  };

  const _handleBooking = async (booking: Booking): Promise<void> => {
    setLoading(true);
    //const booking_Data = {...booking, OrderId: Generate_OrderID()};
    set_bookingData(prev => {
      return {
        ...prev,
        OrderId: Generate_OrderID(),
        Status: 'Pending',
      };
    });
    console.log('Booking', booking);
    if (bookingData?.OrderId) {
      try {
        await firestore()
          .collection('bookings')
          .doc(auth.currentUser?.uid)
          .collection('individual_bookings')
          // .add({
          //   OrderId: booking.OrderId,
          //   Vechicle: booking.Vechicle,
          //   date: booking.date,
          //   time: booking.time,
          //   from: booking.from,
          //   to: booking.to,
          //   price: booking.price,
          //   passongers: booking.passongers,
          //   createdAt: booking.createdAt,
          //   createdBy: booking.createdBy,
          // })
          .add(bookingData)
          .then(() => {
            setLoading(false);
            reinitialize();
            console.log('Booking added to the server');
          })
          .catch(error => {
            setLoading(false);
            console.error('Error adding booking:', error);
          });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      set_error('Booking is Not Initialized');
    }
  };

  const Context_Function = {
    testFunction,
    _handleBooking,
    _getStripePublishableKey,
    _getlocationSuggestions,
    Generate_OrderID,
    _getGeoApiKey,
    _updateBookingData,
    _update_BookingData,
    ServerLoading,
    bookingData,
  };

  return (
    <OZoveContext.Provider value={Context_Function}>
      {children}
    </OZoveContext.Provider>
  );
};

export const useOzove = (): AuthContextType => {
  const context = useContext(OZoveContext);
  if (!context) {
    throw new Error('useOzove must be used within an OzoveProvider');
  }
  return context;
};
