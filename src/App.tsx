import { useEffect, useState } from "react";
import PersonList from "./component/PersonList";
import AddUser from "./component/AddUser";

export interface Iperson {
  id: number;
  firstName: string;
  lastName: string;
  date:Date;
}

const App = () => {
  
  const [person, setPerson] = useState<Iperson[]>([]);
  
  useEffect(()=>{
    setPerson([{
      id:1,
      firstName:"sara",
      lastName:"yousefi",
      date:new Date()
    }])
  },[])
  return (
    <div className="container">
      <h4 className="text-center">Person list</h4>
      <AddUser persons={person} setPersons={setPerson}/>
      <PersonList persons={person} setPersons={setPerson} />
      
    </div>
  );
}

export default App;
