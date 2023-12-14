import AdminHeader from "~/layouts/components/Admin/AdminHeader";
// import Sidebar from "~/layouts/components/Sidebar";
import Footer from "~/layouts/components/Footer";
import images from "~/assets/images";
function AdminLayout({ children }) {
  return (
    // <div>
    //   <AdminHeader />
    //   <div>
    //     <div>{children}</div>
    //   </div>
    // </div>
    <body data-layout="horizontal">
      <div id="wrapper">
        <AdminHeader />
        {children}
      </div>
    </body>
  );
}

export default AdminLayout;
