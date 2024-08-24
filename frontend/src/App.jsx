import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TextEditor from './TextEditor';
import DescriptionIcon from '@mui/icons-material/Description';

function App() {
  return (
    <Router>
      <div className="flex flex-col items-center bg-gray-100 min-h-screen">
        <header className="w-full bg-blue-600 text-white py-4 px-6 flex items-center justify-center shadow-md">
          <DescriptionIcon className="mr-2" />
          <h1 className="text-2xl font-bold">Google Docs Replica</h1>
        </header>
        <main className="w-full max-w-4xl my-8 p-4 bg-white rounded-lg shadow-md">
          <Routes>
            <Route path="/document/:id" element={<TextEditor />} />
            <Route path="/" element={<TextEditor />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
