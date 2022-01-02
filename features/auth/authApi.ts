import axios from "config/axios";
import { User } from "models";

export const fetchMe = async (jwt: string): Promise<User | void> => {
	try {
		const res = await axios.get("/users/me", { headers: { Authorization: `Bearer ${jwt}` } });
		return res.data;
	} catch (err: any) {
		if (err.response?.status === 401) {
			localStorage.removeItem("token");
		}
	}
};

export const postLogin = async (loginData: { email: string; password: string }): Promise<string> => {
	const res = await axios.post("/auth/login", loginData);
	return res.data.token;
};

export const postSignup = async (signupData: { email: string; username: string; password: string }): Promise<void> => {
	await axios.post("/auth/register", signupData);
};
