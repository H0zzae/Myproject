import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home, ProjectDetail} from "./pages";

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
