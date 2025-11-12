import React, { FC, Dispatch, SetStateAction } from "react";
import { Iperson } from "../AppTypes";

interface Props {
  persons: Iperson[];
  setPersons: Dispatch<SetStateAction<Iperson[]>>;
  onEdit: (person: Iperson) => void;
}

const PersonList: FC<Props> = ({ persons, setPersons, onEdit }) => {
  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setPersons((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {persons.length === 0 ? (
        <div className="col-span-full flex items-center justify-center py-20">
          <p className="text-gray-500 dark:text-gray-400">No users yet — click “Add User”</p>
        </div>
      ) : (
        persons.map((person) => (
          <div
            key={person.id}
            className="rounded-2xl p-6 bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] border border-white/20 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white/30 dark:bg-gray-700/50">
                <img
                  src={
                    typeof person.image === "string"
                      ? person.image
                      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={`${person.firstName} ${person.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {person.firstName} {person.lastName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {person.date.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => onEdit(person)}
                className="px-3 py-2 rounded-lg text-sm bg-white/30 dark:bg-gray-700/40 hover:opacity-80 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(person.id)}
                className="px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PersonList;
