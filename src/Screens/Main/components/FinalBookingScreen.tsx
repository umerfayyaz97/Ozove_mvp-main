import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackIcon from '../../../../assests/back_icon.svg';
import {styles} from '../../../Components/MainStyles';
import PickupLocationIcon from '../../../../assests/Pickup_icon.svg';
import {Box, Button, Divider, HStack, Modal, VStack} from 'native-base';

import {getAuth} from '@react-native-firebase/auth';
import {Booking, VehicleData} from '../../../Context/Types/ozove';
import {useOzove} from '../../../Context/ozoveContext';
import {useAppSelector} from '../../../hooks/useRedux';

// Define the interfaces for the props

interface ReviewBookingProps {
  showNextScreen: number;
  setShowNextScreen: (value: number) => void;
  set_showCancilation: (value: boolean) => void;
  selectedVehicle: number | null;
  Vechicle_data: VehicleData[];
  handleBookings: () => void;
  ServerLoading: boolean;
  toggleCancilationPolicyModel: () => void;
  showCancilation: boolean;
}

const FinalBookingScreen: React.FC<ReviewBookingProps> = ({
  showNextScreen,
  setShowNextScreen,
  set_showCancilation,
  selectedVehicle,
  Vechicle_data,
  handleBookings,
  ServerLoading,
  toggleCancilationPolicyModel,
  showCancilation,
}) => {
  const {bookingData} = useOzove();
  const [localLoading, set_localLoading] = useState(false);
  const {_handleBooking} = useOzove();
  const auth = getAuth();
  const User = auth.currentUser;
  const _LocalhandleBooking = async () => {
    set_localLoading(true);
    const booking_detail: Booking = {
      OrderId: '1',
      Vechicle: 'car',
      date: '12/3/2024',
      time: '15:30',
      from: 'perth',
      to: 'sad',
      price: 10,
      passongers: 5,
      createdAt: '12/3/2024',
      createdBy: User?.uid,
    };
    console.log('Booking Details:', booking_detail); // Debug
    await _handleBooking(booking_detail);
    set_localLoading(false);
  };

  return (
    <>
      <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
        <TouchableOpacity
          onPress={() => {
            setShowNextScreen(showNextScreen - 1);
          }}>
          <View>
            <BackIcon />
          </View>
        </TouchableOpacity>
        <ScrollView style={{width: '100%', marginBottom: 10}}>
          <View>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>
              Review Booking
            </Text>
          </View>
          {/*Pickup and destinaiton Location */}
          <View>
            <View style={styles.inputRow}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'relative',
                }}>
                <View style={styles.iconContainer}>
                  <PickupLocationIcon />
                </View>
                <View style={{flex: 1, gap: 10}}>
                  <TextInput
                    editable={false}
                    style={styles.inputField}
                    placeholderTextColor={'#333'}
                    placeholder="Add pickup location"
                    value={bookingData?.From}
                  />
                </View>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.inputRow}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'relative',
                }}>
                <View style={styles.iconContainer}>
                  <PickupLocationIcon />
                </View>
                <View style={{flex: 1, gap: 10}}>
                  <TextInput
                    editable={false}
                    style={styles.inputField}
                    placeholderTextColor={'#333'}
                    placeholder="Add pickup location"
                    value={bookingData?.To}
                  />
                </View>
              </View>
            </View>
          </View>

          {/*Car Details which is selected */}
          <View>
            <View
              style={{
                width: 150,
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                marginHorizontal: 10,
                backgroundColor: '#ffae194e',
                borderWidth: 1,
                borderColor: '#FFAF19',
              }}>
              <View
                style={{
                  marginLeft: 10,
                  height: 70,
                  width: 110,
                }}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                    borderRadius: 12,
                  }}
                  source={Vechicle_data[selectedVehicle || 0].image}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                }}>
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      color: '#4A4A4A',
                      fontSize: 14,
                      fontWeight: 600,
                    }}>
                    {Vechicle_data[selectedVehicle || 0]?.title}
                  </Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={{color: '#767676', fontSize: 8}}>
                    {`${Vechicle_data[selectedVehicle || 0]?.capacity} seater`}
                  </Text>
                </View>
                <View style={{marginLeft: 10, paddingBottom: 20}}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    {Vechicle_data[selectedVehicle || 0]?.price != 0 ? (
                      `$${Vechicle_data[selectedVehicle || 0].price}`
                    ) : (
                      <Text
                        style={{
                          color: '#333',
                          fontSize: 12,
                          fontWeight: 600,
                        }}>
                        Comming Soon{' '}
                      </Text>
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/*Cancilation Policy */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              padding: 20,
              width: '100%',
              borderRadius: 12,
              backgroundColor: '#ffae194e',
            }}>
            <View style={{width: '70%', flexDirection: 'column'}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Cancilation Policy{' '}
                </Text>
              </View>
              <View>
                <Text>
                  Cancellations made seven days or less before a trip are not
                  eligible for a refund
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => set_showCancilation(!showCancilation)}
                  style={{
                    width: 80,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    backgroundColor: '#FFAF19',
                  }}>
                  <Text>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/*Total Passengers */}
          <View
            style={{
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 12,
              borderColor: '#4E4E4C',
              padding: 10,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#4E4E4C',
                }}>
                Total passengers
              </Text>
              <Text style={{fontSize: 16, color: '#4E4E4C'}}>25</Text>
            </View>
          </View>

          {/*Price Breakdown */}
          <View
            style={{
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 12,
              borderColor: '#4E4E4C',
              padding: 10,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#4E4E4C',
                }}>
                Price Breakdown
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    Base Fee
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    Distance Charge
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    Time Charge
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    Tax
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  {/*Base Fee */}
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    $10.00
                  </Text>
                  {/*Distance Charge */}

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    $37.00
                  </Text>
                  {/*Time Charge */}

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    $22.00
                  </Text>
                  {/*Tax*/}

                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4E4E4C',
                      marginTop: 5,
                    }}>
                    $1.40
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{width: '80%'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#FFAF19',
                    }}>
                    Total Amount Per Person
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#FFAF19',
                    }}>
                    $10.40
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/*Book Ride Button */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
              marginTop: 10,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                disabled={ServerLoading}
                style={{
                  backgroundColor: '#FFAF19',
                  padding: 10,
                  borderRadius: 12,
                  paddingVertical: 20,
                }}
                onPress={_LocalhandleBooking}>
                {ServerLoading || localLoading ? (
                  <ActivityIndicator size={'small'} color={'#333'} />
                ) : (
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {'Book Ride '}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      {/*Cancilation Model for cancilation detail button */}
      <Modal
        isOpen={showCancilation}
        onClose={toggleCancilationPolicyModel}
        size="lg">
        <Pressable
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={toggleCancilationPolicyModel}>
          <Box
            width="90%"
            bg="white"
            borderRadius="lg"
            shadow={3}
            p={5}
            _dark={{bg: 'gray.800'}}>
            {/* Header */}
            <HStack justifyContent="space-between" alignItems="center" mb={4}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Cancellation policy
              </Text>
              <Pressable onPress={toggleCancilationPolicyModel}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>✕</Text>
              </Pressable>
            </HStack>
            <Divider mb={4} />

            {/* Body */}
            <Text
              style={{
                fontSize: 16,
                marginBottom: 10,
                fontWeight: 'bold',
              }}>
              Cancellations made seven days or less before a trip are not
              eligible for a refund.
            </Text>
            <VStack space={3}>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 10,
                  fontWeight: 'bold',
                }}>
                • <Text style={{fontWeight: 'bold'}}>100% refund:</Text>{' '}
                Cancellation is at least 30 days before trip date.
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 10,
                  fontWeight: 'bold',
                }}>
                • <Text style={{fontWeight: 'bold'}}>50% refund:</Text>{' '}
                Cancellation is between 29 and 8 days before trip date.
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 10,
                  fontWeight: 'bold',
                }}>
                • <Text style={{fontWeight: 'bold'}}>No refund:</Text>{' '}
                Cancellation is 7 or less days from trip date.
              </Text>
            </VStack>

            {/* Footer */}
            <Button
              mt={6}
              bg="amber.400"
              _text={{color: 'white', fontWeight: 'bold'}}
              onPress={toggleCancilationPolicyModel}>
              Got it
            </Button>
          </Box>
        </Pressable>
      </Modal>
    </>
  );
};

export default FinalBookingScreen;
