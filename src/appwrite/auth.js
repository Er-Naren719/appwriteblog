import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appWriteUrl)
			.setProject(conf.appWriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount(email, password, name) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				// login the user after creation
				return this.login(email, password);
			}
			return userAccount;
		} catch (error) {
			console.error("Error creating account:", error);
			throw error;
		}
	}

	async login(email, password) {
		try {
			const session = await this.account.createEmailSession(email, password);
			return session;
		} catch (error) {
			console.error("Error logging in:", error);
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			const user = await this.account.get();
			if (!user) {
				throw new Error("User not found");
			}
			return user;
		} catch (error) {
			console.error("Error getting current user:", error);
			throw error;
		}
	}

	async logout() {
		try {
			await this.account.deleteSessions();
			return true;
		} catch (error) {
			console.error("Error logging out:", error);
			throw error;
		}
	}
}

const authService = new AuthService();
export default authService;
