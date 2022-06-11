import Index from "views/admin/dashboard"
import UserAdmin from 'views/admin/userAdmin'

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-blue",
    component: Index,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 0
  },
  {
    path: "/user-admin",
    name: "Administración de Usuarios",
    icon: "ni ni-single-02 text-blue",
    component: UserAdmin,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 1
  }
];
export default routes;
