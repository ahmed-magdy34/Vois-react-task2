import { AuthResponse } from "../features/auth/authTypes";
import { API_KEY } from "../firebase";

export async function firebaseSignUp(email: string, password: string) {
  const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

  const payload = {
    email,
    password,
    returnSecureToken: true,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Firebase returns an error message in responseData.error.message
      throw new Error(responseData.error.message || "Failed to sign up");
    }

    return responseData as AuthResponse;
  } catch (error) {
    // Here you could log the error or perform additional processing
    console.error("Error during Firebase sign-up:", error);
    throw error;
  }
}

export async function firebaseLogin(email: string, password: string) {
  const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  const payload = {
    email,
    password,
    returnSecureToken: true,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Parse the response data, even if it's an error
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error.message || "Failed to log in");
    }

    return responseData as AuthResponse;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
