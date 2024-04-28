import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './pages/firstPage/header'
import Nav from './components/nav/nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/layout/Layout';
import Admin from './pages/adminPage/adminPage';

function App() {
  return (
    <>
    <Nav/>
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route index element={<Admin/>} />
        <Route path="/file" element={<Header/>} />
        <Route path="/home" element={<Admin/>} />
      </Routes>
    </Layout>
    </BrowserRouter>
    </>
  )
}

export default App
