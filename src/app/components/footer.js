
"use client";

import { useState } from "react";

export default function Footer() {
  const [flyingSocial, setFlyingSocial] = useState(null);
  const [footerEmail, setFooterEmail] = useState("");

  const socials = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/ietebits",
      color: "#1877F2",
      icon: (
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.3V13h2.8v8z" />
      ),
    },
    {
      name: "X",
      href: "https://x.com/IETE_BITS",
      color: "#E5E7EB",
      icon: (
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.3L5.7 22H2.5l7.3-8.4L2 2h6.5l4.4 6.7zM17.8 20h1.7L7.4 3.9H5.6z" />
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/ietebits/",
      color: "#E879F9",
      icon: (
        <>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="17.6" cy="6.7" r="1.2" />
        </>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/search/results/all/?keywords=IETE%20Students%27%20Forum%20BIT%20Sindri&origin=RICH_QUERY_SUGGESTION&heroEntityKey=urn%3Ali%3Aorganization%3A42721036&position=0",
      color: "#0A66C2",
      icon: (
        <>
          <path d="M5 8.5H2V22h3zM3.5 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6M22 13.8c0-4.1-2.2-6-5.1-6a4.4 4.4 0 0 0-4 2.2V8.5H10V22h3v-7.1c0-1.9.4-3.7 2.7-3.7s2.3 2.1 2.3 3.8V22h3z" />
        </>
      ),
    },
  ];

  return (
    <footer className="iete-footer">
      <div className="iete-footer-glow" />

      <div className="relative z-10 mx-auto max-w-[1450px] px-6 sm:px-10 lg:px-12">
        {/* Brand and social links */}
        <div className="iete-footer-top">
          <a
            href="#home"
            className="iete-footer-brand"
            aria-label="IETE-SF Home"
          >
            <img src="/logo.svg" alt="IETE-SF logo" />
            <span>
              IETE<span className="iete-brand-dot" />
            </span>
          </a>

          <div className="iete-socials">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={`Visit IETE-SF on ${social.name}`}
                className={`iete-social-link ${
                  flyingSocial === social.name ? "iete-social-fly" : ""
                }`}
                style={{ "--social-color": social.color }}
                onClick={(event) => {
                  event.preventDefault();

                  if (
                    window.matchMedia("(prefers-reduced-motion: reduce)")
                      .matches
                  ) {
                    window.location.href = social.href;
                    return;
                  }

                  setFlyingSocial(social.name);

                  window.setTimeout(() => {
                    window.location.href = social.href;
                  }, 650);
                }}
              >
                <span className="iete-social-trail" />
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {social.icon}
                </svg>
              </a>
            ))}

            <a
              href="https://iete-induction-26.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="iete-join-footer"
            >
              Join Us <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Footer information */}
        <div className="iete-footer-grid">
          <div className="iete-footer-column">
            <h3>IETE</h3>
            <nav
              className="iete-footer-links"
              aria-label="Footer navigation"
            >
              <a href="#home">Home</a>
              <a href="#contact">Contact us</a>
              <a href="#about">About us</a>
              <a href="#events">Events</a>
            </nav>
          </div>

          <div className="iete-footer-column">
            <h3>FIND US</h3>
            <address>
              BIT Sindri
              <br />
              Dhanbad, Jharkhand
              <br />
              India
            </address>
          </div>

          <div className="iete-footer-column">
            <h3>CONTACT US</h3>
            <div className="iete-footer-links">
              <a href="mailto:ietebits@gmail.com">ietebits@gmail.com</a>
              <a href="tel:+919890474518">+91-9890474518</a>
              <a href="tel:+919546003148">+91-9546003148</a>
            </div>
          </div>

          <div className="iete-footer-column">
            <h3>GET IN TOUCH</h3>
            <p className="iete-footer-note">
              Have something to share? Send us a message.
            </p>

            <form
              className="iete-mail-form"
              onSubmit={(event) => {
                event.preventDefault();

                const subject = encodeURIComponent("Hello IETE-SF");
                const body = encodeURIComponent(
                  `My email address: ${footerEmail}\n\n`
                );

                window.location.href =
                  `mailto:ietebits@gmail.com?subject=${subject}&body=${body}`;
              }}
            >
              <label className="sr-only" htmlFor="iete-footer-email">
                Your email address
              </label>

              <input
                id="iete-footer-email"
                type="email"
                value={footerEmail}
                onChange={(event) => setFooterEmail(event.target.value)}
                required
                placeholder="Enter your email"
                autoComplete="email"
              />

              <button type="submit">
                Send <span aria-hidden="true">↗</span>
              </button>
            </form>

            <p className="iete-footer-note iete-mail-hint">
              Opens your default email application.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="iete-footer-bottom">
          <p>Copyright © 2026 IETE-SF. All rights reserved.</p>
          <p>Designed &amp; Developed by: Team IETE</p>
        </div>
      </div>
    </footer>
  );
}
