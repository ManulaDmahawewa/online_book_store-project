import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalProvider = createContext();

function GlobalContext({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios.get(`${API_URL}/customer/session-details`, {
          withCredentials: true,
        });
        console.log("result", result.data);
        setCurrentUser(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

  return (
    <GlobalProvider.Provider value={{ currentUser, setCurrentUser, API_URL }}>
      {children}
    </GlobalProvider.Provider>
  );
}
export default GlobalContext;

export function useGlobalProvider() {
  return useContext(GlobalProvider);
}
