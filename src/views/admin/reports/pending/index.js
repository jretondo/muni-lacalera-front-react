import List from './components/list';
import React, { useState } from 'react';
import Filter from './components/filter';

const ReportsPending = ({
    moduleActive
}) => {
    const [data, setData] = useState([])
    const [totalToPay, setTotalToPay] = useState(0)
    const [monthSelect, setMonthSelect] = useState("")
    const [yearSelect, setYearSelect] = useState("")

    return (<>
        <Filter
            setData={setData}
            moduleActive={moduleActive}
            setTotalToPay={setTotalToPay}
            setMonthSelect={setMonthSelect}
            setYearSelect={setYearSelect}
        />
        <List
            data={data}
            totalToPay={totalToPay}
            monthSelect={monthSelect}
            yearSelect={yearSelect}
        />

    </>)
}

export default ReportsPending