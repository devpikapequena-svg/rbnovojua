"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./sucess.css";

export default function SucessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order") || "";
  const produto = searchParams.get("produto") || "Robux";
  const valor = searchParams.get("valor") || "";

  const whatsappNumber = "5562999999999";

  const defaultMessage = useMemo(() => {
    const parts = [
      "Olá! Acabei de fazer uma compra na loja e gostaria de enviar o comprovante de pagamento para agilizar o envio do meu pedido.",
      orderId ? `Pedido: #${orderId}` : "",
      produto ? `Produto: ${produto}` : "",
      valor ? `Valor: R$ ${valor}` : "",
    ].filter(Boolean);

    return parts.join("\n");
  }, [orderId, produto, valor]);

  const handleSendWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      defaultMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="sucess-root">
      <Script id="google-purchase-conversion" strategy="afterInteractive">
        {`
          if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
              'send_to': 'AW-',
              'value': 1.0,
              'currency': 'BRL',
              'transaction_id': '${orderId || ""}'
            });
          }
        `}
      </Script>

      <Header />
      <div className="header-spacer" />

      <main className="sucess-container">
        <div className="sucess-header">
          <span className="sucess-pill">
            <span className="sucess-pill-dot" />
            {orderId ? `Pedido #${orderId}` : "Pedido confirmado"}
          </span>

          <h1 className="sucess-title">Pagamento aprovado!</h1>

          <p className="sucess-subtitle">
            Seu pagamento foi confirmado com sucesso. Agora é só aguardar a
            entrega. Se não chegar no e-mail, envie o comprovante no WhatsApp
            para liberação imediata.
          </p>
        </div>

        <div className="sucess-card">
          <div className="sucess-card-top">
            <div>
              <p className="sucess-card-label">Status do pagamento</p>
              <p className="sucess-status">
                <span className="sucess-status-dot" />
                Pago
              </p>
            </div>

            <div className="sucess-badge">{produto}</div>
          </div>

          <div className="sucess-divider" />

          <div className="sucess-info-grid">
            <div>
              <p className="sucess-info-label">Produto</p>
              <p className="sucess-info-value">{produto}</p>
            </div>

            <div>
              <p className="sucess-info-label">Entrega</p>
              <p className="sucess-info-value">
                Enviamos no e-mail após confirmação. Caso não encontre, verifique
                spam/lixeira e depois fale no WhatsApp para liberação imediata.
              </p>
            </div>

            {valor ? (
              <div>
                <p className="sucess-info-label">Valor</p>
                <p className="sucess-info-value sucess-value">R$ {valor}</p>
              </div>
            ) : null}
          </div>

          <button className="sucess-whats-btn" onClick={handleSendWhatsApp}>
            <span className="sucess-whats-btn-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3C9.373 3 4 8.149 4 14.5c0 2.405.817 4.638 2.22 6.45L5 29l8.335-1.997A12.66 12.66 0 0 0 16 26c6.627 0 12-5.149 12-11.5S22.627 3 16 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.9"
                />
                <path
                  d="M12.2 11.2c.3-.7.6-.7.9-.7h.8c.2 0 .5.1.6.4l1.1 2.5c.1.3.1.6-.1.8l-.6.6c-.2.2-.2.4-.1.6.6 1.2 1.6 2.2 2.8 2.8.2.1.4.1.6-.1l.6-.6c.2-.2.5-.2.8-.1l2.5 1.1c.3.1.4.4.4.6v.8c0 .3 0 .6-.7.9-.7.3-2.3.7-4.7-.3-2.4-1-4.2-2.8-5.2-5.2-1-2.4-.6-4 .1-4.7Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Enviar comprovante no WhatsApp
          </button>
        </div>

        <div className="sucess-actions">
          <button className="sucess-btn" onClick={() => router.push("/")}>
            Voltar para a loja
          </button>

          <button
            className="sucess-btn secundary"
            onClick={() => router.push("/")}
            type="button"
          >
            Ver mais produtos
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
