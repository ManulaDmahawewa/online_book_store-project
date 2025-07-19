import NavigationBar from "../NavigationBar";

function CustomerPageLayout({ children }) {
  return (
    <div className="min-h-screen ">
      <NavigationBar />
      <div>{children}</div>
      <footer className="mt-5 bg-blue-900 h-96"></footer>
    </div>
  );
}

export default CustomerPageLayout;
