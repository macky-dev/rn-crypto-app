import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from 'react-native';

import MainLayout from '../components/MainLayout';
import HeaderBar from '../components/HeaderBar';
import { dummyData, icons } from '../constants';
import { styles } from './ProfileScreen.styles';

const SectionTitle = ({ title }) => {
  return (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
};

const Setting = ({ title, value, type, onPress }) => {
  if (type === 'button') {
    return (
      <TouchableOpacity style={styles.settingItemContainer} onPress={onPress}>
        <Text style={styles.settingItemText}>{title}</Text>
        <View style={styles.settingItemValueContainer}>
          <Text style={styles.settingItemValue}>{value}</Text>
          <Image
            source={icons.rightArrow}
            style={styles.settingItemValueIcon}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.settingItemContainer}>
        <Text style={styles.settingItemText}>{title}</Text>
        <Switch value={value} onValueChange={value => onPress(value)} />
      </View>
    );
  }
};

const ProfileScreen = () => {
  const [faceId, setFaceId] = useState(true);

  return (
    <MainLayout>
      <View style={styles.container}>
        {/* Header */}
        <HeaderBar title="Profile" />

        {/* Details */}
        <ScrollView>
          {/* Email & User ID */}
          <View style={styles.emailIdContainer}>
            {/* Email & ID */}
            <View style={styles.emailIdContainerInnerLeft}>
              <Text style={styles.emailText}>{dummyData.profile.email}</Text>
              <Text style={styles.idText}>{`ID: ${dummyData.profile.id}`}</Text>
            </View>
            {/* Status */}
            <View style={styles.emailIdContainerInnerRight}>
              <Image source={icons.verified} style={styles.verifiedImage} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>

          {/* APP */}
          <SectionTitle title="APP" />

          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log('Pressed')}
          />

          <Setting
            title="Appearance"
            value="Dark"
            type="button"
            onPress={() => console.log('Pressed')}
          />

          <SectionTitle title="ACCOUNT" />

          <Setting
            title="Payment Currency"
            value="USD"
            type="button"
            onPress={() => console.log('Pressed')}
          />

          <Setting
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log('Pressed')}
          />

          <SectionTitle title="SECURITY" />

          <Setting
            title="FaceID"
            value={faceId}
            type="switch"
            onPress={value => setFaceId(value)}
          />

          <Setting
            title="Password Settings"
            type="button"
            onPress={() => console.log('Pressed')}
          />

          <Setting
            title="Change Password"
            type="button"
            onPress={() => console.log('Pressed')}
          />

          <Setting
            title="2-Factor Authentication"
            type="button"
            onPress={() => console.log('Pressed')}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default ProfileScreen;
