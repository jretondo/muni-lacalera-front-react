import React, { useEffect, useState } from 'react';
import FormSector from './form';
import ListSectors from './list';

const SectorsParam = ({
    refresh
}) => {
    const [openForm, setOpenForm] = useState(false)
    const [idSector, setIdSector] = useState(false)

    useEffect(() => {
        setOpenForm(false)
        setIdSector(false)
    }, [refresh])

    return (
        <>
            {
                openForm || idSector ?
                    <FormSector
                        idSector={idSector}
                        setIdSector={setIdSector}
                        setOpenForm={setOpenForm}
                    /> :
                    <ListSectors
                        setIdSector={setIdSector}
                        setOpenForm={setOpenForm}
                    />
            }
        </>
    )
}

export default SectorsParam