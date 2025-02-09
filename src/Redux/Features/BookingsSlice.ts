import {createSlice, PayloadAction} from '@reduxjs/toolkit';
//import {Booking} from '../../Context/Types/ozove';
interface bookingData {
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
}
interface BookingsState {
  bookings: bookingData[];
}

const initialState: BookingsState = {
  bookings: [],
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<bookingData[]>) => {
      state.bookings = action.payload;
    },
    clearBookings: state => {
      state.bookings = [];
    },
  },
});

export const {setBookings, clearBookings} = bookingsSlice.actions;
export default bookingsSlice.reducer;
