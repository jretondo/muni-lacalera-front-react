import React, { useState } from 'react';
import List from './components/list';
import Filter from './components/filter';
const ReportsAdvances = ({
    moduleActive
}) => {
    const [data, setData] = useState([])
    const [monthSelect, setMonthSelect] = useState("")
    const [yearSelect, setYearSelect] = useState("")
    const [loading, setLoading] = useState(false)

    return (<>
        <Filter
            setData={setData}
            moduleActive={moduleActive}
            setMonthSelect={setMonthSelect}
            setYearSelect={setYearSelect}
            loading={loading}
            setLoading={setLoading}
        />
        <List
            data={data}
            monthSelect={monthSelect}
            yearSelect={yearSelect}
            loading={loading}
        />

    </>)
}

export default ReportsAdvances