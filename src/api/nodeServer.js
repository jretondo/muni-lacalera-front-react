let host = ""
let publicFiles = ""
const local = 1
if (process.env.NODE_ENV === "development") {
    if (local === 1) {
        host = "http://localhost:3010/api"
        publicFiles = "http://localhost:3010/static"
    } else {
        host = "https://api-test.nekoadmin.com.ar/muni-lacalera/api"
        publicFiles = "https://api-test.nekoadmin.com.ar/muni-lacalera/static"
    }
} else {
    host = "https://api-prod.nekoadmin.com.ar/muni-lacalera/api"
    publicFiles = "https://api-prod.nekoadmin.com.ar/muni-lacalera/static"
}

const prodImages = publicFiles + "/images/products/"

const publicFolder = {
    prodImages
}

const auth = host + "/auth"
const routes = host + "/routes"
const permissions = host + "/permissions"
const users = host + "/user"
const activity = host + "/activity"

const authDir = {
    auth
}

const usersDir = {
    users,
    sub: {
        details: users + "/details",
        mydata: users + "/mydata"
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

const activityDir = {
    activity
}

const UrlNodeServer = {
    publicFolder,
    authDir,
    routesDir,
    permissionsDir,
    usersDir,
    activityDir
}

export default UrlNodeServer