import conf from "../conf/conf.js";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class ConfigService {
	client = new Client();
	databases;
	storage;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.storage = new Storage(this.client);
	}

	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.error("Error creating post:", error);
			throw error;
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			console.error("Error updating post:", error);
			throw error;
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			console.error("Error deleting post:", error);
			return false;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.error("Error getting post:", error);
			throw error;
		}
	}

	async getPosts() {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				[Query.equal("status", "active")]
			);
		} catch (error) {
			console.error("Error getting posts:", error);
			throw error;
		}
	}

	// Uploads a file to Appwrite Storage
	async uploadFile(file) {
		try {
			return await this.storage.createFile(
				conf.appwriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.error("Error uploading file:", error);
			throw error;
		}
	}

	// Deletes a file from Appwrite Storage
	async deleteFile(fileId) {
		try {
			await this.storage.deleteFile(conf.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.error("Error deleting file:", error);
			return false;
		}
	}

	getFilePreview(fileId) {
		return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
	}
}

const DatabaseService = new ConfigService();

export default DatabaseService;
