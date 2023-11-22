import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailedMen.css';
import FadeLoader from "react-spinners/FadeLoader";
import { useDispatch } from 'react-redux';
import { addToCart} from '../../src/cartSlice';
import { Helmet } from "react-helmet";

interface Item {
    image: string;
    image2: string;
    image3: string;
    price: string;
    name: string;
    colour: string;
    type: string;
    brand: string;
    id: number;
    XS: number;
    S: number;
    M: number;
    L: number;
    XL: number;
    XXL: number;
}

function DetailedMen() {
    const { menId } = useParams<{ menId?: string }>();
    const [itemDetails, setItemDetails] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    useEffect(() => {
        if (showAlert) {
            const timeoutId = setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [showAlert]);

    useEffect(() => {
        if (menId) {
            fetchItemDetails();
        }
    }, [menId]);

    const fetchItemDetails = async () => {
        try {
            const response = await axios.get<Item[]>('http://hellafragilesite.com/shop.api/men.php');
            const selectedItem = response.data.find(item => item.id.toString() === menId);

            if (selectedItem) {
                setItemDetails(selectedItem);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const areSizesAvailable = () => {
        return (
            itemDetails &&
            (itemDetails.XS > 0 ||
                itemDetails.S > 0 ||
                itemDetails.M > 0 ||
                itemDetails.L > 0 ||
                itemDetails.XL > 0 ||
                itemDetails.XXL > 0)
        );
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };

    const getSizeClassName = (size: string) => {
        return selectedSize === size ? 'detailed-item-size selected' : 'detailed-item-size';
    };
    

    const dispatch = useDispatch();

    const addToCartHandler = () => {
        if (itemDetails && selectedSize) {
            const cartItem = { name: itemDetails.name, size: selectedSize, image: itemDetails.image, price: itemDetails.price };
            dispatch(addToCart(cartItem));
            setAlertMessage(`Item "${itemDetails.name}" in size ${selectedSize} added to the cart.`);
            setShowAlert(true);
            console.log(itemDetails.name);
        } else {
            setAlertMessage('Please select an item and size before adding to the cart.');
            setShowAlert(true);
        }
    };

    

    return (
        <div className='detailed-main'>
            {loading ? (
                <div className='loading-message'><FadeLoader color="#D94452" /></div>
            ) : itemDetails ? (
                <div className='detailed-item'>
                    <Helmet>
                        <title>{itemDetails.name}</title>
                    </Helmet>
                    <div className='detailed-item-image-box'>
                        {itemDetails.image && <img src={itemDetails.image} alt="" className='detailed-item-image' />}
                        {itemDetails.image2 && <img src={itemDetails.image2} alt="" className='detailed-item-image' />}
                        {itemDetails.image3 && <img src={itemDetails.image3} alt="" className='detailed-item-image' />}
                    </div>
                    <div className='detailed-item-info-box'>
                        <div className='detailed-item-name'>{itemDetails.name}</div>
                        <div className='detailed-item-price'>{itemDetails.price} &nbsp; ₴</div>
                        <div className='detailed-item-brand'> Brand: {itemDetails.brand}</div>
                        <div className='detailed-item-colour'>Colour: {itemDetails.colour}</div>
                        {areSizesAvailable() ? (
                            <div>
                                <div className='detailed-item-colour'>Size: </div>
                                <div className='detailed-item-size-box'>
                                    {itemDetails.XS > 0 && <div className={getSizeClassName('XS')} onClick={() => handleSizeSelect('XS')}>XS</div>}
                                    {itemDetails.S > 0 && <div className={getSizeClassName('S')} onClick={() => handleSizeSelect('S')}>S</div>}
                                    {itemDetails.M > 0 && <div className={getSizeClassName('M')} onClick={() => handleSizeSelect('M')}>M</div>}
                                    {itemDetails.L > 0 && <div className={getSizeClassName('L')} onClick={() => handleSizeSelect('L')}>L</div>}
                                    {itemDetails.XL > 0 && <div className={getSizeClassName('XL')} onClick={() => handleSizeSelect('XL')}>XL</div>}
                                    {itemDetails.XXL > 0 && <div className={getSizeClassName('XXL')} onClick={() => handleSizeSelect('XXL')}>XXL</div>}
                                </div>
                            </div>
                        ) : (
                            <div className='detailed-item-colour out-of-stock'>Item is out of stock. 😅</div>
                            )}
                            <button className='detailed-item-add' onClick={addToCartHandler}>ADD  TO BAG</button>
                            <div className='alert-container-info'>
                                {showAlert && (
                                    <div className="alert alert-info">
                                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 34C22.9 34 22 33.1 22 32V24C22 22.9 22.9 22 24 22C25.1 22 26 22.9 26 24V32C26 33.1 25.1 34 24 34ZM26 18H22V14H26V18Z" fill="#0085FF" />
                                        </svg>
                                        <div className="flex flex-col">
                                            <span className="text-content2">{alertMessage}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                    </div>
                </div>
            ) : (
                <div className='no-item-message'>Item not found. 😅</div>
            )}
        </div>
    );
}

export default DetailedMen;
