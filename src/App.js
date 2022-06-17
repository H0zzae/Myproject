import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home, ProjectDetail} from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
