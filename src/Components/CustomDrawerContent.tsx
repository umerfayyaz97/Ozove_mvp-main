import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useAuth} from '../Context/authContext';
import {useAppSelector} from '../hooks/useRedux';
import {getAuth} from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawerContent = (props: any) => {
  const {signOut} = useAuth();
  const auth = getAuth();

  const handleSignOut = async () => {
    await signOut();
    props.navigation.navigate('Main');
  };

  const menuItems = [
    {
      id: 1,
      title: 'Bookings',
      icon: 'package-variant-closed',
      route: 'Bookings',
    },
    {
      id: 2,
      title: 'Help',
      icon: 'phone',
      route: 'Help',
    },
    {
      id: 3,
      title: 'App Settings',
      icon: 'cog',
      route: 'AppSettings',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileContent}>
          <Image
            source={{
              uri:
                auth.currentUser?.photoURL || 'https://via.placeholder.com/150',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Leslie Alexander</Text>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => props.navigation.navigate('Account')}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => props.navigation.navigate(item.route)}>
            <Icon name={item.icon} size={24} color="#000" />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Icon name="logout" size={20} color="#FF3B30" />
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    backgroundColor: '#F4AF48',
    paddingTop: 60,
    paddingBottom: 20,
  },
  profileContent: {
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  editProfileButton: {
    paddingVertical: 4,
  },
  editProfileText: {
    fontSize: 14,
    color: '#000',
  },
  menuContainer: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#000',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    margin: 24,
    padding: 16,
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  signOutText: {
    color: '#FF3B30',
    fontSize: 16,
    marginLeft: 12,
  },
});

export default CustomDrawerContent;
