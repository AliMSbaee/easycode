import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import {WheelPicker} from 'react-native-wheel-picker-android';

const {width} = Dimensions.get('window');
const itemMaxLength = Math.floor(width / 10);

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(2);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  const onItemSelected = (selectedItemIndex) => {
    setSelectedItemIndex(selectedItemIndex);
  };

  const wheelPickerData = data.map((item) =>
    item.title.length > itemMaxLength
      ? `${item.title.substr(0, itemMaxLength)}...`
      : item.title,
  );

  return isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#f0c22e" />
    </View>
  ) : data.length === 0 ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No data was found</Text>
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Choose</Text>
        <Text style={styles.headerText}>
          You have multiple units in this account, {'\n'} Please choose one
        </Text>
        <View style={styles.selectedItemPlaceholder}>
          <Text style={styles.selectedItemPlaceholderText}>
            {data[selectedItemIndex]?.title ?? 'NAME Unit'}
          </Text>
        </View>
      </View>

      <View style={styles.WheelContainer}>
        <View style={styles.selectedItemBackground} />
        <WheelPicker
          data={wheelPickerData}
          selectedItem={selectedItemIndex}
          selectedItemTextColor="white"
          itemTextSize={20}
          selectedItemTextSize={20}
          onItemSelected={onItemSelected}
          hideIndicator={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    color: '#0f8cbd',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 70,
  },
  selectedItemPlaceholder: {
    paddingHorizontal: 15,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#DDD',
    borderWidth: 1,
    height: 60,
  },
  selectedItemPlaceholderText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
  },
  WheelContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  selectedItemBackground: {
    position: 'absolute',
    height: Platform.OS === 'ios' ? 43 : 38,
    backgroundColor: '#f0c22e',
    top: '50%',
    transform: [{translateY: Platform.OS === 'ios' ? -21 : -24}],
    right: 0,
    left: 0,
  },
});
