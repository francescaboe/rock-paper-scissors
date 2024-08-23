import axios from 'axios';
const BASE_URL = 'http://localhost:4000'; // process.env.BASE_URL

export const createRoomApi = async ({ username }: { username: string }) => {
  const response = await axios.post(`${BASE_URL}/start-game`, { username });
  return response.data;
};

export const joinRoomApi = async ({ username, roomId }: { username: string; roomId: string }) => {
  const response = await axios.post(`${BASE_URL}/join-game`, { username, roomId });
  return response.data;
};
