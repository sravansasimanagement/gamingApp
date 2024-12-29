export interface GameItem {
  id: string;
  title: string;
  description: string;
  image: any;
  isFavorite: boolean;
  popularity: number;
  region: string;
  playerCount: number;
}

// Define the type for a game category
interface GameCategory {
  id: string;
  title: string;
  icon: any;
  data: GameItem[];
}

// Define the type for the entire game list
export type GameList = GameCategory[];
