import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackIcon from '../../../../assests/back_icon.svg';
import {useOzove} from '../../../Context/ozoveContext';

interface BookingDescription {
  showNextScreen: number;
  setShowNextScreen: (value: number) => void;
  set_contactDetails: (value: string) => void;
  contactDetails: string;
  notes: string;
  set_notes: (value: string) => void;
}

const BookingDescription: React.FC<BookingDescription> = ({
  showNextScreen,
  setShowNextScreen,
  set_contactDetails,
  contactDetails,
  notes,
  set_notes,
}) => {
  const {bookingData} = useOzove();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <TouchableOpacity
        onPress={() => {
          setShowNextScreen(showNextScreen - 1);
        }}>
        <View>
          <BackIcon />
        </View>
      </TouchableOpacity>

      <ScrollView style={{width: '100%', marginBottom: 100}}>
        <View>
          <Text style={{color: '#4A4A4A', fontWeight: 'bold', fontSize: 24}}>
            Booking Details
          </Text>
        </View>

        <View style={{marginTop: 10}}>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Pick up Contact Details
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            {/*Contact Details Button */}
            <TouchableOpacity
              onPress={() => {
                set_contactDetails('me');
              }}>
              <View
                style={{
                  margin: 10,
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: contactDetails === 'me' ? '#FFAF19' : '#CFD3CF',
                  backgroundColor:
                    contactDetails === 'me' ? '#ffae194e' : '#F0F0F0',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>ME</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                set_contactDetails('Someone_else');
              }}>
              <View
                style={{
                  margin: 10,
                  marginHorizontal: 20,
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor:
                    contactDetails === 'Someone_else' ? '#FFAF19' : '#CFD3CF',
                  backgroundColor:
                    contactDetails === 'Someone_else' ? '#ffae194e' : '#F0F0F0',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Someone Else{' '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#CFD3CF',
            borderRadius: 12,
            padding: 2,
          }}>
          <TextInput
            style={{
              minHeight: 150,

              backgroundColor: '#F0F0F0',
              textAlignVertical: 'top', // Ensures placeholder and text start from the top
              padding: 10,
              borderRadius: 5,
              fontSize: 16,
            }}
            placeholder="Notes For Driver"
            placeholderTextColor="#888"
            multiline={true}
            value={notes}
            onChangeText={text => {
              set_notes(text);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingDescription;
