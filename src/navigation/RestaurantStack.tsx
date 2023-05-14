import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Restaurants from "../screens/Restaurant/RestaurantsScreen/RestaurantsScreen";
import AddRestaurantScreen from "../screens/Restaurant/AddRestaurantScreen/AddRestaurantScreen";
import { screen } from "../utils/screenName";
import RestaurantScreen from "../screens/Restaurant/RestaurantScreen/RestaurantScreen";
import AddReviewRestaurantScreen from "../screens/Restaurant/AddReviewRestaurantScreen/AddReviewRestaurantScreen";


const Stack = createNativeStackNavigator();

const RestaurantStack = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={screen.restaurant.restaurants} 
                component={Restaurants} 
                options={{title:'Restaurants'}}
                />
            <Stack.Screen 
                name={screen.restaurant.addRestaurant} 
                component={AddRestaurantScreen} 
                options={{title:'New restaurant'}}
         />   
          <Stack.Screen 
                name={screen.restaurant.restaurant} 
                component={RestaurantScreen} 
                options={{title:'Restaurant'}}
         />   
           <Stack.Screen 
                name={screen.restaurant.addReview} 
                component={AddReviewRestaurantScreen} 
                options={{title:'New Review'}}
         />   
        </Stack.Navigator>
    )
}

export default RestaurantStack