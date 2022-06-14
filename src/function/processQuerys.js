export const processQuerys = async (querysArray = [{
    query: ""
}]) => {

    let queryString = ""
    if (querysArray.length > 0) {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line
            querysArray.map((item, key) => {
                const obj = Object.keys(item)
                if (item[obj[0]]) {
                    if (queryString === "") {
                        queryString = `?${queryString}${obj[0]}=${item[obj[0]]}`
                    } else {
                        queryString = `${queryString}&${obj[0]}=${item[obj[0]]}`
                    }
                }
                if (key === querysArray.length - 1) {
                    resolve(queryString)
                }
            })
        })
    }
}