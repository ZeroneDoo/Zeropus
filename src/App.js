import './App.css';
import Register from './app/pages/Register.tsx';
import Login from './app/pages/Login.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './app/pages/Landing.tsx';
import DetailBook from './app/pages/DetailBook.tsx';
import Reader from './app/pages/Reader.tsx';
import AuthProvider from './app/context/AuthProvider.tsx';
import { ToastContainer } from 'react-toastify';
import AuthGuard from './app/helper/AuthGuard.tsx';
import Credit from './app/pages/Credit.tsx';
import Book from './app/pages/Book.tsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import Bookmark from './app/pages/Bookmark.tsx';
import Rent from './app/pages/Rent.tsx';
// import "tw-elements-react/dist/css/tw-elements-react.min.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/book" element={<Book />} />
            <Route path="/book/:id" element={<DetailBook />}/>
            <Route path="/reader" element={<Reader />}/>
            <Route path="/register" element={<AuthGuard><Register /></AuthGuard>}/>
            <Route path="/login" element={<AuthGuard><Login /></AuthGuard>}/>
            <Route path="/credit" element={<Credit />}/>
            <Route path="/bookmark" element={<Bookmark />}/>
            <Route path="/rent" element={<Rent />}/>
          </Routes>
        </ Router>
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
