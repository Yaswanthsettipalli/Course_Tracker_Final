import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = {
    name: "Yashwanth",
  };

  const courses = [
    {
      id: 1,
      title: "React for Beginners",
      progress: 80,
    },
    {
      id: 2,
      title: "MySQL Mastery",
      progress: 65,
    },
    {
      id: 3,
      title: "Node.js Essentials",
      progress: 40,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome Back, {user.name} 👋</h1>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>3</h2>
          <p>Courses Enrolled</p>
        </div>

        <div className="stat-card">
          <h2>62%</h2>
          <p>Overall Progress</p>
        </div>

        <div className="stat-card">
          <h2>8</h2>
          <p>Lessons Completed</p>
        </div>
      </div>

      <div className="course-section">
        <h2>My Courses</h2>

        {courses.map((course) => (
          <div
            className="course-card"
            key={course.id}
          >
            <div>
              <h3>{course.title}</h3>
              <p>
                Progress: {course.progress}%
              </p>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${course.progress}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;