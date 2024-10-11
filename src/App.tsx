import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '@/views/Home';
import Docs from '@/views/Docs';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/docs"
          element={<Docs />}
        />
      </Routes>
    </>
  );
}

export default App;
