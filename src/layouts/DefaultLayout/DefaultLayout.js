import Header from "~/layouts/components/Header";
// import Sidebar from "~/layouts/components/Sidebar";
import Footer from "~/layouts/components/Footer";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div>
        {/* <Sidebar /> */}
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
