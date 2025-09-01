import {
  Account,
  Avatars,
  Client,
  Databases,
  Functions,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

interface SignInParams {
  email: string;
  password: string;
}

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: "com.ka.foodordering",
  databaseId: "68a4ab2800257115d888",
  bucketId: "68a6368b0011d34b0bf9",
  userCollectionId: "68a4cd530012e590055f",
  categoriesCollectionId: "68a631460036971341f1",
  menuCollectionId: "68a6325b0033274103f8",
  customizationsCollectionId: "68a6347b0023f9c71341",
  menuCustomizationsCollectionId: "68a635d80006c2516713",
  orderCollectionId: "orders",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint as string)
  .setProject(appwriteConfig.project as string)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);
export const functions = new Functions(client);

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = await avatars.getInitialsURL(name);

    const userDocument = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { email, name, accountId: newAccount.$id, avatar: avatarUrl }
    );

    return userDocument;
  } catch (e) {
    console.error("Error creating user:", e);
    throw new Error(e as string);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    // try {
    //   await account.deleteSession("current");
    // } catch {
    //   // ignore if no session exists
    // }
    await account.createEmailPasswordSession(email, password);
  } catch (e) {
    console.log("Error signing in:", e);
    throw e;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (e) {
    console.log(e);
    throw new Error(e as string);
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession("current");
    console.log("User signed out successfully");
    return true;
  } catch (e) {
    console.error("Error signing out:", e);
    throw new Error("Failed to sign out");
  }
};

export const getMenu = async ({
  category,
  query,
}: {
  category?: string;
  query?: string;
}) => {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));

    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    );

    return menus.documents;
  } catch (e) {
    throw new Error(e as string);
  }
};

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );

    return categories.documents;
  } catch (e) {
    throw new Error(e as string);
  }
};

export async function createPaymentIntent(amount: number, currency: string) {
  try {
    const response = await functions.createExecution(
      "68b19115001d39aa08af",
      JSON.stringify({ amount, currency })
    );

    console.log("Function response:", JSON.stringify(response, null, 2));

    if (!response.responseBody) {
      throw new Error("No response body from payment function");
    }

    const parsed = JSON.parse(response.responseBody);

    if (!parsed.clientSecret) {
      throw new Error("No client secret in response");
    }

    return parsed.clientSecret;
  } catch (e) {
    console.error("Payment intent creation failed:", e);
    throw new Error(
      "Failed to create payment intent. Please check your Appwrite Function."
    );
  }
}

export const createOrder = async (orderData: any) => {
  try {
    const currentUser = await getCurrentUser();

    const orderDocument = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.orderCollectionId,
      ID.unique(),
      {
        ...orderData,
        userId: currentUser.$id,
        items: JSON.stringify(orderData.items),
      }
    );

    return orderDocument;
  } catch (e) {
    console.error("Error creating order:", e);
    throw new Error(e as string);
  }
};
