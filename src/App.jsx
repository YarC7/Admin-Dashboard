import { Routes, Route, useRouteError } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import Login from './pages/auth/Login'
import Home from './pages/Home/Home';
import store from './lib/store';
import './App.css'
import ProtectedRoute from './routes/ProtectedRoute';
import Book from './pages/Book/Book';
import Inventory from './pages/Inventory/Inventory';
import Expenses from './pages/Expense/Expenses';
import Dashboard from './pages/Dashboard/page';
import Users from './pages/User/User';
import Settings from './pages/Setting/Setting';
function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Loi!</div>;
}

function App() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <Wrapper>
                <ProtectedRoute>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} errorElement={<ErrorBoundary />} />
                    <Route path="books" element={<Book />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="expenses" element={<Expenses />} />
                    <Route path="user" element={<Users/>} />
                    <Route path="setting" element={<Settings />} />
                    {/* Các route bảo vệ khác */}
                    
                  </Routes>
                </ProtectedRoute>
              </Wrapper>
            }
          />
        </Routes>
    </>
  )
}

export default App
