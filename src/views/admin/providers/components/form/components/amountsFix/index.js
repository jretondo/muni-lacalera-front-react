import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const AmountsFixModal = ({
    modal,
    toggle
}) => {


    return (
        <Modal size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Listado de montos fijos
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

export default AmountsFixModal