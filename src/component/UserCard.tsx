import React, { FC } from "react";
import { Iperson } from "../AppTypes";
import { motion } from "framer-motion";
throw new Error("CI Test Failure");
interface Props {
  person: Iperson;
  onEdit: (person: Iperson) => void;
  onDelete: (id: number) => void;
}

const UserCard: FC<Props> = ({ person, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      className="rounded-2xl p-6 bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] border border-white/20 flex flex-col justify-between hover:scale-[1.02] transition-transform"
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
            {person.date.toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={() => onEdit(person)}
          className="px-3 py-2 rounded-lg text-sm bg-white/30 dark:bg-gray-700/40 hover:opacity-80 transition"
          aria-label={`ویرایش ${person.firstName} ${person.lastName}`}
        >
          ✏️ ویرایش
        </button>

        <button
          onClick={() => onDelete(person.id)}
          className="px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition"
          aria-label={`حذف ${person.firstName} ${person.lastName}`}
        >
          حذف
        </button>
      </div>
    </motion.div>
  );
};

export default UserCard;
