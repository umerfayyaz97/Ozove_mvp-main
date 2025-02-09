import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import BackIcon from '../../../../assests/back_icon.svg';

import Callender from '../../../../assests/Callender.svg';
import Clock from '../../../../assests/Clock.svg';
import Per_person_price from '../../../../assests/per_person_price_icon.svg';

import {styles} from '../../../Components/MainStyles';
import {
  Avatar,
  Box,
  Button,
  CheckIcon,
  Divider,
  HStack,
  Modal,
  Select,
  TextField,
  VStack,
} from 'native-base';
import {AdditionalServices, VehicleData} from '../../../Context/Types/ozove';
import DateTimePicker from '@react-native-community/datetimepicker';
import {times} from '../../../Components/helpers';
import Entypo from 'react-native-vector-icons/Entypo';

interface BookingInputScreenProps {
  selectedVehicle: number | null;
  Vechicle_data: VehicleData[];
  setShowDatePicker: (value: boolean) => void;
  date: Date;
  showDatePicker: boolean;
  setDate: (value: Date) => void;
  selectedTime: string;
  setSelectedTime: (value: string) => void;
  setSelectedVehicle: (value: number | null) => void;
  Additional_services: any[];
  selecetedAdditonalServices: number | null;
  setSelectedAdditonalServices: (value: number | null) => void;
  setShowNextScreen: (value: number) => void;
  showNextScreen: number;
  pickupLocation: string;
  dropoffLocation: string;
}

const BookingInputScreen: React.FC<BookingInputScreenProps> = ({
  selectedVehicle,
  Vechicle_data,
  setShowDatePicker,
  date,
  showDatePicker,
  setDate,
  selectedTime,
  setSelectedTime,
  setSelectedVehicle,
  Additional_services,
  selecetedAdditonalServices,
  setSelectedAdditonalServices,
  setShowNextScreen,
  showNextScreen,
  pickupLocation,
  dropoffLocation,
}) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <TouchableOpacity
          style={{marginTop: 50, marginBottom: 20}}
          onPress={() => {
            setShowNextScreen(showNextScreen - 1);
          }}>
          <View>
            <BackIcon />
          </View>
        </TouchableOpacity>
        <View>
          <View style={{width: '100%'}}>
            <VStack space={4} mb={6} ml={1.5}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  backgroundColor: '#F0F0F0',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#ccc',
                }}>
                <Entypo
                  name="location-pin" // Icon name (verify in documentation)
                  size={20}
                  color="#000"
                  style={styles.icon}
                />
                <Text
                  style={{color: '#141921', fontWeight: 'bold', width: '95%'}}>
                  {pickupLocation}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  backgroundColor: '#F0F0F0',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: '#ccc',
                }}>
                <Entypo
                  name="location-pin" // Icon name (verify in documentation)
                  size={20}
                  color="#000"
                  style={styles.icon}
                />
                <Text
                  style={{color: '#141921', fontWeight: 'bold', width: '95%'}}>
                  {dropoffLocation}
                </Text>
              </View>
            </VStack>
          </View>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                fontSize: 20,
                color: '#4A4A4A',
                fontWeight: 'bold',
              }}>
              Select Date and Time
            </Text>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {/* Date Picker */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  height: 50,
                  borderWidth: 2,
                  borderColor: '#CFD3CF',
                  backgroundColor: '#FCFCFC',
                  gap: 5,
                  borderRadius: 15,
                }}
                onPress={() => setShowDatePicker(true)}>
                <Text style={styles.icon}>
                  <Callender />
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  {date.toDateString()}
                </Text>
                <Text style={styles.arrow}>▼</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  collapsable
                  mode="date"
                  display="calendar"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setDate(selectedDate);
                  }}
                />
              )}

              {/*Time Picker*/}
              <Select
                minWidth={120}
                marginLeft={5}
                marginRight={5}
                borderWidth={2}
                fontSize={16}
                borderColor={'#CFD3CF'}
                backgroundColor={'#FCFCFC'}
                borderRadius={12}
                textDecorationColor={'black'}
                fontWeight={'bold'}
                selectedValue={selectedTime}
                accessibilityLabel="Time"
                placeholder="Time"
                dropdownIcon={<Clock style={{marginRight: 20}} />}
                _selectedItem={{
                  bg: '#FFAF19',
                  endIcon: <CheckIcon style={{color: 'white'}} size="5" />,
                }}
                onValueChange={itemValue => {
                  setSelectedTime(itemValue);
                }}>
                {times?.map((item: any, index: number) => {
                  return <Select.Item key={index} label={item} value={item} />;
                })}
              </Select>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 20,
            color: '#4A4A4A',
            fontWeight: 'bold',
          }}>
          Select Vehicle Type
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
          }}>
          {Vechicle_data?.map((item, index) => {
            const isSelected = selectedVehicle === index;
            return (
              <TouchableOpacity
                key={index}
                style={{}}
                onPress={() => setSelectedVehicle(index)}>
                <View
                  key={index}
                  style={{
                    width: 110,
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                    marginHorizontal: 5,
                    backgroundColor: isSelected ? '#fff' : '#F0EFEf',
                    borderWidth: 2,
                    borderColor: isSelected ? '#FFAF19' : 'transparent',
                  }}>
                  <View
                    style={{
                      height: 90,
                      width: 90,
                    }}>
                    <Image
                      style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'contain',
                        borderRadius: 12,
                      }}
                      source={item?.image}
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
                        {item?.title}
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={{color: '#767676', fontSize: 8}}>
                        {`${item?.capacity} seater`}
                      </Text>
                    </View>
                    <View style={{marginLeft: 10, paddingBottom: 20}}>
                      <Text
                        style={{
                          color: '#333',
                          fontSize: 12,
                          fontWeight: 'bold',
                        }}>
                        {item?.price != 0 ? (
                          `$${item.price}`
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
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedVehicle !== null && (
          <View
            style={{
              marginVertical: 20,
              height: 200,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#FFAF19',
              elevation: 5,
              backgroundColor: '#FFEFC5',
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 2}}>
                <Text
                  style={{
                    color: '#333',
                    padding: 10,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {Vechicle_data[selectedVehicle]?.details.Full_name}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Per_person_price width={40} height={40} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#333',
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginLeft: 10,
                      }}>
                      {`$${Vechicle_data[selectedVehicle]?.details.per_person_price}`}
                    </Text>
                    <View>
                      <Text style={{color: '#000'}}>/person</Text>
                    </View>
                  </View>
                </View>

                <View style={{marginTop: 20, padding: 10}}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>{`8-13 | 12:33 pm | 3-5 min away`}</Text>

                  <Text
                    style={{
                      marginTop: 5,
                      color: '#767676',
                      fontWeight: 'bold',
                    }}>{`Minimum ${Vechicle_data[selectedVehicle]?.details?.minimum_capacity} Passengers`}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    marginLeft: -80,
                    height: 150,
                    width: 180,
                    resizeMode: 'contain',
                  }}
                  source={Vechicle_data[selectedVehicle]?.details?.image}
                />
              </View>
            </View>
          </View>
        )}
        {selectedVehicle !== null && (
          <View
            style={{
              marginVertical: 20,
              height: 'auto',
            }}>
            {Additional_services?.map((item: any, index: number) => {
              const isSelected = selecetedAdditonalServices === index;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedAdditonalServices(index)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 20,
                      borderRadius: 12,
                      backgroundColor: '#F0EFEF',
                      marginVertical: 5,
                      borderWidth: 2,

                      borderColor: isSelected ? '#FFAF19' : 'transparent',
                    }}>
                    <View>
                      <Text style={{color: '#000', fontWeight: 500}}>
                        {item?.title}
                      </Text>
                    </View>
                    <View>
                      {item?.price !== 0 ? (
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: 500,
                          }}>{`${item?.price} $`}</Text>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </>
  );
};

export default BookingInputScreen;
