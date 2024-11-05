import TodoDetail from "./components/pageMain/TodoDetail";
import TodoList from "./components/pageMain/TodoList";
import PageAuth from "./pages/PageAuth";
import PageMain from "./pages/PageMain";
import PageSignup from "./pages/PageSignup";
import PrivateRoute from "./routes/PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login before accessing the root route */}
        <Route path="/auth" element={<PageAuth />} />
        <Route path="/signup" element={<PageSignup />} />
        {/* content routes */}
        <Route element={<PrivateRoute />}>
          {/* main route */}
          <Route path="/" element={<PageMain />}>
            <Route path="/" element={<TodoList />}>
              <Route path=":todoId" element={<TodoDetail />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
