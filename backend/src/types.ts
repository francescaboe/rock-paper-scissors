export interface Room {
  roomId: string;
  players: string[];
}

export interface Rooms {
  [key: string]: Room;
}

export interface Player {
  name: string;
  choice: string;
  score: number;
}