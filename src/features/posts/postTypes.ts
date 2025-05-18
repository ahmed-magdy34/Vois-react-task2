/**
 * This file defines the Post interface and FirestorePostResponse interface.
 * The Post interface represents the structure of a blog post,
 * including fields like id, title, content, createdAt, email, url, and name.
 * The FirestorePostResponse interface represents the structure of a response
 * from Firestore when fetching posts.
 * It includes the document name and fields with their respective types.
 *
 */

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  email: string;
  url?: string; // Optional field
  name: string;
}

// Firebase-specific response structure
export interface FirestorePostResponse {
  name: string; // The document name in Firestore

  fields: {
    id: { stringValue: string };
    title: { stringValue: string };
    content: { stringValue: string };
    createdAt: { timestampValue: string };
    email: { stringValue: string };
    url?: { stringValue: string };
  };
}
