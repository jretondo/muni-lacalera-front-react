import { useEffect, useState } from 'react';
import AlertsContext from './index';
import React from 'react';
import Alert from 'components/Alerts/Alert1';

const AlertsProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([])

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

    useEffect(() => {
        if (alerts.length > 0) {
            const idTimer = setTimeout(() => {
                removeAlert()
            }, 3000);
            return () => {
                clearInterval(idTimer)
            }
        }
    }, [newAlert])

    return (
        <AlertsContext.Provider value={{
            newAlert
        }}>
            {alerts.map((item, key) => {
                return (
                    <Alert
                        type={item.type}
                        msgStrong={item.strong}
                        msgGral={item.msg}
                        id={key}
                        key={key}
                    />
                )
            })}
            {children}
        </AlertsContext.Provider>
    )
}
export default AlertsProvider