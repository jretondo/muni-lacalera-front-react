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
const providers = host + "/providers"
const sectors = host + "/sectors"
const amounts = host + "/amounts"
const payments = host + "/payments"
const contracts = host + "/contracts"
const works = host + "/works"
const reports = host + "/reports"

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
        userAdmin: routes + "/userAdmin",
        providers: routes + "/providers",
        payments: routes + "/payments",
        works: routes + "/works"
    }
}

const activityDir = {
    activity
}

const providersDir = {
    providers,
    sub: {
        fiscal: providers + "/fiscal",
        details: providers + "/details"
    }
}

const sectorsDir = {
    sectors,
    sub: {
        details: sectors + "/details"
    }
}

const amountsDir = {
    amounts,
    sub: {
        details: amounts + "/details"
    }
}

const paymentsDir = {
    payments,
    sub: {
        details: payments + "/details",
        reprint: payments + "/reprint",
        summary: payments + "/summary"
    }
}

const contractsDir = {
    contracts,
    sub: {
        details: contracts + "/details"
    }
}

const worksDir = {
    works,
    sub: {
        details: works + "/details",
        provider: works + "/provider",
        summary: works + "/summary"
    }
}

const reportsDir = {
    reports,
    sub: {
        pending: reports + "/pending",
        advances: reports + "/advances"
    }
}

const UrlNodeServer = {
    publicFolder,
    authDir,
    routesDir,
    permissionsDir,
    usersDir,
    activityDir,
    providersDir,
    sectorsDir,
    amountsDir,
    paymentsDir,
    contractsDir,
    worksDir,
    reportsDir
}

export default UrlNodeServer