import '../css/SearchBar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLocationDot, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import data from '../data';
import {useRef, useState, useEffect} from 'react';

export const SearchBar = ({staysFilter, word, setStays}) => {

    const [searchState, setSearchState] = useState([]);
    const [counter, setCounter] = useState(0);

    const searchBar = useRef();
    const searchBg = useRef();
    const bg = useRef()
    const locationInp = useRef();
    const guestsInp = useRef();
    const searchButton = useRef();

    useEffect(() => {
        let locations = new Set([]);
        let locationsSearch = [];
        data.forEach(stay => {
            if (word.length > 0 || word === "") {
                if (`${stay.city}, ${stay.country}`.toLowerCase().includes(word.toLowerCase())) {
                    locations.add(`${stay.city}, ${stay.country}`);
                }
            }
        })
        locations.forEach(stay => locationsSearch.push(stay));
        setSearchState(locationsSearch);
    }, [word]);

    const searchOpen = (e) => {
        searchBar.current.classList.add('search-open');
        searchBg.current.style.display = "block";
        bg.current.style.display = "block";
        searchButton.current.classList.add('button-open');
        searchButton.current.childNodes[0].style.borderRadius = "15px";
        searchButton.current.childNodes[0].style.width = "140px";
        searchButton.current.childNodes[0].style.background = "#eb5757";
        searchButton.current.childNodes[0].childNodes[0].style.color = "#fff";
        searchButton.current.childNodes[0].childNodes[1].style.color = "#fff";
        searchButton.current.childNodes[0].childNodes[0].style.position = "relative";
        e.target.offsetParent.offsetParent.childNodes[0].childNodes[0].childNodes[0].style.top="8px";
        e.target.offsetParent.offsetParent.childNodes[0].childNodes[0].childNodes[1].style.top="30px";
        e.target.offsetParent.offsetParent.childNodes[1].childNodes[0].childNodes[0].style.top="8px";
        e.target.offsetParent.offsetParent.childNodes[1].childNodes[0].childNodes[1].style.top="30px";
        e.target.ownerDocument.childNodes[1].style.overflow = "hidden";    
    }

    const searchClose = (e) => {
        searchBar.current.classList.remove('search-open');
        searchBg.current.style.display = "none";
        bg.current.style.display = "none";
        searchButton.current.classList.remove('button-open');
        searchButton.current.childNodes[0].style.borderRadius = "0 15px 15px 0";
        searchButton.current.childNodes[0].style.width = "70px";
        searchButton.current.childNodes[0].style.background = "#fff";
        searchButton.current.childNodes[0].childNodes[0].style.color = "#eb5757";
        searchButton.current.childNodes[0].childNodes[1].style.color = "#fff";
        searchButton.current.childNodes[0].childNodes[0].style.position = "absolute";
        e.target.parentElement.childNodes[1].childNodes[0].childNodes[0].childNodes[0].style.top="20px";
        e.target.parentElement.childNodes[1].childNodes[0].childNodes[0].childNodes[1].style.top="20px";
        e.target.parentElement.childNodes[1].childNodes[1].childNodes[0].childNodes[0].style.top="20px";
        e.target.parentElement.childNodes[1].childNodes[1].childNodes[0].childNodes[1].style.top="20px";
        e.target.ownerDocument.childNodes[1].style.overflow = "visible";
    }

    const setInput = (e) => locationInp.current.lastChild.value = e.target.textContent;

    const focusLocation = (e) => locationInp.current.style.outline = "2px solid #000";

    const blurLocation = (e) => locationInp.current.style.outline = "none";

    const focusGuests = (e) => guestsInp.current.style.outline = "2px solid #000";

    const blurGuests = (e) => guestsInp.current.style.outline = "none";

    const decrement = (e) => {
        if (e.target.nextElementSibling.textContent === "0") return null;
        let number = parseInt(e.target.nextElementSibling.textContent) - 1;
        e.target.nextElementSibling.textContent = number;
        let cant = 0;
        e.target.offsetParent.childNodes.forEach(element => {
            cant += parseInt(element.lastChild.childNodes[1].textContent);
            setCounter(cant);
        });
    }

    const increment = (e) => {
        let number = parseInt(e.target.previousElementSibling.textContent) + 1;
        e.target.previousElementSibling.textContent = number;
        let cant = 0;
        e.target.offsetParent.childNodes.forEach(element => {
            cant += parseInt(element.lastChild.childNodes[1].textContent);
            setCounter(cant);
        });
    }

    const searchStays = (e) => {
        let location = locationInp.current.lastChild.value;
        let guests = parseInt(guestsInp.current.lastChild.value);
        let state = [];
        if (isNaN(guests)) guests = 0;
        data.forEach(stay => {
            if (`${stay.city}, ${stay.country}`.toLowerCase()
                .includes(location.toLowerCase()) && stay.maxGuests >= guests) state.push(stay);
        });
        setStays(state);
        searchBar.current.classList.remove('search-open');
        searchBg.current.style.display = "none";
        bg.current.style.display = "none";
        e.target.ownerDocument.childNodes[1].style.overflow = "visible";
        searchButton.current.classList.remove('button-open');
        searchButton.current.childNodes[0].style.borderRadius = "0 15px 15px 0";
        searchButton.current.childNodes[0].style.width = "70px";
        searchButton.current.childNodes[0].style.background = "#fff";
        searchButton.current.childNodes[0].childNodes[0].style.color = "#eb5757";
        searchButton.current.childNodes[0].childNodes[1].style.color = "#fff";
        searchButton.current.childNodes[0].childNodes[0].style.position = "absolute";
    }

    return (
        <>
            <div className="search-bar" ref={searchBar}>
                <div className="location">
                    <div className="input" ref={locationInp}>
                        <p>Location</p>
                        <input type="text" placeholder="Add location" onClick={searchOpen}
                         onChange={staysFilter} onFocus={focusLocation} onBlur={blurLocation} defaultValue="Helsinki, Finland"/>
                    </div>
                </div>
                <div className="guests">
                    <div className="input" ref={guestsInp}>
                        <p>Guests</p>
                        <input type="text" placeholder="Add guests" onClick={searchOpen}
                         onFocus={focusGuests} onBlur={blurGuests} value={counter >= 1 ? counter : ''} readOnly/>
                    </div>
                </div>
                <div className="button" ref={searchButton}>
                    <button className="btn-search" onClick={searchStays}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        <span>Search</span>
                    </button>
                </div> 
            </div>
            <div className="search-background" ref={searchBg}>
                <div className="stays-filter">
                    {
                        searchState.map((element, index) => {
                            return (
                                <li key={index} onClick={setInput}>
                                    <FontAwesomeIcon icon={faLocationDot}/>{element}
                                </li>
                            )                
                        })
                    }
                </div>
                <div className="guests-cant">
                    <div>
                        <h3>Adults</h3>
                        <p>Ages 13 or above</p>
                        <div className="counter">
                            <button onClick={decrement}>-</button>
                            <div>0</div>
                            <button onClick={increment}>+</button>
                        </div>
                    </div>
                    <div>
                        <h3>Children</h3>
                        <p>Ages 2 - 12</p>
                        <div className="counter">
                            <button onClick={decrement}>-</button>
                            <div>0</div>
                            <button onClick={increment}>+</button>
                        </div>
                    </div>
                </div>
            </div> 
            <div className="background" onClick={searchClose} ref={bg}></div>
        </>
    );
}