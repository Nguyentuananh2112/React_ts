import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
}

const ToDoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("crudTasks") || "[]");
    setTasks(storedTasks);
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">To Do List</h1>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToDoList;
