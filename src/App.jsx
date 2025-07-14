import "./App.css";
import CustomerPageLayout from "./components/CustomerPageLayout";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { Toaster } from "react-hot-toast";
import GlobalContext from "./GlobalContext";

function App() {
  return (
    <BrowserRouter>
      <GlobalContext>
        <Toaster position="bottom-right" reverseOrder={true} />
        <Routes>
          <Route
            path="/"
            element={
              <CustomerPageLayout>
                <HomePage />
              </CustomerPageLayout>
            }
          />
          <Route
            path="/sign-in"
            element={
              <CustomerPageLayout>
                <LoginPage />
              </CustomerPageLayout>
            }
          />
          <Route
            path="/registration"
            element={
              <CustomerPageLayout>
                <RegistrationPage />
              </CustomerPageLayout>
            }
          />
          <Route
            path="/my-cart"
            element={
              <CustomerPageLayout>
                <ShoppingCartPage />
              </CustomerPageLayout>
            }
          />
        </Routes>
      </GlobalContext>
    </BrowserRouter>
  );
}

export default App;
