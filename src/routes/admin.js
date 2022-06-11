import Index from "views/admin/dashboard"
import UserAdmin from 'views/admin/userAdmin'

var routes = [
  {
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-blue",
    component: Index,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 0
  },
  {
    path: "/user-admin",
    name: "Usuarios",
    icon: "ni ni-single-02 text-blue",
    component: UserAdmin,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 1
  }
];
export default routes;
