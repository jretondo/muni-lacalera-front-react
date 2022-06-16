import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const ProvidersRow = ({
    id,
    item,
    setIdDetail,
    first,
    page,
    setPage,
    refreshToggle
}) => {

    const details = () => {

    }
    const deleteProvider = () => {

    }

    return (
        <tr>
            <td>

            </td>
            <td className="text-right">
                <UncontrolledDropdown>
                    <DropdownToggle
                        className="btn-icon-only text-light"
                        href="#pablo"
                        role="button"
                        size="sm"
                        color=""
                        onClick={e => e.preventDefault()}
                    >
                        <i className="fas fa-ellipsis-v" />
                    </DropdownToggle    >
                    <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => details(e, item.id)}
                        >
                            <i className="fas fa-edit"></i>
                            Editar
                        </DropdownItem>

                        <DropdownItem
                            href="#pablo"
                            onClick={e => deleteProvider(e, item.id, item.name + " " + item.lastname, first, page)}
                        >
                            <i className="fas fa-trash-alt"></i>
                            Eliminar
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    )
}