import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          setUser(userDoc.exists() ? userDoc.data() : currentUser);
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register user
  const register = async (email, password, name, gender, phone, address) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user info in Firestore
      const userData = {
        uid: user.uid,
        name,
        gender,
        email,
        phone,
        address,
      };

      await setDoc(doc(db, "users", user.uid), userData);
      setUser(userData);
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error; // Rethrow for handling in UI
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch Firestore data
      const userDoc = await getDoc(doc(db, "users", user.uid));
      setUser(userDoc.exists() ? userDoc.data() : user);
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
