let host = ""
let publicFiles = ""
const local = 1
if (process.env.NODE_ENV === "development") {
    if (local === 1) {
        host = "http://localhost:3010/api"
        publicFiles = "http://localhost:3010/static"
    } else {
        host = "https://api-test.nekoadmin.com.ar/club-limpieza/api"
        publicFiles = "https://api-test.nekoadmin.com.ar/club-limpieza/static"
    }
} else {
    host = "https://api-prod.nekoadmin.com.ar/club-limpieza/api"
    publicFiles = "https://api-prod.nekoadmin.com.ar/club-limpieza/static"
}

const prodImages = publicFiles + "/images/products/"

const publicFolder = {
    prodImages
}

const auth = host + "/auth"
const routes = host + "/routes"
const permissions = host + "/permissions"
const usuarios = host + "/user"


const authDir = {
    auth
}

const usuariosDir = {
    usuarios,
    sub: {
        details: usuarios + "/details",
        mydata: usuarios + "/mydata"
    }
}

const permissionsDir = {
    permissions,
    sub: {
        list: "/list"
    }
}

const routesDir = {
    routes,
    sub: {
        dashboard: routes + "/dashboard",
        changePass: routes + "/changePass",
        userAdmin: routes + "/userAdmin"
    }
}

const UrlNodeServer = {
    publicFolder,
    authDir,
    routesDir,
    permissionsDir,
    usuariosDir
}

export default UrlNodeServer