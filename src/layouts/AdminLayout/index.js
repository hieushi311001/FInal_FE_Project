import AdminHeader from "~/layouts/components/Admin/AdminHeader";
function AdminLayout({ children }) {
  return (
    <div data-layout="horizontal">
      <div id="wrapper">
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
