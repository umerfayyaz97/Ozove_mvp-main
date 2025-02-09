export interface Booking {
  OrderId?: string;
  Vechicle?: string;
  date?: string;
  time?: string;
  from?: string;
  to?: string;
  price?: number;
  passongers?: number;
  createdAt?: string;
  createdBy?: string;
}

export interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface VehicleData {
  image: string | undefined;
  title: string;
  capacity: number;
  price: number;
  details: {
    Full_name: string;
    per_person_price: number;
    minimum_capacity: number;
    image: string;
  };
}

export interface AdditionalServices {
  id: number;
  title: string;
  subtitle: string;
  toggle: boolean;
  price: number;
}
