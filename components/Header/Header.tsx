import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../src/cartSlice';

import '../Header/Header.css';

function Header() {
    const imagePath = import.meta.env.BASE_URL;

    const cartItems = useSelector(selectCartItems);

    return (
        <div className="navbar navbar-sticky">
            <div className="navbar-start">
                <div className='logo'>
                    <img src={`${imagePath}shirt2.svg`} alt='logo' />
                </div>
            </div>
            <div className="navbar-center nav-menu">
                         <ul className='header-ul'>
                             <li>
                                 <Link to='/' className='header-link'>Home</Link>
                             </li>
                             <li>
                        <Link to='/men' className='header-link'>Men</Link>
                          </li>
                            <li>
                        <Link to='/women' className='header-link'>Women</Link>
                             </li>
                             <li>
                        <Link to='/about' className='header-link'>About Us</Link>
                             </li>
                         </ul>
            </div>
            <div className="navbar-end user-controls">
                <Link to='/user' className='user-icon'>
                             <img src={`${imagePath}user.svg`} alt='user' />
                         </Link>
                         <Link to='/cart' className='cart-icon-container'>
                             <img src={`${imagePath}basket.svg`} alt='bag' className='cart-icon' />
                             {cartItems.length > 0 && (
                                 <div className='cart-item-count'>{cartItems.length}</div>
                             )}
                </Link>
            </div>
        </div>
    );
}

export default Header;
