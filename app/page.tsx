"use client";
import Image from "next/image";
import FAQ from "@/components/FAQ";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";
import Beneficios from "@/components/Beneficios"; 
import Link from "next/link"; 
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const produtos = [
    { id: 1, nome: "1200 ROBUX", preco: "R$ 19,90", img: "/1200a.png", avaliacoes: 108, rating: 4 },
    { id: 2, nome: "1700 ROBUX", preco: "R$ 22.99", precoAntigo: "R$ 29.99", desconto: "-15%", img: "/1700a.png", avaliacoes: 132, rating: 5 },
    { id: 3, nome: "2100 ROBUX", preco: "R$ 29,90", img: "/2100.png", avaliacoes: 54, rating: 4 },
    { id: 4, nome: "3600 ROBUX", preco: "R$ 47,90", precoAntigo: "R$ 53,90", desconto: "-4%", img: "/3600.png", avaliacoes: 201, rating: 4 },
    { id: 5, nome: "7000 ROBUX", preco: "R$ 79.99", precoAntigo: "R$ 159.99", desconto: "-50%", img: "/7000.png", avaliacoes: 177, rating: 5 },
    { id: 6, nome: "10000 ROBUX", preco: "R$ 92.99", precoAntigo: "R$ 112.00", desconto: "-17%", img: "/10000.png", avaliacoes: 177, rating: 4 },
  ];

  const gerarSlug = (nome: string) =>
    nome.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-");

  // 🔹 controle do carrossel
  const [paginaAtiva, setPaginaAtiva] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalPaginas = Math.ceil(produtos.length / 2);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onScroll = () => {
      const largura = el.offsetWidth;
      const pagina = Math.round(el.scrollLeft / largura);
      setPaginaAtiva(pagina);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

    // 🔹 Função que renderiza as estrelas
  const renderStars = (rating: number) => {
    const full = "★".repeat(rating);
    const empty = "☆".repeat(5 - rating);
    return full + empty;
  };


  return (
    <div>
      <Header />
{/* BANNER */}
<section className="banner-hero">
  {/* background */}
  <Image
    src="/logo.png"
    alt="banner"
    fill
    priority
    className="banner-bg"
  />

  {/* overlay escuro geral */}
  <div className="banner-overlay" />

  {/* fade no final */}
  <div className="banner-fade-bottom" />

  {/* conteúdo por cima */}
  <div className="banner-content">
    <span className="banner-pill">MELHOR PREÇO DO BRASIL</span>

    <h1 className="banner-title">
      CANSADO DE PAGAR <br />
      <span>CARO EM ROBUX?</span>
    </h1>

    <p className="banner-sub">
      Aqui temos os melhores preços com entrega imediata e segurança total!
      Junte-se a milhares de clientes satisfeitos.
    </p>

    <Link href="#produtos" className="banner-btn">
      COMPRAR AGORA
    </Link>
  </div>
</section>


      <Beneficios />

      {/* MAIS VENDIDOS */}
      <section className="produtos">
        <h2>MAIS VENDIDOS</h2>
        <div className="grid carousel" ref={carouselRef}>
          {produtos.map((p) => (
            <Link
              key={p.id}
              href={`/product/${gerarSlug(p.nome)}`}
              className="card"
            >
              <div className="card-img">
                <Image src={p.img} alt={p.nome} fill />
                {p.desconto && <span className="badge">{p.desconto}</span>}
                <div className="reflection"></div>
              </div>

              <div className="card-info">
                <h3>
                  {p.nome}
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="verify-icon"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                  </svg>
                </h3>

   <p className="stars">
                  <span className="stars-icons">{renderStars(p.rating)}</span>
                  <span className="stars-count">({p.avaliacoes} avaliações)</span>
                </p>


{/* detalhes */}
<div className="card-details">
  <ul className="card-details-title">
    <li>Confira os detalhes abaixo!</li>
  </ul>

  <p className="card-details-text">
    Receba seu produto por email e acesse ele. Responda as perguntas como seu
    nick, link da gamepass e etc...
  </p>
</div>

                <div className="price">
                  <span className={p.id === 1 || p.id === 3 ? "new white-price" : "new"}>
                    {p.preco}
                  </span>
                  {p.precoAntigo && <s>{p.precoAntigo}</s>}
                </div>
                
{/* botão */}
<button
  className="card-buy"
  onClick={(e) => {
    e.preventDefault(); // não deixa o Link navegar
    e.stopPropagation();
    // aqui você pode abrir modal, ou redirecionar:
    window.location.href = `/product/${gerarSlug(p.nome)}`;
  }}
>
  COMPRAR
</button>

              </div>
            </Link>
          ))}
        </div>

        {/* 🔹 bolinhas do carrossel */}
        <div className="carousel-dots">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <span key={i} className={i === paginaAtiva ? "active" : ""}></span>
          ))}
        </div>
      </section>

      {/* FAQ e Benefícios */}
      <FAQ />


      <Footer />
    </div>
  );
}
