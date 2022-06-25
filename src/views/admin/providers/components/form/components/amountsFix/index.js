import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import FormFixAmount from './form';
import ListFixAmount from './list';

const SectorsModal = ({
    modal,
    toggle
}) => {
    const [openForm, setOpenForm] = useState(false)
    const [idAmount, setIdAmount] = useState(false)

    useEffect(() => {
        setOpenForm(false)
        setIdAmount(false)
    }, [modal])

    return (
        <Modal size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Listado de montos fijos
            </ModalHeader>
            <ModalBody>
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