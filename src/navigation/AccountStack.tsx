import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/Account/AccountScreen";
import { LoginScreen } from "../screens/Account/LoginScreen/LoginScreen";
import { RegisterScreen } from "../screens/Account/RegisterScreen/RegisterScreen";
import { screen } from "../utils/screenName";


const Stack = createNativeStackNavigator();

const AccountStack = () =>{
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={screen.account.account} 
                component={AccountScreen} 
                options={{title:'Account'}}
                />
            <Stack.Screen 
                name={screen.account.login} 
                component={LoginScreen} 
                options={{title:'Login'}}
                />
            <Stack.Screen 
                name={screen.account.register} 
                component={RegisterScreen} 
                options={{title:'Create a new account'}}
                />    
        </Stack.Navigator>
    )
}

export default AccountStack