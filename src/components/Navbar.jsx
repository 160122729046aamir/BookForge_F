import { Link, useNavigate } from "react-router-dom";
import {
  HiMiniBars3CenterLeft,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import Swal from 'sweetalert2';

import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue,setSearchValue]=useState('');
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };
  const handleKeyPress = (event)=>{
    if (event.key === "Enter") {
      handleSearchButton();
    }
  }
  const handleSearchButton = async () => {
    try {
        const response = await axios.get(`${getBaseUrl()}/api/books/getbook/${searchValue}`)
        // console.log(response.data)
        if (!response.data){
          Swal.fire({
            title: "Not Found!",
            text: "No Book Found!",
            icon: "warning",
            confirmButtonText: "OK"
          });
           
        }else{
          navigate(`/books/${response.data._id}`)
        }
    } catch (error) {
        Swal.fire({
          title: "Not Found!",
          text: "No Book Found!",
          icon: "warning",
          confirmButtonText: "OK"
        });      
        console.error(error)
    }
  }
  const token = localStorage.getItem("token");

  return (
    <header className="max-w-screen-2xl bg-gray-900 mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className="size-9 text-white" />
          </Link>

          {/* search input */}
          <div className="flex sm:w-80 w-48 rounded-md shadow-md">
            <input
              type="text"
              placeholder="Search Book"
              className="w-full px-4 py-1 rounded-l-md text-black border border-gray-300 focus:outline-none"
              onKeyPress={handleKeyPress}
              value={searchValue}
              onChange={(e)=>setSearchValue(e.target.value)}
            />
            <button className="bg-primary px-6 py-1 rounded-r-md text-white font-medium hover:bg-primary-dark transition duration-300" onClick={handleSearchButton}>
              Search
            </button>
          </div>
        </div>

        {/* rigth side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-900" : ""
                    }`}
                  />
                </button>
                {/* show dropdowns */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : token ? (
              <Link to="/dashboard" className="border-b-2 text-white border-primary">
                Dashboard
              </Link>
            ) : (
              <Link to="/login">
                {" "}
                <HiOutlineUser className="size-8 text-white" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <HiOutlineHeart className="size-8 text-white" />
          </button>

          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <HiOutlineShoppingCart className="" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
