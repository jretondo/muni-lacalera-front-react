import React, { useState } from 'react';
import SummaryFilter from './filter';
import SummaryFooter from './footer';
import SummaryGraphic from './grafic';

const SummaryWorks = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    return (<>
        <SummaryFilter
            setData={setData}
            loading={loading}
            setLoading={setLoading}
        />
        <SummaryGraphic
            data={data}
            loading={loading}
        />
        <SummaryFooter
            data={data}
        />
    </>)
}

export default SummaryWorks