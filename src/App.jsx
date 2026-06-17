import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import CourseLearning from "./pages/CourseLearning";
import PostCourse from "./pages/PostCourse";
import ViewCourses from "./pages/ViewCourses";
import UpdateCourse from "./pages/UpdateCourse";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route
  path="/post-course"
  element={<PostCourse />}
/>

<Route
  path="/view-courses"
  element={<ViewCourses />}
/>
        <Route path="/signup" element={<Signup />} />

        {/* User Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route
  path="/view-courses"
  element={<ViewCourses />}
/>
        <Route
  path="/post-course"
  element={<PostCourse />}
/>

<Route
  path="/update-course/:id"
  element={<UpdateCourse />}
/>

        <Route
  path="/learning/:courseId"
  element={<CourseLearning />}
/>
<Route
  path="/settings"
  element={<Settings />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;