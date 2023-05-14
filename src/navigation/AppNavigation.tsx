import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/base'
;
import RestaurantStack from './RestaurantStack'
import FavoriteStack from './FavoriteStack'
import AccountStack from './AccountStack';
import SearchStack from './SearchStack';
import RankingStack from './RankingStack';
import { screen } from '../utils/screenName';


interface TabBarIconProps {
    route: any;
    color: string;
    size: number;
  }


const Tab = createBottomTabNavigator()

const AppNavigation = () =>{

    const getTabBarIcon = ({ route, color, size }: TabBarIconProps) => {       

       const tabIcons : {[key:string]:string} = {
        'RestaurantsTab' : 'compass-outline',
        'FavoritesTab'  : 'heart-outline',
        'RankingTab'    : 'star-outline',
        'SearchTab'     : 'magnify',
        'AccountTab'    : 'home-outline'
       }

       return (
        <Icon type='material-community' name={tabIcons[route.route.name]} color={color} size={size}/>
       )
    }
 

    return (
        <Tab.Navigator screenOptions={(route)=>(
            {   tabBarActiveTintColor : "#00a680",
                tabBarInactiveTintColor : "#646464",
                tabBarIcon : ({ color, size }) => getTabBarIcon({route,color,size}),
                headerShown:false
            }
        )}>
            <Tab.Screen 
                name={screen.restaurant.tab} 
                component={RestaurantStack} 
                options={{title:'Restaurantes', headerShown: false}}
                />
            <Tab.Screen 
                name={screen.account.tab} 
                component={AccountStack}
                options={{title:'Account'}}
                />
            <Tab.Screen 
                name={screen.favorites.tab} 
                component={FavoriteStack}
                options={{title:'Favorites'}}
                />
            <Tab.Screen 
                name={screen.ranking.tab} 
                component={RankingStack}
                options={{title:'Ranking'}}
                />
            <Tab.Screen 
                name={screen.search.tab} 
                component={SearchStack}
                options={{title:'Search'}}
                />
        </Tab.Navigator>
    )
}



export default AppNavigation