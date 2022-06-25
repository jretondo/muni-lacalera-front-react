import React, { useEffect, useState } from 'react';
import FormPerHAmount from './form';
import ListPerHAmount from './list';

const AmountPerHParam = ({
    refresh
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
                    <FormPerHAmount
                        idAmount={idAmount}
                        setIdAmount={setIdAmount}
                        setOpenForm={setOpenForm}
                    /> :
                    <ListPerHAmount
                        setIdAmount={setIdAmount}
                        setOpenForm={setOpenForm}
                    />
            }
        </>
    )
}

export default AmountPerHParam