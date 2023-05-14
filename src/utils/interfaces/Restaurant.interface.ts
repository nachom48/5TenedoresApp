export interface Restaurant {
    name: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    location:  {
      latitude: number;
      longitude: number;
      latitudeDelta:number;
      longitudeDelta:number;
    };
    images: string[];
    id: number;
    createdAt: Date;
    ratingMedia?:number | null,
    idFavorite?:string
  }
  