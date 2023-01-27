import { Route, Routes } from 'react-router-dom';
import TablePage from "./pages/TablePage";
import DetailsPage from "./pages/DetailsPage";
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<TablePage/>}/>
        <Route path='details/:id' element={<DetailsPage/>}/>
        <Route path="*" element={
          <div>
            <h2>404 Page not found etc</h2>
          </div>
        }/>
      </Routes>
    </div>
  );
}

export default App;
