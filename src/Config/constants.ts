import Vech1_large from '../../assests/Vechicles/VITO_large_1.png';
import Vech2_large from '../../assests/Vechicles/VITO_2_large.png';
import Vech3_large from '../../assests/Vechicles/VITO_3_large.png';

export const Additional_services = [
  {
    id: 1,
    title: 'Split Payment',
    subtitle: '',
    toggle: true,
    price: 0,
  },
  {
    id: 2,
    title: 'Hourly Bookings',
    subtitle: 'Minimum 3 Hours',
    toggle: false,
    price: '10.0',
  },
  {
    id: 2,
    title: 'Add More Vehicles',
    subtitle: 'Book up to 3 Vehicles',
    toggle: true,
    price: '10.0',
  },
  {
    id: 2,
    title: 'Luggage Trailer',
    subtitle: '',
    toggle: true,
    price: '10.0',
  },
];

export const Vechicle_data = [
  {
    id: 1,
    title: 'Small Van',
    capacity: 8,
    price: 4.5,
    image: Vech1_large,
    details: {
      Full_name: 'Mercedes-Benz V-Class or Toyota Hi-Ac',
      per_person_price: 4.45,
      minimum_capacity: 6,
      image: Vech1_large,
    },
  },
  {
    id: 2,
    title: 'Large Van',
    capacity: 10,
    price: 0,
    image: Vech2_large,
    details: {
      Full_name: 'Mercedes-Van V-Class or Toyota Hi-Ac',
      per_person_price: 7.45,
      minimum_capacity: 4,
      image: Vech2_large,
    },
  },
  {
    id: 3,
    title: 'Bus',
    capacity: 30,
    price: 0,
    image: Vech3_large,
    details: {
      Full_name: 'Mercedes-Bus V-Class or Toyota Hi-Ac',
      per_person_price: 17.45,
      minimum_capacity: 16,
      image: Vech3_large,
    },
  },
];
