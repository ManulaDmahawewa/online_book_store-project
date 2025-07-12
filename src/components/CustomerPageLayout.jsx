import NavigationBar from "./NavigationBar";

function CustomerPageLayout({ children }) {
  return (
    <div className="min-h-screen ">
      <NavigationBar />
      <div>{children}</div>
    </div>
  );
}

export default CustomerPageLayout;
