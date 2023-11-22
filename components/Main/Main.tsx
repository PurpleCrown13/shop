import '../Main/Main.css';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";


function Main() {

    return (
      <div className='mainn'>
        <Helmet>
          <title>Best Shop 💯</title>
        </Helmet>
        <div className='mainn-top-box'>
          <div className='mainn-title-text'>
            <div className='font-bold bg-midnight text-yellow-400	'>
              Welcome to [Your Brand Name], where royalty meets fashion! Immerse yourself in a realm of boundless elegance and impeccable style. Our curated selection of apparel seamlessly merges timeless classics with the latest trends, promising to redefine your wardrobe. Whether you're preparing for a regal event or embracing everyday grandeur, allow us to accompany you on this voyage of self-discovery.            </div>
          </div>
          <div className='mainn-box-image'>
            <img src="sad.jpg" alt="" className='mainn-image' />
            <img src="happy.jpg" alt="" className='mainn-image' />
          </div>
        </div>
          {/* <div className='mainn-line'>
            <div className='mainn-box'>
              <div className='mainn-text'>
                Sign in to see your bag and get shopping!
              </div>
              <Link to={`/signin`} className='mainn-button'>
                  Sign in
              </Link>
            </div>
          </div> */}
      </div>
        
    )
}

export default Main