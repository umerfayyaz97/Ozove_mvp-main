import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useAppSelector} from '../../hooks/useRedux';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState('Completed');
  const bookings = useAppSelector(state => state.bookings.bookings);
  const navigation = useNavigation();

  const renderBookingItem = ({item}) => (
    <View style={styles.bookingItem}>
      <View style={styles.bookingHeader}>
        <Text style={styles.vehicleText}>Premium Van</Text>
        <Text style={styles.priceText}>$5.28</Text>
      </View>

      <Text style={styles.dateText}>14-Jan-2023 16:32</Text>

      <View style={styles.locationContainer}>
        <Icon name="location" size={20} color="#F4AF48" />
        <Text style={styles.locationText}>Curtin University</Text>
      </View>

      <View style={styles.passengerContainer}>
        <Icon name="person" size={16} color="#666" />
        <Text style={styles.passengerText}>2</Text>
      </View>

      <View style={styles.spaceContainer}>
        <Icon name="cube" size={16} color="#666" />
        <Text style={styles.spaceText}>Spacecubed</Text>
      </View>
    </View>
  );

  const tabs = ['Draft', 'Completed', 'Cancelled'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Draft':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.emptyStateText}>No draft bookings</Text>
          </View>
        );
      case 'Completed':
        return (
          <FlatList
            data={bookings}
            renderItem={renderBookingItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No completed bookings</Text>
              </View>
            }
          />
        );
      case 'Cancelled':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.emptyStateText}>No cancelled bookings</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={24}
            color="#000"
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings</Text>
        <View style={styles.headerRight}>
          <Icon
            name="help-circle-outline"
            size={24}
            color="#000"
            style={styles.helpIcon}
          />
          <Icon
            name="funnel-outline"
            size={24}
            color="#000"
            style={styles.filterIcon}
          />
        </View>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentContainer}>{renderTabContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  helpIcon: {
    padding: 4,
  },
  filterIcon: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#F4AF48',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFF',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  bookingItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vehicleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F4AF48',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
  },
  passengerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  passengerText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  spaceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});
