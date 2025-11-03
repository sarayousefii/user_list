import { useState, FormEvent, Dispatch, SetStateAction, FC } from "react"
import { Iperson } from "../App";
import Modal from 'react-bootstrap/Modal';
import { Formik, Field, Form, FormikHelpers,ErrorMessage } from 'formik';
import * as Yup from "yup";

interface Iprops {
    persons: Iperson[];
    setPersons: Dispatch<SetStateAction<Iperson[]>>;
}

interface MyFormValues {
  firstname: string;
  lastname: string;
}

const AddUser: FC<Iprops> = ({ persons, setPersons }) => {

    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const handleClose = () => {
        setIsShowModal(false);
    };
    const handleShow = () => setIsShowModal(true);
    
    const validationSchema = Yup.object({
        firstname: Yup.string().required(" first name is required "),
        lastname: Yup.string().required(" last name is required ")
    });

    const handledSubmitForm = async (
        values: MyFormValues,
        { setSubmitting, resetForm }: FormikHelpers<MyFormValues>
        ) => {
            if(isShowModal){
                setPersons([
                    ...persons,
                    {
                        id:Math.floor(Math.random()*1000000),
                        firstName:values.firstname,
                        lastName:values.lastname,
                        date:new Date(),
                    }
                ])
                setIsShowModal(false)
            }

        setSubmitting(false);
        resetForm();
    };

  
    const initialValues: MyFormValues = { firstname: '', lastname: '' };
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
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handledSubmitForm}
                    >       
                        {({ setFieldValue }) => (
                            <Form autoComplete="off" className="container border rounded p-4" >
                                <div className="row justify-content-center mb-3">Create user form</div>
                                <div className="row">
                                    <div className="col">
                                        <label>
                                            <Field type="text" name="firstname"  placeholder="First Name" />
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
                                    <div className="col mt-2">
                                        <button type="submit" className="btn btn-primary m-2">Add User</button>
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

export default AddUser;