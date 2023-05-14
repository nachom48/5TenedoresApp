import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils/screenName";
import RankingScreen from "../screens/Ranking/RankingScreen";


const Stack = createNativeStackNavigator();

const RankingStack = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={screen.ranking.ranking} 
                component={RankingScreen} 
                options={{title:'Ranking'}}
                />
        </Stack.Navigator>
    )
}

export default RankingStack