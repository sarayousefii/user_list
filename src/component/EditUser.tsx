import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { Iperson } from "../App";
import { Formik, Field, Form, FormikHelpers,ErrorMessage } from 'formik';
import * as Yup from "yup";

interface Iprops {
    person: Iperson;
    persons: Iperson[];
    setPersons: Dispatch<SetStateAction<Iperson[]>>;
}
interface MyFormValues {
    firstname: string;
    lastname: string;
}
const EditUser: FC<Iprops> = ({ person, persons, setPersons }) => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const handleClose = () => {
        setIsShowModal(false);
    }
    const handleShow = () => setIsShowModal(true);
    
    const handledSubmitForm = async (
        values: MyFormValues,
        { setSubmitting, resetForm }: FormikHelpers<MyFormValues>
        )  => {
        const copyPersons = [...persons];
        const index = copyPersons.findIndex(p => p.id === person.id);
        copyPersons[index] = {
            id: person.id,
            firstName:values.firstname,
            lastName:values.lastname,
            date:new Date()
        };
        
        setPersons(copyPersons);
        setIsShowModal(false);
        
        setSubmitting(false);
        resetForm();
    }
    const validationSchema = Yup.object({
        firstname: Yup.string().required(" first name is required "),
        lastname: Yup.string().required(" last name is required ")
    });
    const initialValues: MyFormValues = { firstname: person.firstName, lastname: person.lastName };
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
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handledSubmitForm}
                    >
                        {({ setFieldValue }) => (
                            <Form autoComplete="off" className="container border rounded p-4" >
                                <div className="row justify-content-center mb-3">Edit user form</div>
                                <div className="row">
                                    <div className="col">
                                        <label>
                                            <Field type="text" name="firstname"  placeholder="First Name"/>
                                        </label>
                                        <ErrorMessage name="firstname" component="div" className="text-danger" />
                                    </div>
                                    <div className="col">
                                        <label>
                                            <Field type="text" name="lastname" placeholder="last Name" />
                                        </label>
                                        <ErrorMessage name="lastname" component="div" className="text-danger" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button type="submit" className="btn btn-primary m-2">Save</button>
                                        <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>


    )
}

export default EditUser;