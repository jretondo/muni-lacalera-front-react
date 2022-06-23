import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const AmountsPerHModal = ({
    modal,
    toggle
}) => {


    return (
        <Modal size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Listado de montos
            </ModalHeader>
            <ModalBody>

            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={e => {
                    e.preventDefault()
                    toggle()
                }} >
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default AmountsPerHModal