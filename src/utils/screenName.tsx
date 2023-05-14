interface RestaurantStack {
    tab: 'RestaurantsTab';
    restaurants: 'Restaurants';
    addRestaurant: 'AddRestaurant';
    restaurant: 'Restaurant';
    addReview:'AddReview'
  }
  
  interface FavoritesStack {
    tab: 'FavoritesTab';
    favorites: 'Favorites';
  }
  
  interface RankingStack {
    tab: 'RankingTab';
    ranking: 'Ranking';
  }
  
  interface AccountStack {
    tab: 'AccountTab';
    account: 'Account';
    login: 'Login';
    register: 'Register';
  }
  
  interface SearchStack {
    tab: 'SearchTab';
    search: 'Search';
  }
  
  interface Screen {
    restaurant: RestaurantStack;
    favorites: FavoritesStack;
    ranking: RankingStack;
    account: AccountStack;
    search: SearchStack;
  }
  
  export const screen: Screen = {
    restaurant: {
      tab: 'RestaurantsTab',
      restaurants: 'Restaurants',
      addRestaurant: 'AddRestaurant',
      restaurant: 'Restaurant',
      addReview:'AddReview'
    },
    favorites: {
      tab: 'FavoritesTab',
      favorites: 'Favorites'
    },
    ranking: {
      tab: 'RankingTab',
      ranking: 'Ranking'
    },
    account: {
      tab: 'AccountTab',
      account: 'Account',
      login: 'Login',
      register: 'Register'
    },
    search: {
      tab: 'SearchTab',
      search: 'Search'
    }
  };
  