import { FC , Dispatch, SetStateAction} from "react";
import { format } from "date-fns-jalali";

import { MdDelete } from "react-icons/md";
import { Iperson } from "../App";
import EditUser from "./EditUser";


interface Iprops {
    persons: Iperson[];
    setPersons: Dispatch<SetStateAction<Iperson[]>>;
}

const PersonList: FC<Iprops> = ({ persons , setPersons}) => {

    const handelDelete=(id:number):void=>{
        const filterDeletePerson:Iperson[]=persons.filter(person=>person.id!==id);
        setPersons(filterDeletePerson);
    }

    const contentPersons: JSX.Element[] = persons.map((person) => (
        <div className="col-md-6" key={person.id}>
            <div className="card mb-3" >
                <div className="row g-0">
                    
                    <div className="col-10 ">
                        <div className="card-body">
                            <h5 className="card-title">{person.firstName +" "+person.lastName}</h5>
                            <p className="card-text"><small className="text-body-secondary">{format(person.date.toISOString(), "yyyy-MM-dd h:m")}</small></p>
                        </div>
                    </div>
                    <div className="col-2 d-flex flex-column justify-content-center">
                        <MdDelete className="m-2"  style={{cursor:"pointer"}} onClick={()=>handelDelete(person.id)}/>
                        <EditUser person={person} persons={persons} setPersons={setPersons}/>
                    </div>
                </div>
            </div>
        </div>
    ));
    return (
        <div className="row">
            {contentPersons}
        </div>
    )
};

export default PersonList;