import React, { useEffect, useState } from 'react';
import FormFixAmount from './form';
import ListFixAmount from './list';

const AmountFixParam = ({
    refresh,
}) => {
    const [openForm, setOpenForm] = useState(false)
    const [idAmount, setIdAmount] = useState(false)

    useEffect(() => {
        setOpenForm(false)
        setIdAmount(false)
    }, [refresh])

    return (
        <>
            {
                openForm || idAmount ?
                    <FormFixAmount
                        idAmount={idAmount}
                        setIdAmount={setIdAmount}
                        setOpenForm={setOpenForm}
                    /> :
                    <ListFixAmount
                        setIdAmount={setIdAmount}
                        setOpenForm={setOpenForm}
                    />
            }
        </>
    )
}

export default AmountFixParam