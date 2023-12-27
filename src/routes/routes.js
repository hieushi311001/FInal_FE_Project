import config from "~/config";
// Layouts
import { HeaderOnly } from "~/layouts";
import { AdminLayout } from "~/layouts";

// Pages
import Home from "~/pages/User/Home";
import Profile from "~/pages/User/Profile";
import Upload from "~/pages/User/Upload";
import Search from "~/pages/User/Search";
import Login from "~/pages/User/Login";
import Register from "~/pages/User/Register";
import ForgetPass from "~/pages/User/ForgetPass";
import Productdetail from "~/pages/User/Productdetail";
import Shop from "~/pages/User/Shop";
import Cart from "~/pages/User/Cart";
import Checkout from "~/pages/User/Checkout";
import Payment from "~/pages/User/Payment";
import Invoice from "~/pages/User/Invoice";
import InvoiceDetail from "~/pages/User/InvoiceDetail";
import Location from "~/pages/User/Location";
import Test from "~/pages/Test";

import Admin from "~/pages/Admin/Admin";
import AdminLogin from "~/pages/Admin/AdminLogin";
import AdminUser from "~/pages/Admin/User/User";
import AdminUserDetail from "~/pages/Admin/User/UserDetail";
import AdminProduct from "~/pages/Admin/Product/Product";
import AdminProductDetail from "~/pages/Admin/Product/ProductDetail";
import AdminProductEdit from "~/pages/Admin/Product/ProductEdit";
import AdminProductAdd from "~/pages/Admin/Product/ProductAdd";
import AdminCategory from "~/pages/Admin/Category/Category";
import AdminCategoryAdd from "~/pages/Admin/Category/CategoryAdd";
import AdminCategoryUpdate from "~/pages/Admin/Category/CategoryUpdate";
import AdminInvoice from "~/pages/Admin/Invoice/Invoice";
import AdminInvoiceDetail from "~/pages/Admin/Invoice/InvoiceDetail";
import AdminRefund from "~/pages/Admin/Refund/Refund";
// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.shop, component: Shop },
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
  {
    path: config.routes.test,
    component: Test,
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
    path: config.routes.adminCategory,
    component: AdminCategory,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminCategoryAdd,
    component: AdminCategoryAdd,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminCategoryUpdate,
    component: AdminCategoryUpdate,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminInvoiceDetail,
    component: AdminInvoiceDetail,
    layout: null,
  },
  {
    path: config.routes.adminRefund,
    component: AdminRefund,
    layout: AdminLayout,
  },
];

export { publicRoutes, privateRoutes, adminRoutes };
