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
    <>
      <h4 className="text-center p-3 m-1 mb-3 rounded" style={{backgroundColor:"#ede9e9"}}>Person list</h4>
      <div className="container">
        <AddUser persons={person} setPersons={setPerson}/>
        <PersonList persons={person} setPersons={setPerson} />
        
      </div>
    </>
  );
}

export default App;
