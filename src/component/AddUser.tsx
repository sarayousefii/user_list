import { useState, FormEvent, Dispatch, SetStateAction, FC } from "react"
import { Iperson } from "../App";
import Modal from 'react-bootstrap/Modal';

interface Iprops {
    persons: Iperson[];
    setPersons: Dispatch<SetStateAction<Iperson[]>>;
}

const AddUser: FC<Iprops> = ({ persons, setPersons }) => {
    const [firstName, setfirstName] = useState<string>("");
    const [lastName, setLastname] = useState<string>("");
    

    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const handleClose = () => {
        setfirstName("");
        setLastname("");
        setIsShowModal(false);
    };
    const handleShow = () => setIsShowModal(true);

    const handledSubmitForm = (event: FormEvent<HTMLFormElement>): void => {

        if(isShowModal && firstName && lastName){
            event.preventDefault();
            setPersons([
                ...persons,
                {
                    id:Math.floor(Math.random()*1000000),
                    firstName,
                    lastName,
                    date:new Date(),
                }
            ])
            event.preventDefault();
            setfirstName("");
            setLastname("");
            setIsShowModal(false)
        }
    }

    return (
        <>
            <button className="btn btn-secondary mb-2" onClick={handleShow}>create</button>
            <Modal
                show={isShowModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <form autoComplete="off" className="container border rounded p-4" onSubmit={(e) => { handledSubmitForm(e) }}>
                        <div className="row justify-content-center mb-3">Create user form</div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter firstname"
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
                                    placeholder="Enter last name"
                                    name="lastname"
                                    onChange={(e) => setLastname(e.target.value)}
                                    value={lastName}
                                    required={true}
                                />
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col mt-2">
                                <button type="submit" className="btn btn-primary m-2">Add User</button>
                                <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
        
    )
}

export default AddUser;