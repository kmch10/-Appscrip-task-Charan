"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ChevronIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import styles from "@/components/Footer.module.css";

const brandLinks = [
  { href: "#about", label: "About Us" },
  { href: "#about", label: "Stories" },
  { href: "#about", label: "Artisans" },
  { href: "#about", label: "Boutiques" },
  { href: "#contact", label: "Contact Us" },
  { href: "#about", label: "EU Compliances Docs" },
];

const quickLinks = [
  { href: "#products", label: "Orders & Shipping" },
  { href: "#contact", label: "Join/Login as a Seller" },
  { href: "#products", label: "Payment & Pricing" },
  { href: "#products", label: "Return & Refunds" },
  { href: "#contact", label: "FAQs" },
  { href: "#about", label: "Privacy Policy" },
  { href: "#about", label: "Terms & Conditions" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function FooterColumn({
  id,
  title,
  links,
  plain = false,
}: {
  id?: string;
  title: string;
  links: { href: string; label: string }[];
  plain?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <section
      id={id}
      className={`${styles.column} ${plain ? styles.plain : ""} ${open ? styles.columnOpen : ""}`}
    >
      <h2>
        <button
          type="button"
          aria-expanded={isMobile ? open : true}
          onClick={() => {
            if (window.matchMedia("(max-width: 767px)").matches) {
              setOpen((current) => !current);
            }
          }}
        >
          {title}
          <ChevronIcon className={styles.chevron} />
        </button>
      </h2>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const paymentMethods = [
  { src: "/images/payments/google-pay.svg", label: "Google Pay" },
  { src: "/images/payments/mastercard.svg", label: "Mastercard" },
  { src: "/images/payments/paypal.svg", label: "PayPal" },
  { src: "/images/payments/amex.svg", label: "American Express", frame: "blue" },
  { src: "/images/payments/apple-pay.svg", label: "Apple Pay" },
  { src: "/images/payments/opay.svg", label: "OPay", frame: "fill" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Enter a valid email address.");
      return;
    }
    setStatus("Thanks. You are on the list.");
    setEmail("");
  }

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.news}>
            <h2>Be the first to know</h2>
            <p className={styles.newsDesktop}>Sign up for updates from mettā muse.</p>
            <p className={styles.newsMobile}>
              Lorem ipsum is simply dummy text of the printing and typesetting industry. This is
              simply dummy text.
            </p>
            <form onSubmit={onSubmit}>
              <label className="srOnly" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter your e-mail..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button type="submit">Subscribe</button>
            </form>
            {status ? (
              <p className={styles.status} role="status">
                {status}
              </p>
            ) : null}
          </div>

          <div className={styles.contact} id="contact">
            <h2>
              <span className={styles.contactDesktop}>Contact us</span>
              <span className={styles.contactMobile}>Call us</span>
            </h2>
            <p className={styles.contactLines}>
              <a href="tel:+442211335360">+44 221 133 5360</a>
              <span className={styles.contactDot} aria-hidden="true">
                •
              </span>
              <a href="mailto:customercare@mettamuse.com">customercare@mettamuse.com</a>
            </p>
            <h2 className={styles.currencyHeading}>Currency</h2>
            <p className={styles.currency}>
              <svg width="22" height="15" viewBox="0 0 22 15" aria-hidden="true">
                <rect width="22" height="15" fill="#bf0a30" />
                <rect y="2" width="22" height="1.4" fill="#fff" />
                <rect y="5" width="22" height="1.4" fill="#fff" />
                <rect y="8" width="22" height="1.4" fill="#fff" />
                <rect y="11" width="22" height="1.4" fill="#fff" />
                <rect width="9" height="8" fill="#002868" />
              </svg>
              <span aria-hidden="true">•</span>
              USD
            </p>
            <p className={styles.currencyNote}>
              Transactions will be completed in Euros and a currency reference is available on hover.
            </p>
          </div>
        </div>

        <hr className={styles.rule} />

        <div className={styles.columns}>
          <FooterColumn id="about" title="mettā muse" links={brandLinks} plain />
          <FooterColumn title="Quick links" links={quickLinks} />
          <FollowColumn />
        </div>

        <p className={styles.copy}>Copyright © 2023 mettamuse. All rights reserved.</p>
      </div>
    </footer>
  );
}

function FollowColumn() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <section className={`${styles.follow} ${open ? styles.followOpen : ""}`}>
      <h2>
        <button
          type="button"
          aria-expanded={isMobile ? open : true}
          onClick={() => {
            if (window.matchMedia("(max-width: 767px)").matches) {
              setOpen((current) => !current);
            }
          }}
        >
          Follow us
          <ChevronIcon className={styles.chevron} />
        </button>
      </h2>
      <div className={styles.followBody}>
        <div className={styles.social}>
          <a href="https://www.instagram.com" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href="https://www.linkedin.com" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </div>
      </div>
      <div className={styles.acceptsWrap}>
        <p className={styles.accepts}>
          mettā muse <span>Accepts</span>
        </p>
        <ul className={styles.payments} aria-label="Accepted payment methods">
          {paymentMethods.map((method) => (
            <li
              key={method.label}
              className={
                method.frame === "blue" ? styles.payBlue : method.frame === "fill" ? styles.payFill : undefined
              }
            >
              <img src={method.src} alt={method.label} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
