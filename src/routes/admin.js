import index from "views/admin/dashboard"
import userAdmin from 'views/admin/userAdmin'
import providers from 'views/admin/providers'
import works from 'views/admin/works';
import reports from 'views/admin/reports';
import payments from 'views/admin/payments';

var routes = [
  {
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-blue",
    component: index,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 0
  },
  {
    path: "/user-admin",
    name: "Usuarios",
    icon: "ni ni-single-02 text-blue",
    component: userAdmin,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 1
  },
  {
    path: "/providers",
    name: "Monotributistas",
    icon: "ni ni-badge text-red",
    component: providers,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 2
  },
  {
    path: "/works",
    name: "Registro de trabajos",
    icon: "ni ni-book-bookmark text-yellow",
    component: works,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 5
  },
  {
    path: "/payments",
    name: "Pagos y Adelantos",
    icon: "ni ni-money-coins text-green",
    component: payments,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 3
  },
  {
    path: "/reports",
    name: "Reportes",
    icon: "ni ni-badge text-teal",
    component: reports,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 4
  }
];
export default routes;
