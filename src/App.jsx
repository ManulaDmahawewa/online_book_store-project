import "./App.css";
import CustomerPageLayout from "./components/Layouts/CustomerPageLayout";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { Toaster } from "react-hot-toast";
import GlobalContext from "./GlobalContext";
import ScienceFictionBooksPage from "./pages/ScienceFictionBooksPage";
import MysteryThrillerBooksPage from "./pages/MysteryThrillerBooksPage";
import RomanceBooksPage from "./pages/RomanceBooksPage";
import ChildrenBooksPage from "./pages/ChildrenBooksPage";
import ScrollToTop from "./components/ScrollToTop";
import AdminPageLayout from "./components/Layouts/AdminPageLayout";
import Dashboard from "./components/Dashboard";
import BookManagementPage from "./pages/BookManagementPage";
import AuthorManagementPage from "./pages/AuthorManagementPage";
import CategoryManagementPage from "./pages/CategoryManagementPage";
import OrderManagementPage from "./pages/OrderManagementPage";
import UserManagementPage from "./pages/UserManagementPage";
import AdminRegistration from "./pages/AdminRegistration";
import AdminLoginPage from "./pages/AdminLoginPage";
import Loading from "./components/Loading";
import Authorregistration from "./pages/Authorregistration";

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
                <ScrollToTop />
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
                <ScrollToTop />
                <ShoppingCartPage />
              </CustomerPageLayout>
            }
          />
          <Route
            path="/science-fiction"
            element={
              <CustomerPageLayout>
                <ScrollToTop />
                <ScienceFictionBooksPage />
              </CustomerPageLayout>
            }
          />
          <Route
            path="/mystery&thriller"
            element={
              <CustomerPageLayout>
                <ScrollToTop />
                <MysteryThrillerBooksPage />
              </CustomerPageLayout>
            }
          />
          <Route
            path="/romance"
            element={
              <CustomerPageLayout>
                <ScrollToTop />
                <RomanceBooksPage />
              </CustomerPageLayout>
            }
          />
          <Route
            path="/children"
            element={
              <CustomerPageLayout>
                <ScrollToTop />
                <ChildrenBooksPage />
              </CustomerPageLayout>
            }
          />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin-panel/dashboard"
            element={
              <AdminPageLayout>
                <Dashboard />
              </AdminPageLayout>
            }
          />
          <Route
            path="/admin-panel/book-management"
            element={
              <AdminPageLayout>
                <BookManagementPage />
              </AdminPageLayout>
            }
          />
          <Route
            path="/admin-panel/author-management"
            element={
              <AdminPageLayout>
                <AuthorManagementPage />
              </AdminPageLayout>
            }
          />
          <Route
            path="/admin-panel/category-management"
            element={
              <AdminPageLayout>
                <CategoryManagementPage />
              </AdminPageLayout>
            }
          />
          <Route
            path="/admin-panel/order-management"
            element={
              <AdminPageLayout>
                <OrderManagementPage />
              </AdminPageLayout>
            }
          />
          "/admin-panel/user-management"
          <Route
            path="/admin-panel/user-management"
            element={
              <AdminPageLayout>
                <UserManagementPage />
              </AdminPageLayout>
            }
          />
          <Route
            path="/admin-panel/user-manegement/admin-registration"
            element={
              <AdminPageLayout>
                <AdminRegistration />
              </AdminPageLayout>
            }
          />
          <Route
            path="/admin-panel/user-manegement/admin-registration/:id"
            element={
              <AdminPageLayout>
                <AdminRegistration />
              </AdminPageLayout>
            }
          />
          <Route
            path="/admin-panel/user-manegement/author-registration"
            element={
              <AdminPageLayout>
                <Authorregistration />
              </AdminPageLayout>
            }
          />
          <Route
            path="/admin-panel/user-manegement/author-registration/:id"
            element={
              <AdminPageLayout>
                <Authorregistration />
              </AdminPageLayout>
            }
          />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </GlobalContext>
    </BrowserRouter>
  );
}

export default App;
