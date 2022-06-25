import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import FormSector from './form';
import ListSectors from './list';

const SectorsModal = ({
    modal,
    toggle
}) => {
    const [openForm, setOpenForm] = useState(false)
    const [idSector, setIdSector] = useState(false)

    useEffect(() => {
        setOpenForm(false)
        setIdSector(false)
    }, [modal])

    return (
        <Modal size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Listado de sectores
            </ModalHeader>
            <ModalBody>
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
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={e => {
                    e.preventDefault()
                    toggle()
                }}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default SectorsModal