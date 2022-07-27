import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ListContractsProv from './list';

const ModalNewContract = ({
    modal,
    toggle,
    idProv
}) => {
    return (
        <Modal size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Nuevo Contrato
            </ModalHeader>
            <ModalBody>
                <ListContractsProv
                    idProv={idProv}
                />
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

export default ModalNewContract