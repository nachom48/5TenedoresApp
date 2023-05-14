import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type RootTabParamList = {
  Restaurant: undefined;
  Account: undefined;
  Favorites: undefined;
  Ranking: undefined;
  Search: undefined;
};

type RestaurantScreenRouteProp = RouteProp<RootTabParamList, 'Restaurant'>;
type RestaurantScreenNavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  'Restaurant'
>;

export type RestaurantScreenProps = {
  route: RestaurantScreenRouteProp;
  navigation: RestaurantScreenNavigationProp;
};
