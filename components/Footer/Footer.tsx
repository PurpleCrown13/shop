import '../Footer/Footer.css';

function Footer() {
    const imagePath = import.meta.env.BASE_URL; 

    return (
        <footer className='footer'>
            <div className='footer-top'>
                <div className='footer-column'>
                    <div className="column-name">Text Us</div>
                    <div className="column-link">example-not-exist@gmail.com</div>
                </div>
                <div className='footer-column'>
                    <div className="column-name">Call Us</div>
                    <div className="column-link">+096 123 123 123</div>
                </div>
            </div>
            <div className='footer-end'>
                <div className="footer-buttons">
                    <div className='footer-container'>
                        <img src={`${imagePath}facebook.svg`} alt="" className='footer-social' />
                        <img src={`${imagePath}instagram.svg`} alt="" className='footer-social' />
                        <img src={`${imagePath}reddit.svg`} alt="" className='footer-social' />
                        <img src={`${imagePath}twitter.svg`} alt="" className='footer-social' />
                        <img src={`${imagePath}telegram.svg`} alt="" className='footer-social' />
                        <div className='footer-pay'>|</div>
                        <img src={`${imagePath}visa.svg`} alt="" className='footer-pay' />
                        <img src={`${imagePath}mastercard.svg`} alt="" className='footer-pay' />
                        <img src={`${imagePath}paypal.svg`} alt="" className='footer-pay' />
                    </div>
                </div>
                <div className='footer-bottom'>
                    <p>&copy; 2023 Shop</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
