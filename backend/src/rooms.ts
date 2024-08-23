// @ts-ignore
import { v4 as uuidv4 } from 'uuid'; // TODO: fix type error
import { Rooms, Room } from './types';

const rooms: Rooms = {};

/**
 * Creates a new room with a unique 6-character room ID and adds the given username as the first player.
 *
 * @param username - The username of the player creating the new room.
 * @returns The newly created room object.
 */
export const createRoom = (username: string): Room => {
  // Generate a unique 6-character code
  const roomId = uuidv4().slice(0, 6);
  const room: Room = {
    roomId,
    players: [username],
  };
  rooms[roomId] = room;
  return room;
};

/**
 * Joins a player to an existing room.
 *
 * @param roomId - The unique identifier of the room to join.
 * @param username - The username of the player joining the room.
 * @returns The updated room object if the player was successfully added, or `null` if the room is full.
 */
export const joinRoom = (roomId: string, username: string): Room | null => {
  const room = rooms[roomId];
  if (room && room.players.length < 2) {
    room.players.push(username);
    return room;
  }
  return null;
};

/**
 * Retrieves an existing room by its unique identifier.
 *
 * @param roomId - The unique identifier of the room to retrieve.
 * @returns The room object if it exists, or `undefined` if the room does not exist.
 */
export const getRoom = (roomId: string): Room | undefined => {
  return rooms[roomId];
};