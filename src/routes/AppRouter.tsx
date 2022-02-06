import React, { FC } from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import Admin from 'src/Admin';
import App from 'src/App';

// import { useAuth } from 'src/contexts/AuthContext';

function AppRouter() {
  const abc = 123;
  // const { currUser } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<App />} />
        <Route
          path="admin"
          element={<Admin />}
        />
      </Routes>
    </div>
  );
}

export default AppRouter;
