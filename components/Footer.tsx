import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-16 pb-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Column 1: Logo & Info */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-3xl font-bold mb-4">Flone.</h2>
            <p className="text-gray-500 text-sm">© 2024 Flone.</p>
            <p className="text-gray-500 text-sm">All Rights Reserved</p>
          </div>

          {/* Column 2: About Us */}
          <div>
            <h3 className="font-semibold mb-4">ABOUT US</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black">About us</a></li>
              <li><a href="#" className="hover:text-black">Store location</a></li>
              <li><a href="#" className="hover:text-black">Contact</a></li>
              <li><a href="#" className="hover:text-black">Orders tracking</a></li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h3 className="font-semibold mb-4">USEFUL LINKS</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black">Returns</a></li>
              <li><a href="#" className="hover:text-black">Support Policy</a></li>
              <li><a href="#" className="hover:text-black">Size guide</a></li>
              <li><a href="#" className="hover:text-black">FAQs</a></li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h3 className="font-semibold mb-4">FOLLOW US</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black">Facebook</a></li>
              <li><a href="#" className="hover:text-black">Twitter</a></li>
              <li><a href="#" className="hover:text-black">Instagram</a></li>
              <li><a href="#" className="hover:text-black">Youtube</a></li>
            </ul>
          </div>
          
          {/* Column 5: Subscribe */}
          <div>
             <h3 className="font-semibold mb-4">SUBSCRIBE</h3>
             <p className="text-sm text-gray-500 mb-3">Get E-mail updates about our latest shop and special offers.</p>
             <div className="flex">
                <input type="email" placeholder="Enter your email here.." className="w-full text-sm border-b focus:outline-none"/>
             </div>
             <a href="#" className="text-sm font-medium mt-3 block">SUBSCRIBE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};