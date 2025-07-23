import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Loading from "./components/Loading";

const GlobalProvider = createContext();

function GlobalContext({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        console.log(error.response.data.message);
      }
    };

    const getCurrentAdmin = async () => {
      try {
        const result = await axios.get(`${API_URL}/admin/session`, {
          withCredentials: true,
        });
        console.log("result", result.data);
        setCurrentAdmin(result.data);
      } catch (error) {
        console.console.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCurrentUser();
    getCurrentAdmin();
  }, []);

  useEffect(() => {}, []);

  return (
    <GlobalProvider.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentAdmin,
        setCurrentAdmin,
        API_URL,
        isLoading,
      }}
    >
      {isLoading ? <Loading /> : children}
    </GlobalProvider.Provider>
  );
}
export default GlobalContext;

export function useGlobalProvider() {
  return useContext(GlobalProvider);
}
