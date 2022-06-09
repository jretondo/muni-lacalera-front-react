import { useEffect, useState } from 'react';
import AlertsContext from './index';
import React from 'react';
import Alert from 'components/Alerts/Alert1';
import { Button } from 'reactstrap';

const AlertsProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([])
    console.log('alerts :>> ', alerts);
    const newAlert = (type, strong, msg) => {

        setAlerts(() => [...alerts, {
            type,
            strong,
            msg
        }])
        setTimeout(() => {
            if (alerts.length > 0) {
                setAlerts([...alerts.slice(0, 1)])
            } else {
                setAlerts([])
            }
        }, 2500);
    }

    return (
        <AlertsContext.Provider value={{

        }}>
            {
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
            }

            <Button color={"danger"} onClick={e => {
                e.preventDefault()
                newAlert("success", "fas ", "fsfsgsagga")
            }}
                style={{ position: "fixed", right: 0, left: 0, top: 0, margin: "auto", marginTop: "130px", zIndex: "99999" }}
            >
                Toggle
            </Button>
            {children}
        </AlertsContext.Provider>
    )
}
export default AlertsProvider