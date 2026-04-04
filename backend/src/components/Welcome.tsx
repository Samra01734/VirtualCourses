"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBasket, Truck, ShieldCheck, CreditCard } from "lucide-react";

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-green-100 to-green-50 px-6">

      {/* Logo + Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex items-center gap-3 mb-6"
      >
        <ShoppingBasket className="w-12 h-12 text-green-600" />
        <h1 className="text-5xl font-extrabold text-green-700">SnapCart</h1>
      </motion.div>

      {/* Paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="max-w-xl text-center text-gray-700 text-lg mb-8"
      >
        SnapCart is your smart e-commerce destination — fast, secure, and enjoyable.
        Discover quality products with smooth checkout and reliable delivery.
      </motion.p>

      {/* Feature Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex gap-12"
      >

        <div className="flex flex-col items-center gap-2 text-orange-500">
          <Truck className="w-10 h-10" />
          <span className="text-sm font-semibold text-gray-800">
            Fast Delivery
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 text-blue-500">
          <ShieldCheck className="w-10 h-10" />
          <span className="text-sm font-semibold text-gray-800">
            Secure Payment
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 text-purple-500">
          <CreditCard className="w-10 h-10" />
          <span className="text-sm font-semibold text-gray-800">
            Easy Checkout
          </span>
        </div>

      </motion.div>

    </div>
  );
};

export default Welcome;