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
