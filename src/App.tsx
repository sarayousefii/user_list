import React, { useState, useEffect } from "react";
import { Iperson } from "./AppTypes";
import PersonList from "./component/PersonList";
import AddUser from "./component/AddUser";
import EditUser from "./component/EditUser";

const App: React.FC = () => {
  const [persons, setPersons] = useState<Iperson[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // موقع لود اولیه، مقدار تم ذخیره‌شده رو بخون
    return localStorage.getItem("theme") === "dark";
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<Iperson | null>(null);

  // هر بار darkMode تغییر کرد، کلاس html و localStorage رو به‌روز کن
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-white/30 dark:bg-gray-800/40 backdrop-blur-xl shadow-md">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          User Manager
        </h1>
        <div className="flex items-center gap-2">
          <button
  onClick={() => setDarkMode(!darkMode)}
  className="relative w-12 h-12 rounded-full p-2 bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-md hover:scale-110 transition-all duration-500 ease-in-out"
>
  <span
    className={`absolute text-xl transition-transform duration-700 ease-in-out ${
      darkMode ? "rotate-[360deg] text-yellow-400 drop-shadow-[0_0_8px_rgba(255,255,200,0.8)]" : "rotate-0 text-gray-800 dark:text-gray-100 drop-shadow-none"
    }`}
  >
    {darkMode ? "🌞" : "🌙"}
  </span>
</button>


          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:opacity-90 transition"
          >
            Add User
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <PersonList
          persons={persons}
          setPersons={setPersons}
          onEdit={(person: Iperson) => setEditingUser(person)}
        />
      </div>

      {/* AddUser Modal */}
      <AddUser
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        persons={persons}
        setPersons={setPersons}
      />

      {/* EditUser Modal */}
      {editingUser && (
        <EditUser
          person={editingUser}
          persons={persons}
          setPersons={setPersons}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
};

export default App;
