import axios from "config/axios";
import { User } from "models";

export const fetchMe = async (): Promise<User | void> => {
	try {
		const res = await axios.get("/users/me", { withCredentials: true });
		return res.data;
	} catch (err: any) {}
};

export const postLogin = async (loginData: { email: string; password: string }): Promise<void> => {
	await axios.post("/auth/login", loginData, { withCredentials: true });
};

export const postSignup = async (signupData: { email: string; username: string; password: string }): Promise<void> => {
	await axios.post("/auth/register", signupData);
};
