import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Writer } from './pages/writer';
import { Auth } from './pages/auth';
import { CreateDocument } from './pages/create-document';
import { SavedDocuments } from './pages/saved-documents';

// Components

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writer" element={<Writer />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-document" element={<CreateDocument />} />
          <Route path="/saved-documents" element={<SavedDocuments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
