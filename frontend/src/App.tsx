import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import IssueDetails from "./pages/IssueDetails";

import CreateIssue from "./pages/CreateIssue";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        

        <Route
          path="/issues/:id"
          element={<IssueDetails />}
        />

        <Route
  path="/create"
  element={<CreateIssue />}
/>
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;