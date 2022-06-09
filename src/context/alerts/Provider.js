import { useEffect, useState } from 'react';
import AlertsContext from './index';
import React from 'react';
import Alert from 'components/Alerts/Alert1';
import { Button } from 'reactstrap';

const AlertsProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([])
    const [plantAlerts, setPlantAlerts] = useState(<></>)

    const newAlert = (type, strong, msg) => {
        setAlerts((al) => [...al, {
            type,
            strong,
            msg
        }])
    }

    const removeAlert = () => {
        if (alerts.length > 1) {
            let alrt = alerts
            alrt.splice(0, 1)
            setAlerts(() => [...alrt])
        } else {
            setAlerts([])
        }

    }

    const buildPlant = () => {
        if (alerts.length > 0) {
            setPlantAlerts(
                alerts.map((item, key) => {
                    return (
                        <Alert
                            type={item.type}
                            msgStrong={item.strong}
                            msgGral={item.msg}
                            id={key}
                            key={key}
                        />
                    )
                })
            )
        } else {
            setPlantAlerts(<></>)
        }
    }
    useEffect(() => {
        buildPlant()
    }, [alerts])

    return (
        <AlertsContext.Provider value={{

        }}>
            {plantAlerts}

            <Button color={"danger"} onClick={e => {
                e.preventDefault()
                newAlert("success", "fas ", "fsfsgsagga")
            }}
                style={{ position: "fixed", right: 0, left: 0, top: 0, margin: "auto", marginTop: "130px", zIndex: "99999" }}
            >
                Toggle
            </Button>
            <Button color={"warning"} onClick={e => {
                e.preventDefault()
                removeAlert()
            }}
                style={{ position: "fixed", right: 0, left: 0, top: 0, margin: "auto", marginTop: "180px", zIndex: "99999" }}
            >
                Remove
            </Button>
            {children}
        </AlertsContext.Provider>
    )
}
export default AlertsProvider