// src/services/apiPosts.js
import { BASE_URL, db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import { FirestorePostResponse, Post } from "../features/posts/postTypes";

export async function getPostsAPI(): Promise<Post[]> {
  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Failed to fetch posts.");
  }

  const data = await response.json();

  return data.documents.map((doc: FirestorePostResponse) => ({
    id: doc.fields.id.stringValue,
    title: doc.fields.title.stringValue,
    content: doc.fields.content.stringValue,
    createdAt: doc.fields.createdAt.timestampValue,
    email: doc.fields.email.stringValue,
    url: doc.fields.url?.stringValue,
    name: doc.name,
  }));
}

export async function createPostAPI(
  post: { title: string; content: string; url?: string },
  token: string,
  email: string
): Promise<FirestorePostResponse> {
  // Generate a unique ID for the new post.
  const id: string = uuidv4();

  // Construct the payload with an "id" field along with the other fields.
  const payload = {
    fields: {
      id: { stringValue: id },
      title: { stringValue: post.title },
      content: { stringValue: post.content },
      createdAt: { timestampValue: new Date().toISOString() },
      email: { stringValue: email },
      url: { stringValue: post.url },
    },
  };

  // Build request headers.
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Make the POST request.
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Failed to create post");
  }

  return response.json();
}
export async function deletePostAPI(
  path: string,
  token: string
): Promise<boolean> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`https://firestore.googleapis.com/v1/${path}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    let errorMessage = "Failed to delete post";
    try {
      console.log(response);
      const errorData = await response.json();
      errorMessage = errorData.error?.message || errorMessage;
    } catch (e) {
      console.error("Error parsing response:", e);
    }
    throw new Error(errorMessage);
  }

  alert("Post deleted successfully");
  return response.ok;
}

// apiPosts.js

export async function updatePostSDK(
  documentId: string,
  updatedData: Partial<Post>
): Promise<boolean> {
  try {
    // Create a reference to the document in "posts" collection
    const postRef = doc(db, "posts", documentId);
    // Update only the fields provided in updatedData
    await updateDoc(postRef, updatedData);
    console.log("Post updated successfully!");
    return true;
  } catch (error) {
    console.error("Error updating post:", error.message);
    return false;
  }
}
