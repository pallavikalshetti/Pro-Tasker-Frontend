import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ProjectDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProject(res.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        alert("Project not found or unauthorized.");
      }
    };
    fetchProject();
  }, [id, user]);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/api/tasks/project/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };
    fetchTasks();
  }, [id, user]);

  // Task status update
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await api.put(
        `/api/tasks/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTasks(tasks.map((t) => (t._id === taskId ? res.data : t)));
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  // Update task
  const handleUpdate = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      await api.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  if (!project) return <p>Loading project...</p>;


return (
  <div className="project-details-container">
    <h1 className="text-2xl mb-4">Project Details</h1>
    
    <div><h3>Project Name</h3></div>
    <div className="project-card">
      <p>{project.name}</p>
    </div>
    
    <div><h3>Project Description</h3></div>
    <div className="project-card">
      <p>{project.description}</p>
    </div>
    
    <div className="dashboard-header-row">
      <h2>Project Tasks</h2>
      <Link to={`/projects/${id}/tasks`} className="underline-link">Add New Task</Link>
    </div>
    {/* Tasks Section */}
    <div className="task-section">
      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <div className="project-table-wrapper">
          <table className="project-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td data-label="Title">{task.title}</td>
                  <td data-label="Description">{task.description}</td>
                  <td data-label="Status">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                      <button
                        className="action-button update"
                        onClick={() => handleUpdate(task._id)}
                      >
                        Update
                      </button>
                      <button
                        className="action-button delete"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

}