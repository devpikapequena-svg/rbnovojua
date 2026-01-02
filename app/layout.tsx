import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import TrustModal from "@/components/TrustModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rbx Form - Sua Loja de Produtos Digitais | Entrega Automática 24h",
  description:
    "Compre na Rbx Form: loja online especializada em produtos digitais. Gift cards, moedas virtuais, códigos de jogos e mais. Entrega automática 24h e segura.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* ================================
            Utmify Pixel (Google)
        ================================= */}
        <Script id="utmify-pixel" strategy="afterInteractive">
          {`
            window.googlePixelId = "68ffbcb05c70a2f71e7cc3ad";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute(
              "src",
              "https://cdn.utmify.com.br/scripts/pixel/pixel-google.js"
            );
            document.head.appendChild(a);
          `}
        </Script>

        {/* ================================
            Utmify UTMs
        ================================= */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          strategy="afterInteractive"
        />

{/* ================================
    TikTok Pixel (SDK ONLY)
================================= */}
<Script id="tiktok-pixel" strategy="afterInteractive">
  {`
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t;
      var ttq = w[t] = w[t] || [];
      ttq.methods = [
        "page","track","identify","instances","debug","on","off","once",
        "ready","alias","group","enableCookie","disableCookie",
        "holdConsent","revokeConsent","grantConsent"
      ];
      ttq.setAndDefer = function(t, e) {
        t[e] = function() {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        }
      };
      for (var i = 0; i < ttq.methods.length; i++) {
        ttq.setAndDefer(ttq, ttq.methods[i]);
      }
      ttq.instance = function(t) {
        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) {
          ttq.setAndDefer(e, ttq.methods[n]);
        }
        return e;
      };
      ttq.load = function(e, n) {
        var r = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {};
        ttq._i[e] = [];
        ttq._i[e]._u = r;
        ttq._t = ttq._t || {};
        ttq._t[e] = +new Date;
        ttq._o = ttq._o || {};
        ttq._o[e] = n || {};
        n = document.createElement("script");
        n.type = "text/javascript";
        n.async = true;
        n.src = r + "?sdkid=" + e + "&lib=" + t;
        e = document.getElementsByTagName("script")[0];
        e.parentNode.insertBefore(n, e);
      };

      ttq.load('D5BVA93C77U843EEFKVG');

      // ❌ NÃO CHAMAR ttq.page() AQUI
    }(window, document, 'ttq');
  `}
</Script>

      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          {/* Modal abre ao entrar e só libera após clique */}
          <TrustModal />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
