import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Iperson } from "../App";

interface Iprops {
    person: Iperson;
    persons: Iperson[];
    setPersons: Dispatch<SetStateAction<Iperson[]>>;
}

const EditUser: FC<Iprops> = ({ person, persons, setPersons }) => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const handleClose = () => {
        setfirstName(person.firstName);
        setLastname(person.lastName);
        setIsShowModal(false);
    }
    const handleShow = () => setIsShowModal(true);
    
    const [firstName, setfirstName] = useState<string>(person.firstName);
    const [lastName, setLastname]  = useState<string>(person.lastName);

    const handledSubmitForm = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const copyPersons = [...persons];
        const index = copyPersons.findIndex(p => p.id === person.id);
        copyPersons[index] = {
            id: person.id,
            firstName,
            lastName,
            date:new Date()
        };
        
        setPersons(copyPersons);
        setIsShowModal(false)
    }
    return (
        <>
            <MdModeEdit className="m-2" onClick={handleShow} style={{ cursor: "pointer" }} />
            <Modal
                show={isShowModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <form autoComplete="off" className="container border rounded p-4" onSubmit={(e) => { handledSubmitForm(e) }}>
                        <div className="row justify-content-center mb-3">Edit user form</div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter firstName"
                                    name="firstname"
                                    value={firstName}
                                    onChange={(e) => setfirstName(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter lastname"
                                    name="lastname"
                                    onChange={(e) => setLastname(e.target.value)}
                                    value={lastName}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button type="submit" className="btn btn-primary m-2">Save</button>
                                <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>


    )
}

export default EditUser;