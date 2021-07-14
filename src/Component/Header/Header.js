// import './Header.css';
import { BiImageAdd } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';

import PopUp from './PopUp/PopUp';

const Header = props => {
    const [isAdding, setIsAdding] = useState(false);

    const popUp = () => {
        console.log(isAdding);
        setIsAdding(!isAdding);
    }

    const closePopUp = () => {
        setIsAdding(false);
    }

    return (
        <>
            <div className="p-6 h-20 flex justify-center items-center space-x-5 border">
                <h2 className='text-2xl font-mono'>Social Media App</h2>
                {/* <div className="bg-gray-200 h-8 w-8 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="search-icon" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </div> */}
                <input className='border rounded-md border-gray-400 text-center bg-gray-50 h-8'
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button className='bg-gray-100 h-8 w-14 rounded-md border border-gray-400 text-gray-400 hover:bg-white hover:text-black hover:border-black'
                    type="submit">Go</button>
                <BiImageAdd onClick={popUp} className='w-7 h-7 cursor-pointer' />
                <CgProfile className='w-6 h-6 cursor-pointer'/>
            </div>
            {isAdding ? <PopUp close={closePopUp}/> : null}
        </>
    );
}

export default Header;