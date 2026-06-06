import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-black text-white mt-2 text-sm">
      <div className="">
        <ul className="flex flex-row justify-around p-3 py-9 text-gray-400">
          <li>
            About
            <ul className="flex flex-col mt-5  text-white gap-2">
              <li className="hover:underline">Contact Us</li>
              <li className="hover:underline">About Us</li>
              <li className="hover:underline">Careers</li>
              <li className="hover:underline">My Mart Stories</li>
            </ul>
          </li>
          <li>
            Group Companies
            <ul className="flex flex-col mt-5 text-white gap-2">
              <li className="hover:underline">Myntra</li>
              <li className="hover:underline">ClearTrip</li>
              <li className="hover:underline">Shopsy</li>
            </ul>
          </li>
          <li>
            Help
            <ul className="flex flex-col mt-5 text-white gap-2">
              <li className="hover:underline">Payments</li>
              <li className="hover:underline">Shipping</li>
              <li className="hover:underline">Cancellation & Returns</li>
              <li className="hover:underline">FAQ</li>
            </ul>
          </li>
          <li>
            Consumer Policy
            <ul className="flex flex-col mt-5 text-white gap-2">
              <li className="hover:underline">Cancellation & Returns</li>
              <li className="hover:underline">Terms of Use</li>
              <li className="hover:underline">Security</li>
              <li className="hover:underline">Privacy</li>
              <li className="hover:underline">Sitemap</li>
              <li className="hover:underline">App</li>
            </ul>
          </li>
          <div className="border-r-2 border-gray-400"></div>
          <li>
            Social
            <ul className="mt-5 text-white flex flex-col gap-4">
              <li className="group">
                <FontAwesomeIcon className="text-2xl hover:text-blue-600" icon={faFacebook} />
                <span className="hidden group-hover:inline-block transition absolute mt-1 ">
                  Facebook
                </span>
              </li>
              <li className="group">
                <FontAwesomeIcon className="text-2xl hover:text-orange-600" icon={faInstagram} />
                <span className="hidden group-hover:inline-block transition absolute mt-1 ">
                  Instagram
                </span>
              </li>
              <li className="group">
                <FontAwesomeIcon className="text-2xl hover:text-sky-500" icon={faTwitter} />
                <span className="hidden group-hover:inline-block transition absolute mt-1 ">
                  Twitter
                </span>
              </li>
              <li className="group">
                <FontAwesomeIcon className="text-2xl hover:text-red-600" icon={faYoutube} />
                <span className="hidden group-hover:inline-block transition absolute mt-1 ">
                  Youtube
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
