import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity, Dimensions, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Chips from './Chips';
import DiningHallScreen from './DiningHallScreen';
import { ChipsProvider } from './ChipsContext';

const Stack = createStackNavigator();

export default function App() {
  const [stationsData, setStationsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://hoos-allergic-4db64707fc14.herokuapp.com/api/stations');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStationsData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('There has been a problem with your fetch operation: ', error);
      }
    };
  
    fetchData();
  }, []);
  
  

  const diningHalls = [
    { 
      name: 'Observatory Hill Dining Hall', 
      image: 'https://branchbuilds.com/wp-content/uploads/2021/09/observatory-hill-03.jpg', 
      Stations: isLoading ? "Loading..." : `${stationsData[0]}`,
      stations: [
        { name: "The Iron Skillet", foods: ["Cheesburger Mac & Cheese Bowl", "Biscuits & Sausage Gravy", "Grits"] },
        { name: "Copper Hood", foods: ["Black Beans & Rice with Bacon", "Green Chili Calabacitas", "Fresh Food Salad"] },
        { name: "Trattoria - Pizza", foods: ["Southwest Ham Breakfast Pizza", "Classic Cheese Pizza", "Pepperonin Pizza"] },
      ]
    },
    { 
      name: 'Newcomb Dining Hall', 
      image: 'https://www.coleanddenny.com/wp-content/uploads/2020/07/HDPhoto_130723_07_FS1.jpg', 
      Stations: isLoading ? "Loading..." : `${stationsData[1]}`,
      stations: [
        { name: "Station 1", foods: ["Food Item 1", "Food Item 2", "Food Item 3"] },
        { name: "Station 2", foods: ["Food Item 4", "Food Item 5", "Food Item 6"] },
        { name: "Station 3", foods: ["Food Item 7", "Food Item 8", "Food Item 9"] },
      ]
    },
    { 
      name: 'Runk Dining Hall', 
      image: 'https://tipton-associates.com/wp-content/uploads/2020/09/RunkDiningHall_Img1.jpg', 
      Stations: isLoading ? "Loading..." : `${stationsData[2]}`,
      stations: [
        { name: "Station 1", foods: ["Food Item 1", "Food Item 2", "Food Item 3"] },
        { name: "Station 2", foods: ["Food Item 4", "Food Item 5", "Food Item 6"] },
        { name: "Station 3", foods: ["Food Item 7", "Food Item 8", "Food Item 9"] },
      ]
    },
  ];
  
  
  
  

  // Get the screen width
  const screenWidth = Dimensions.get('window').width;

  // Calculate the number of columns: use 1 for small devices and 2 for large devices
  const numColumns = screenWidth > 500 ? 2 : 1;

  // Calculate the width of each dining hall container
  const containerWidth = (screenWidth - 40) / numColumns - 10;

  return (
    <ChipsProvider>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
        name="Home"
        options={{ headerShown: false , title: ''}} 
      >
          {props => (
            <View style={styles.container}>
              <ImageBackground source={{ uri: 'https://media.licdn.com/dms/image/D4E16AQEhhFL-_sZ_xQ/profile-displaybackgroundimage-shrink_200_800/0/1667594600063?e=2147483647&v=beta&t=bWvcgGTNQOcJBh7nuRQmjOt1YF6N3rHr6aiNxcJpDWo' }} style={styles.topBar}></ImageBackground>
              <Chips /> 
              <Text style={styles.title}>Dining Halls</Text>
              <ScrollView contentContainerStyle={styles.diningHallList}>
                {diningHalls.map((diningHall, index) => (
                  <TouchableOpacity key={index} style={[styles.diningHallContainer, { width: containerWidth }]} onPress={() => props.navigation.navigate('DiningHall', { diningHall })}>
                    <Image source={{ uri: diningHall.image }} style={styles.diningHallImage} />
                    <Text style={styles.diningHallName}>{diningHall.name}</Text>
                    <Text style={styles.diningHallStations}>Available Stations: {diningHall.Stations}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen 
          name="DiningHall" 
          component={DiningHallScreen}
          options={({ route }) => ({ 
            title: route.params.diningHall.name,
            headerLeft: () => null, // This line hides the default back button
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ChipsProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: Dimensions.get('window').height/6,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  diningHallList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // centers items horizontally
    alignItems: 'center', // centers items vertically
  },
  diningHallContainer: {
    width: '48%',
    borderColor: '#0C1439',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  diningHallName: {
    paddingTop: 10,
    fontSize: 15,
    marginBottom: 20,
  },
  diningHallImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  diningHallStations: {
    fontSize: 12,
    color: 'gray',
    bottom:15,
    left: 10,
    alignItems: 'center',
    marginRight: 12,
  },
});
