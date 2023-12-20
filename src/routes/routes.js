import config from "~/config";
// Layouts
import { HeaderOnly } from "~/layouts";
import { AdminLayout } from "~/layouts";

// Pages
import Home from "~/pages/Home";
import Following from "~/pages/Following";
import Profile from "~/pages/Profile";
import Upload from "~/pages/Upload";
import Search from "~/pages/Search";
import Login from "~/pages/Login";
import Register from "~/pages/Register";
import ForgetPass from "~/pages/ForgetPass";
import Productdetail from "~/pages/Productdetail";
import Shop from "~/pages/Shop";
import Cart from "~/pages/Cart";
import Test from "~/pages/Test";
import Checkout from "~/pages/Checkout";
import Payment from "~/pages/Payment";
import Invoice from "~/pages/Invoice";
import InvoiceDetail from "~/pages/InvoiceDetail";
import Location from "~/pages/Location";

import Admin from "~/pages/Admin";
import AdminLogin from "~/pages/AdminLogin";
import AdminUser from "~/pages/AdminUser";
import AdminUserDetail from "~/pages/AdminUserDetail";
import AdminProduct from "~/pages/AdminProduct";
import AdminProductDetail from "~/pages/AdminProductDetail";
import AdminProductEdit from "~/pages/AdminProductEdit";
import AdminProductAdd from "~/pages/AdminProductAdd";
import AdminInvoice from "~/pages/AdminInvoice";
import AdminInvoiceDetail from "~/pages/AdminInvoiceDetail";
// Public routes
const publicRoutes = [
  { path: config.routes.test, component: Test, layout: null },
  { path: config.routes.home, component: Home },
  { path: config.routes.shop, component: Shop },
  { path: config.routes.following, component: Following },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
  { path: config.routes.search, component: Search },
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.register, component: Register, layout: null },
  { path: config.routes.forgetPass, component: ForgetPass, layout: null },
  { path: config.routes.productdetail, component: Productdetail },
  {
    path: config.routes.adminLogin,
    component: AdminLogin,
    layout: null,
  },
];

const privateRoutes = [
  {
    path: config.routes.profile,
    component: Profile,
    layout: HeaderOnly,
  },
  {
    path: config.routes.cart,
    component: Cart,
  },
  {
    path: config.routes.check_out,
    component: Checkout,
  },
  {
    path: config.routes.payment,
    component: Payment,
  },
  {
    path: config.routes.invoice,
    component: Invoice,
  },
  {
    path: config.routes.invoice_id,
    component: InvoiceDetail,
    layout: null,
  },
  {
    path: config.routes.location,
    component: Location,
    layout: null,
  },
];
const adminRoutes = [
  {
    path: config.routes.admin,
    component: Admin,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminUser,
    component: AdminUser,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminUserDetail,
    component: AdminUserDetail,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminProduct,
    component: AdminProduct,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminProductDetail,
    component: AdminProductDetail,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminProductEdit,
    component: AdminProductEdit,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminProductAdd,
    component: AdminProductAdd,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminInvoice,
    component: AdminInvoice,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminInvoiceDetail,
    component: AdminInvoiceDetail,
    layout: null,
  },
];

export { publicRoutes, privateRoutes, adminRoutes };
