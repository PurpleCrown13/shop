import  { useState, useEffect } from 'react';
import axios from 'axios';
import '../Women/Women.css';
import FadeLoader from "react-spinners/FadeLoader";
import {  Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

interface Item {
  image: string;
  price: number;
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

function Women() {
  const [items, setItems] = useState<Item[]>([]);
  const [uniqueColours, setUniqueColours] = useState<string[]>([]);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [uniqueBrands, setUniqueBrands] = useState<string[]>([]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get<Item[]>('http://hellafragilesite.com/shop.api/women.php'); 
      setItems(response.data);

      const colours = Array.from(new Set(response.data.map(item => item.colour)));
      const types = Array.from(new Set(response.data.map(item => item.type)));
      const brands = Array.from(new Set(response.data.map(item => item.brand)));
      setUniqueColours(colours);
      setUniqueTypes(types);
      setUniqueBrands(brands);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleColourChange = (colour: string) => {
    if (selectedColours.includes(colour)) {
      setSelectedColours(selectedColours.filter(item => item !== colour));
    } else {
      setSelectedColours([...selectedColours, colour]);
    }
  };

  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(item => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(item => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const clearAllFilters = () => {
    setSelectedColours([]);
    setSelectedTypes([]);
    setSelectedBrands([]);
  };

  const filteredItems = items.filter(item =>
    (selectedColours.length === 0 || selectedColours.includes(item.colour)) &&
    (selectedTypes.length === 0 || selectedTypes.includes(item.type)) &&
    (selectedBrands.length === 0 || selectedBrands.includes(item.brand))

  );


  return (
    <div className='main'>
      <Helmet>
        <title>Women</title>
      </Helmet>
      <div className='wrapper'>
        <div className='filters'>
          <div className="filter">
            <div className='filter-title'>Colours</div>
            {uniqueColours.map((colour, index) => (
              <div className='filter-item' key={index}>
                <input
                  type="checkbox"
                  name={colour}
                  id={colour}
                  checked={selectedColours.includes(colour)}
                  onChange={() => handleColourChange(colour)}
                />
                <label htmlFor={colour}>{colour}</label>
              </div>
            ))}
          </div>
          <div className="filter">
            <div className='filter-title'>Type</div>
            {uniqueTypes.map((type, index) => (
              <div className='filter-item' key={index}>
                <input
                  type="checkbox"
                  name={type}
                  id={type}
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                />
                <label htmlFor={type}>{type}</label>
              </div>
            ))}
          </div>
          <div className="filter">
            <div className='filter-title'>Brand</div>
            {uniqueBrands.map((brand, index) => (
              <div className='filter-item' key={index}>
                <input
                  type="checkbox"
                  name={brand}
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <label htmlFor={brand}>{brand}</label>
              </div>
            ))}
          </div>
          <button onClick={clearAllFilters} className='clear-all'>Clear all</button>
        </div>
        <div className='content'>
          {loading ? (
            <div className='loading-message'><FadeLoader color="#D94452" /></div>
          ) : filteredItems.length === 0 ? (
            <div className='no-items-message'>No items matching the selected filters. 😅</div>
          ) : (
            filteredItems.map((item) => {
              const isTransparent = item.XS == 0 && item.S == 0 && item.M == 0 && item.L == 0 && item.XL == 0 && item.XXL == 0;
              return (
                <Link
                  to={`/women/${item.id}`}
                  key={item.id}
                  className={`item ${isTransparent ? 'transparent-item' : ''}`}

                >
                  <img src={item.image} alt="" className='item-image' />
                  <div className='item-price'>{item.price} &nbsp; ₴</div>
                  <div className='item-name'>{item.name}</div>

                </Link>
              );
            })

          )}
        </div>
      </div>
    </div>
  );
}

export default Women;
