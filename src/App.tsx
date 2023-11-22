import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import User from '../components/User/User';
import Women from '../components/Women/Women';
import Men from '../components/Men/Men';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import DetailedMen from '../components/DetailedMen/DetailedMen';
import DetailedWomen from '../components/DetailedWomen/DetailedWomen';
import AboutUs from '../components/AboutUs/AboutUs';
import Footer from '../components/Footer/Footer';
import Cart from '../components/Cart/Cart';
import { HeroContentLeft } from "c:/Users/BlackHeart/shop/components/HeroContentLeft/HeroContentLeft";

function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Routes>
          <Route path="/" element={<HeroContentLeft />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/men/:menId" element={<DetailedMen />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/women/:womenId" element={<DetailedWomen />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
