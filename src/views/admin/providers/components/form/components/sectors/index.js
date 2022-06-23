import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import FormSector from './form';
import ListSectors from './list';

const SectorsModal = ({
    modal,
    toggle
}) => {
    const [openForm, setOpenForm] = useState(false)

    return (
        <Modal size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Listado de sectores
            </ModalHeader>
            <ModalBody>
                {
                    openForm ?
                        <FormSector /> : <ListSectors />
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