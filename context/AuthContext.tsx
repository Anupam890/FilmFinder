import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/services/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        await AsyncStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem("user");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (userData: User) => {
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await signOut(auth);
    await AsyncStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
