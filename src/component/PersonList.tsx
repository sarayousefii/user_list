import React, { FC, Dispatch, SetStateAction } from "react";
import { Iperson } from "../AppTypes";
import UserCard from "./UserCard";
import { AnimatePresence } from "framer-motion";

interface Props {
  persons: Iperson[];
  setPersons: Dispatch<SetStateAction<Iperson[]>>;
  onEdit: (person: Iperson) => void;
}

const PersonList: FC<Props> = ({ persons, setPersons, onEdit }) => {
  const handleDelete = (id: number) => {
    if (!window.confirm("آیا از حذف این کاربر مطمئن هستید؟")) return;
    setPersons((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {persons.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center animate-pulse">
          <p className="text-4xl mb-4">
            لیست خالی است <span className="animate-bounce inline-block">👍</span>
          </p>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            هنوز هیچ کاربری اضافه نشده 😎
            <br />
            روی <span className="font-semibold text-indigo-500">«افزودن کاربر»</span> کلیک کن و شروع کن!
          </p>
        </div>
      ) : (
        <AnimatePresence>
          {persons.map((person) => (
            <UserCard
              key={person.id}
              person={person}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default PersonList;
