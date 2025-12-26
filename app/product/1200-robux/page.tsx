"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewsSlider from "@/components/ReviewsSlider";
import { useCart } from "@/context/CartContext";
import "../product.css";

type TabKey = "desc" | "how" | "terms";

export default function ProductPage() {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<TabKey>("how");
  const { addToCart } = useCart();
  const router = useRouter();

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(99, q + 1));

  const product = useMemo(
    () => ({
      id: "1200-robux",
      name: "1200 ROBUX",
      price: 19.9,
      image: "/1200a.png",
      sold: 178,
      ratingCount: 108,
      rating: 5,
    }),
    []
  );

  const handleBuyNow = () => {
    addToCart({ ...product, qty });
    router.push("/cart");
  };

  const handleAddToCart = () => {
    addToCart({ ...product, qty });
  };

  return (
    <div className="product-root">
      <Header />
      <div className="header-spacer" />

      <main className="product-container">
        <nav className="product-breadcrumb">
          <Link href="/">Página inicial</Link> / <strong>ROBLOX</strong> /{" "}
          <span>{product.name}</span>
        </nav>

        {/* MOBILE-FIRST HERO */}
        <section className="pd-shell">
          {/* imagem */}
          <div className="pd-mediaCard">
            <div className="pd-mediaInner">
              <Image
                src={product.image}
                alt={product.name}
                width={900}
                height={900}
                priority
                className="pd-img"
              />
              <div className="pd-mediaGlow" />
            </div>
          </div>

          {/* infos */}
          <div className="pd-infoCard">
            <div className="pd-toprow">
              <span className="pd-pill">Entrega automática</span>
              <span className="pd-muted">+{product.sold} vendidos</span>
            </div>

            <div className="pd-titleRow">
              <img
                src="/Robloxi_valuuta__Robux__Ikoon.png"
                alt="Robux Ícone"
                width={22}
                height={22}
              />
              <h1 className="pd-title">
                {product.name}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="verify-icon"
                  height="18"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                </svg>
              </h1>
            </div>

            {/* ⭐ AVALIAÇÕES SEMPRE AQUI (fora dos tabs) */}
            <div className="pd-ratingCard">
              <div className="pd-starsRow">
                <div className="stars big">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="star full">
                      ★
                    </span>
                  ))}
                </div>
                <span className="pd-muted">{product.ratingCount} avaliações</span>
              </div>

              <div className="pd-ratingMeta">
                <span className="pd-chip">Qualidade garantida</span>
                <span className="pd-chip">Entrega rápida</span>
                <span className="pd-chip">Suporte</span>
              </div>
            </div>

            <div className="pd-priceRow">
              <div className="pd-price">
                <span className="rs">R$</span>
                <span className="num">{product.price.toFixed(2)}</span>
              </div>
              <div className="pd-stock">
                <span className="dot" /> Disponível
              </div>
            </div>

            {/* BUY (visível no mobile também) */}
            <div className="pd-buyBox">
              <div className="pd-qtyrow">
                <button onClick={dec} className="qtybtn" aria-label="Diminuir">
                  –
                </button>
                <input
                  className="qtyinput"
                  value={qty}
                  onChange={(e) => {
                    const v = parseInt(e.target.value || "1", 10);
                    if (!Number.isNaN(v)) setQty(Math.min(99, Math.max(1, v)));
                  }}
                />
                <button onClick={inc} className="qtybtn" aria-label="Aumentar">
                  +
                </button>
              </div>

              <button onClick={handleBuyNow} className="btn-buy">
                COMPRAR AGORA
              </button>
              <button onClick={handleAddToCart} className="btn-cart">
                ADICIONAR AO CARRINHO
              </button>

              <div className="product-payblock">
                <h4>Meios de pagamentos</h4>
                <div className="pay-select">
                  À vista
                  <span className="pay-icon">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="pix-icon"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.1 231.1 518.1 200.8 488.6L103.3 391.2H112.6C132.6 391.2 151.5 383.4 165.7 369.2L242.4 292.5zM262.5 218.9C256.1 224.4 247.9 224.5 242.4 218.9L165.7 142.2C151.5 127.1 132.6 120.2 112.6 120.2H103.3L200.7 22.76C231.1-7.586 280.3-7.586 310.6 22.76L407.8 119.9H392.6C372.6 119.9 353.7 127.7 339.5 141.9L262.5 218.9zM112.6 142.7C126.4 142.7 139.1 148.3 149.7 158.1L226.4 234.8C233.6 241.1 243 245.6 252.5 245.6C261.9 245.6 271.3 241.1 278.5 234.8L355.5 157.8C365.3 148.1 378.8 142.5 392.6 142.5H430.3L488.6 200.8C518.9 231.1 518.9 280.3 488.6 310.6L430.3 368.9H392.6C378.8 368.9 365.3 363.3 355.5 353.5L278.5 276.5C264.6 262.6 240.3 262.6 226.4 276.6L149.7 353.2C139.1 363 126.4 368.6 112.6 368.6H80.78L22.76 310.6C-7.586 280.3-7.586 231.1 22.76 200.8L80.78 142.7H112.6z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT TABS */}
          <section className="pd-content">
            <div className="pd-tabs">
              <button
                className={tab === "desc" ? "pd-tab active" : "pd-tab"}
                onClick={() => setTab("desc")}
              >
                Descrição
              </button>
              <button
                className={tab === "how" ? "pd-tab active" : "pd-tab"}
                onClick={() => setTab("how")}
              >
                Como resgatar
              </button>
              <button
                className={tab === "terms" ? "pd-tab active" : "pd-tab"}
                onClick={() => setTab("terms")}
              >
                Termos
              </button>
            </div>

            <div className="pd-panel">
              {tab === "desc" && (
                <div className="pd-block">
                  <h2 className="pd-h2">Sobre o produto</h2>
                  <p className="pd-p">
                    Robux para usar na sua conta Roblox. Entrega automática e
                    processo simples para resgate.
                  </p>

                  <div className="pd-grid2">
                    <div className="pd-card">
                      <h3>O que você recebe</h3>
                      <p>Código PIN / instruções de resgate após a compra.</p>
                    </div>
                    <div className="pd-card">
                      <h3>Onde chega</h3>
                      <p>No e-mail ou diretamente na tela de compra.</p>
                    </div>
                  </div>
                </div>
              )}

              {tab === "how" && (
                <div className="pd-block">
                  <h2 className="pd-h2">Como resgatar seus Robux</h2>
                  <ol className="pd-steps">
                    <li>Receba seu produto no e-mail ou na tela de compra;</li>
                    <li>Acesse o site roblox.com e clique em Entrar;</li>
                    <li>Vá em Resgatar e insira o código PIN recebido;</li>
                    <li>Após aparecer o saldo, é só usar e ser feliz!</li>
                  </ol>
                </div>
              )}

              {tab === "terms" && (
                <div className="pd-block">
                  <h2 className="pd-h2">Termos e observações</h2>
                  <ul className="pd-ul">
                    <li>Produto digital: entrega automática após confirmação.</li>
                    <li>Confira seu e-mail e também a caixa de spam.</li>
                    <li>Em caso de dúvida, chame no suporte.</li>
                  </ul>
                </div>
              )}
            </div>
          </section>
        </section>

        <ReviewsSlider />
      </main>

      <Footer />
    </div>
  );
}
