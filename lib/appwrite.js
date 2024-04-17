import {
	Account,
	Databases,
	Client,
	ID,
	Avatars,
	Query,
} from "react-native-appwrite";

export const appwriteConfig = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.ttd.aora",
	projectId: "661c0400aeac0ad9590a",
	databaseId: "661c05d874d5067cdcf3",
	userCollectionId: "661c0604a27be11c794c",
	videoCollectionId: "661c0657a657abb0570d",
	storageId: "661c07b0069568117a0f",
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	userCollectionId,
	videoCollectionId,
	storageId,
} = appwriteConfig;
// Init your react-native SDK
const client = new Client();

client
	.setEndpoint(endpoint) // Your Appwrite Endpoint
	.setProject(projectId) // Your project ID
	.setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username,
		);
		if (!newAccount) throw new Error("Error creating account");

		const avatarUrl = avatars.getInitials(username);
		await signIn(email, password);
		const newUser = await databases.createDocument(
			databaseId,
			userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl,
			},
		);
		return newUser;
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};

export const signIn = async (email, password) => {
	try {
		const session = await account.createEmailSession(email, password);
		if (!session) throw new Error("Error signing in");
		return session;
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw new Error("Error getting current account");
		const currentUser = await databases.listDocuments(
			databaseId,
			userCollectionId,
			[Query.equal("accountId", currentAccount.$id)],
		);
		if (!currentUser) throw new Error("Error getting current user");
		return currentUser.documents[0];
	} catch (error) {
		console.error("Error getting current user", error);
		throw new Error("Error getting current user");
	}
};

export const getAllPosts = async () => {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId);
		return posts.documents;
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};

export const getLatestPosts = async () => {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId, [
			Query.orderDesc("$createdAt", Query.limit(7)),
		]);
		return posts.documents;
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};

export const searchPosts = async (query) => {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId, [
			Query.search("title", query),
		]);

		if (!posts) throw new Error("Error searching posts");
		return posts.documents;
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};
