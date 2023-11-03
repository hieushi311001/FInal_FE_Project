import config from "~/config";
// Layouts
import { HeaderOnly } from "~/layouts";

// Pages
import Home from "~/pages/Home";
import Following from "~/pages/Following";
import Profile from "~/pages/Profile";
import Upload from "~/pages/Upload";
import Search from "~/pages/Search";
import Login from "~/pages/Login";
import Register from "~/pages/Register";
import Productdetail from "~/pages/Productdetail";

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.following, component: Following },
  { path: config.routes.profile, component: Profile, layout: HeaderOnly },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
  { path: config.routes.search, component: Search, layout: null },
  { path: config.routes.login, component: Login, layout: HeaderOnly },
  { path: config.routes.register, component: Register, layout: null },
  { path: config.routes.productdetail, component: Productdetail },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
