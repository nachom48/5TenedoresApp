import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils/screenName";
import FavoritesScreen from "../screens/FavoritesScreen/FavoritesScreen";


const Stack = createNativeStackNavigator();

const FavoriteStack = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={screen.favorites.favorites} 
                component={FavoritesScreen} 
                options={{title:'Favorites'}}
                />
        </Stack.Navigator>
    )
}

export default FavoriteStack