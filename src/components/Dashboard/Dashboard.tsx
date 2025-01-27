import { useState, useEffect } from "react";
import {
  User,
  Settings,
  Package,
  LayoutDashboard,
  LogOut,
  Edit,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";



interface Task {
  id: number;
  title: string;
  description: string;
}

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState<string>("Playground");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);

  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Lấy thông tin người dùng từ localStorage
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
          const parsedUser = JSON.parse(currentUser);
          setUserData(parsedUser);
          setName(parsedUser.name);
          setEmail(parsedUser.email);
          setPassword(parsedUser.password);
        } else {
          navigate("/login");
        }

        // Lấy danh sách tasks từ localStorage
        const storedTasks = JSON.parse(localStorage.getItem("crudTasks") || "[]");
        setTasks(storedTasks);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initializeData();
  }, [navigate]);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (!email.includes("@gmail.com")) {
      alert("Email phải chứa '@gmail.com'!");
      return;
    }

    localStorage.removeItem(userData?.email || "");
    const updatedUser = { name, email, password };
    localStorage.setItem(email, JSON.stringify(updatedUser));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setUserData(updatedUser);
    alert("Thông tin đã được cập nhật thành công!");
  };

  const handleAddTask = () => {
    if (!title.trim() || !description.trim()) {
      alert("Vui lòng nhập đầy đủ tiêu đề và mô tả!");
      return;
    }

    const newTask = { id: Date.now(), title, description };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("crudTasks", JSON.stringify(updatedTasks));

    setTitle("");
    setDescription("");
    alert("Task đã được thêm thành công và hiển thị ở To Do List!");
  };

  const handleEditTask = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditId(task.id);
    setSelectedPage("CRUD");
  };

  const handleUpdateTask = () => {
    if (editId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editId ? { ...task, title, description } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("crudTasks", JSON.stringify(updatedTasks));
      setEditId(null);
      setTitle("");
      setDescription("");
      alert("Task đã được cập nhật thành công!");
    }
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("crudTasks", JSON.stringify(updatedTasks));
    alert("Task đã được xóa!");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc muốn đăng xuất không?");
    if (confirmLogout) {
      localStorage.removeItem("currentUser");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-4 border-b flex items-center space-x-2">
          <div className="bg-black text-white p-2 rounded-md">Hello</div>
          <div>
            <h2 className="font-bold text-sm">World</h2>
            <p className="text-xs text-gray-500">2024</p>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setSelectedPage("Playground")}
            className={`flex items-center w-full p-2 rounded-md ${
              selectedPage === "Playground"
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard size={20} className="mr-2" />
            To Do List
          </button>

          <button
            onClick={() => setSelectedPage("CRUD")}
            className={`flex items-center w-full p-2 rounded-md ${
              selectedPage === "CRUD" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <Package size={20} className="mr-2" />
            Add Task
          </button>

          <button
            onClick={() => setSelectedPage("Settings")}
            className={`flex items-center w-full p-2 rounded-md ${
              selectedPage === "Settings" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <Settings size={20} className="mr-2" />
            Settings
          </button>
        </nav>

        {/* Footer */}
        <div className="border-t p-4 flex items-center">
          <User size={28} className="mr-2" />
          <div className="text-sm">
            <p className="font-medium">{userData?.name || "User"}</p>
            <p className="text-gray-500 text-xs">{userData?.email}</p>
          </div>
          <LogOut
            size={20}
            className="ml-auto cursor-pointer text-gray-500 hover:text-red-500"
            onClick={handleLogout}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {selectedPage === "Playground" && (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">To Do List</h1>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h2 className="font-bold">{task.title}</h2>
                    <p className="text-gray-600">{task.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEditTask(task)}
                    >
                      <Edit size={18} />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedPage === "CRUD" && (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Add New Task</h1>
            <div className="space-y-4">
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
                onClick={editId ? handleUpdateTask : handleAddTask}
                className="bg-green-500 text-white hover:bg-green-600 w-full"
              >
                {editId ? "Update Task" : "Add Task"}
              </Button>
            </div>
          </div>
        )}

        {selectedPage === "Settings" && (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>
            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={handleSubmit}
                className="bg-green-500 text-white hover:bg-green-600 w-full"
              >
                Update
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
