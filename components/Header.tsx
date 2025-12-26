"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; // 👈 importa o hook

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart(); // 👈 total de itens no carrinho

  return (
    <div className="header-wrapper">
      <header>
        <div className="container">
     
          {/* LOGO */}
          <div className="logo">
            <Link href="/">
              <Image
                src="/logoheadero.png"
                alt="RecargaBux"
                width={110}
                height={110}
                priority
              />
            </Link>
          </div>

          {/* SEARCH */}
          <div className="search">
            <input placeholder="O que está buscando?" />
            <button className="search-btn">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
            </button>
          </div>

          {/* CART */}
          <Link href="/cart" className="cart">
            <div className="cart-icon-wrapper">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                height="22"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
              </svg>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
            <span>Carrinho</span>
          </Link>
        </div>
      </header>
    </div>
  );
}
