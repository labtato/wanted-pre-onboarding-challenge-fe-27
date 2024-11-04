import PageAuth from "./pages/PageAuth";
import PrivateRoute from "./routes/PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login before accessing the root route */}
        <Route path="/auth" element={<PageAuth />} />
        {/* content routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<div>home</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
