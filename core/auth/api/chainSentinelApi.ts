import axios from "axios";

// ToDO conect thougt envs vars, Android, iOS

const chainSentinelApi = axios.create({
  baseURL: "localhost:3000/api",
});
// TODO interceptors

export { chainSentinelApi };
