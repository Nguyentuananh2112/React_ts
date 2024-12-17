import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
}

const CRUD: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("crudTasks") || "[]");
    setTasks(storedTasks);
  }, []);

  const saveTasksToStorage = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem("crudTasks", JSON.stringify(updatedTasks));
  };

  const handleAddOrUpdate = () => {
    if (!title.trim() || !description.trim()) {
      alert("Vui lòng nhập tiêu đề và mô tả!");
      return;
    }

    if (editId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editId ? { ...task, title, description } : task
      );
      saveTasksToStorage(updatedTasks);
      setEditId(null);
    } else {
      const newTask: Task = { id: Date.now(), title, description };
      saveTasksToStorage([...tasks, newTask]);
    }

    setTitle("");
    setDescription("");
  };

  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasksToStorage(updatedTasks);
  };

  const handleEdit = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditId(task.id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Task Management</h1>

        {/* Input Fields */}
        <div className="space-y-4 mb-6">
          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            onClick={handleAddOrUpdate}
            className="bg-blue-500 text-white hover:bg-blue-600 w-full"
          >
            {editId ? "Update Task" : "Add Task"}
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-100 transition ease-in-out"
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{task.title}</td>
                    <td className="border px-4 py-2">{task.description}</td>
                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(task)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(task.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 text-gray-500 font-medium"
                  >
                    No tasks yet. Add a new task!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CRUD;
