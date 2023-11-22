import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, removeItemFromCart, clearCart } from '../../src/cartSlice';
import '../Cart/Cart.css';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const handleDeleteClick = (itemIndex: number) => {
        dispatch(removeItemFromCart(itemIndex));
    };

    const totalPrice = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price);
        return isNaN(price) ? total : total + price;
    }, 0);

    const handleBuyClick = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            dispatch(clearCart()); 
        }, 5000);
    };

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (!username) {
            navigate('/user');
        }
        if (showAlert) {
        }
    }, [showAlert]);

    return (
        <div className="cart">
            <Helmet>
                <title>Cart</title>
            </Helmet>
            {cartItems.length === 0 ? (
                <p className="cart-empty">Your cart is empty. 🥺</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item, index) => (
                            <div className="cart-box" key={index}>
                                <li>
                                    <div className="cart-item">
                                        <img src={item.image} alt="" className="cart-image" />
                                        <div className="cart-name">{item.name}</div>
                                        <div className="cart-size">Size: {item.size} </div>
                                        <div className="cart-price">Price: {item.price} ₴</div>
                                        <button onClick={() => handleDeleteClick(index)}>DELETE</button>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                    <div className="cart-bottom-box">
                        <div className="total-price">Total Price: {totalPrice} ₴</div>
                        <button className="buy" onClick={handleBuyClick}>
                            BUY
                        </button>
                    </div>
                </div>
            )}

            {showAlert && (
                <div className="alert alert-success">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM18.58 32.58L11.4 25.4C10.62 24.62 10.62 23.36 11.4 22.58C12.18 21.8 13.44 21.8 14.22 22.58L20 28.34L33.76 14.58C34.54 13.8 35.8 13.8 36.58 14.58C37.36 15.36 37.36 16.62 36.58 17.4L21.4 32.58C20.64 33.36 19.36 33.36 18.58 32.58Z"
                            fill="#00BA34"
                        />
                    </svg>
                    <div className="flex flex-col">
                        <span className="text-content2">You have successfully completed the purchase</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
