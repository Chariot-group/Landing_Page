"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isAnnual, setIsAnnual] = useState(false); // État pour basculer entre mensuel et annuel
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture du menu

  const checkout = async (priceId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      alert("Erreur lors du paiement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7edd9] text-[#2c0f05] font-sans">
      {/* Header */}
      <header className="bg-[#f2e1c4] border-b border-[#e0d1ba] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl sm:text-3xl font-extrabold">CHARIOT</div>

          {/* Menu burger */}
          <button
            className="sm:hidden text-2xl focus:outline-none z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Navigation */}
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-full left-0 w-full bg-[#f2e1c4] sm:static sm:flex sm:space-x-8 sm:w-auto sm:bg-transparent z-40`}
          >
            <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 text-center sm:text-left text-lg font-semibold">
              <li>
                <a href="#concept" className="hover:underline">
                  NOTRE CONCEPT
                </a>
              </li>
              <li>
                <a href="#offres" className="hover:underline">
                  NOS OFFRES
                </a>
              </li>
              <li>
                <a href="#apropos" className="hover:underline">
                  A PROPOS
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-20 text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2c0f05] leading-snug mb-6 sm:mb-8">
          Laissez s’épanouir votre créativité, <br />
          prenez en main vos campagnes <br />
          et amusez-vous !
        </h1>
        <a
          href="#offres"
          className="inline-block bg-[#7f2b0d] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded hover:bg-[#661f08] transition"
        >
          Découvrir nos offres
        </a>
      </section>

      {/* Notre Concept */}
      <section id="concept" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2c0f05] uppercase mb-6">
            NOTRE CONCEPT
          </h2>
          <p>
            Vous en avez marre de jongler entre différents outils pour organiser
            vos campagnes ?<br />
            <br />
            Découvrez CHARIOT, votre nouvel outil de gestion unique pour maître
            du jeu. Vivez vos campagnes plus intensément grâce à la
            centralisation des fonctionnalités nécessaires au bon déroulement de
            celles-ci.<br />
            <br />
            Grâce à son interface intuitive, CHARIOT vous permet de gérer les
            personnages, joueurs ou non, d’accéder à leurs stats, d’organiser
            les groupes et les combats d’un simple mouvement, d’optimiser les
            combats avec l’initiative tracker, et de sauvegarder simplement les
            PV des personnages pendant et après un combat.
          </p>
        </div>
      </section>

      {/* Nos Offres */}
      <section id="offres" className="py-16 sm:py-20 px-4 sm:px-6">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#2c0f05] uppercase mb-8 sm:mb-12">
          NOS OFFRES
        </h2>

        {/* Toggle Mensuel/Annuel */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold rounded-l ${
              !isAnnual
                ? "bg-[#7f2b0d] text-white"
                : "bg-[#f2e1c4] text-[#2c0f05]"
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold rounded-r ${
              isAnnual
                ? "bg-[#7f2b0d] text-white"
                : "bg-[#f2e1c4] text-[#2c0f05]"
            }`}
          >
            Annuel
          </button>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 sm:gap-12 justify-center">
          {/* STARTER */}
          <div className="bg-[#f2e1c4] border border-[#dabd9f] rounded-md p-6 sm:p-8 w-full md:w-1/2 text-center flex flex-col shadow-md">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">STARTER</h3>
            <p className="text-lg sm:text-xl font-semibold mb-6">
              {isAnnual ? (
                <>
                  <span className="line-through text-base sm:text-lg">
                    41.88€
                  </span>{" "}
                  <span className="text-xl sm:text-2xl font-bold">
                    34.90€/an
                  </span>
                </>
              ) : (
                <span className="text-xl sm:text-2xl font-bold">
                  3.49€/mois
                </span>
              )}
            </p>
            <ul className="text-left text-base sm:text-lg mb-6">
              <li className="mb-2">✔ 1 campagne</li>
              <li>✔ Tous les outils de gestion disponibles</li>
            </ul>
            <button
              onClick={() =>
                checkout(
                  isAnnual
                    ? "price_1RSwXxQCTCYypKV7YjLvYXoq"
                    : "price_1RSwXxQCTCYypKV7IRTCiuJ7"
                )
              }
              className="mt-auto bg-[#7f2b0d] text-white text-sm sm:text-lg font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-[#661f08] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Chargement..." : "Souscrire à l’offre STARTER"}
            </button>
          </div>

          {/* CONFIRMED */}
          <div className="bg-[#f2e1c4] border border-[#dabd9f] rounded-md p-6 sm:p-8 w-full md:w-1/2 text-center flex flex-col shadow-md">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">CONFIRMED</h3>
            <p className="text-lg sm:text-xl font-semibold mb-6">
              {isAnnual ? (
                <>
                  <span className="line-through text-base sm:text-lg">
                    89.88€
                  </span>{" "}
                  <span className="text-xl sm:text-2xl font-bold">
                    74.90€/an
                  </span>
                </>
              ) : (
                <span className="text-xl sm:text-2xl font-bold">
                  7.49€/mois
                </span>
              )}
            </p>
            <ul className="text-left text-base sm:text-lg mb-6">
              <li className="mb-2">✔ Nombre illimité de campagnes</li>
              <li>✔ Tous les outils de gestion disponibles</li>
            </ul>
            <button
              onClick={() =>
                checkout(
                  isAnnual
                    ? "price_1RSwXxQCTCYypKV7ConfirmedAnnual"
                    : "price_1RSwXxQCTCYypKV7ConfirmedMonthly"
                )
              }
              className="mt-auto bg-[#7f2b0d] text-white text-sm sm:text-lg font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-[#661f08] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Chargement..." : "Souscrire à l’offre CONFIRMED"}
            </button>
          </div>
        </div>
      </section>

      {/* Histoire de CHARIOT */}
      <section id="histoire" className="py-20 px-6 bg-[#f7edd9]">
        <div className="max-w-4xl mx-auto text-xl leading-relaxed">
          <h2 className="text-3xl font-bold text-[#2c0f05] uppercase mb-6 text-center">
            L'HISTOIRE DE CHARIOT
          </h2>
          <p>
            CHARIOT est né de la passion de ses créateurs pour les jeux de rôle
            et leur désir de simplifier la vie des maîtres du jeu. Tout a
            commencé autour d'une table, où l'organisation des campagnes et la
            gestion des personnages devenaient de plus en plus complexes. Nous
            avons alors imaginé un outil capable de centraliser toutes ces
            tâches, tout en restant intuitif et agréable à utiliser.<br />
            <br />
            Après des mois de développement, de tests et de retours de la
            communauté, CHARIOT est devenu bien plus qu'un simple outil : c'est
            une plateforme pensée pour libérer la créativité des maîtres du jeu
            et offrir une expérience immersive à leurs joueurs.<br />
            <br />
            Aujourd'hui, CHARIOT continue d'évoluer grâce à une communauté
            passionnée et engagée. Rejoignez-nous dans cette aventure et
            découvrez comment CHARIOT peut transformer vos campagnes en
            expériences inoubliables.
          </p>
        </div>
      </section>

      {/* À Propos */}
      <section id="apropos" className="py-20 px-6">
        <h2 className="text-center text-3xl font-bold text-[#2c0f05] uppercase mb-12">
          À PROPOS DE NOUS
        </h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center md:items-start gap-12 text-lg text-center">
          {[
            { name: "Elvis", roles: ["Product Owner", "Développeur"] },
            { name: "Hugo", roles: ["Tech Lead", "Développeur"] },
            { name: "Jovis", roles: ["Lead Marketing", "Développeur"] },
          ].map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <div className="w-40 h-40 bg-[#b5841b] rounded-full mb-4"></div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              {member.roles.map((role, i) => (
                <p key={i}>{role}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f7edd9] border-t border-[#e0d1ba] py-8 sm:py-10 text-sm sm:text-base text-[#4a3b2d]">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center">
          {/* Section des réseaux sociaux */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <p className="font-semibold">Rejoignez-nous sur les réseaux sociaux :</p>
            <div className="mt-2 flex justify-center md:justify-start space-x-4">
              <a
                href="#"
                className="hover:underline hover:text-[#8b4513] transition"
                aria-label="Reddit"
              >
                Reddit
              </a>
              <a
                href="#"
                className="hover:underline hover:text-[#8b4513] transition"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <a
                href="#"
                className="hover:underline hover:text-[#8b4513] transition"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Logo ou nom de la marque */}
          <div className="font-extrabold text-lg sm:text-xl text-center mb-6 md:mb-0">
            CHARIOT
          </div>

          {/* Liens légaux */}
          <div className="text-center md:text-right">
            <p className="font-semibold">Liens légaux :</p>
            <div className="mt-2 space-x-4">
              <a
                href="#"
                className="hover:underline hover:text-[#8b4513] transition"
              >
                CGU
              </a>
              <a
                href="#"
                className="hover:underline hover:text-[#8b4513] transition"
              >
                CGV
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
