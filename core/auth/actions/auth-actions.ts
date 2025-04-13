import { chainSentinelApi } from "../api/chainSentinelApi";
import { User } from "../interface/user";

export interface AuthRepsonse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

const returnUserToke = (data: AuthRepsonse) => {
  //   const { id, email, fullName, isActive, roles, token } = data;
  const { token, ...user } = data;

  //   const user: User = {
  //     id,
  //     email,
  //     fullName,
  //     isActive,
  //     roles,
  //   };
  return { user, token };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const { data } = await chainSentinelApi.post<AuthRepsonse>("/auth/login", {
      email,
      password,
    });

    return returnUserToke(data);
  } catch (error) {
    console.log("Error in authLogin", error);
    return null;
  }
};

export const authCkeckStatus = async () => {
  try {
    const { data } = await chainSentinelApi.get<AuthRepsonse>("/auth/status");

    return returnUserToke(data);
  } catch (error) {
    console.log("Error in authCkeckStatus", error);
    return null;
  }
};

//TODO : Hacer el register
