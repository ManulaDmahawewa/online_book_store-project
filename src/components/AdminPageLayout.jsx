import AdminPageHeaderSection from "./AdminPageHeaderSection";
import AdminSideNavigationBar from "./AdminSideNavigationBar";

function AdminPageLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-blue-400">
      <AdminPageHeaderSection />
      <div className="flex flex-1">
        <AdminSideNavigationBar />
        <main className="flex-1 mr-10 bg-blue-100 border border-blue-800 rounded-t-xl">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminPageLayout;
