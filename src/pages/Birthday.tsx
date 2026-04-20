import { useEffect, useState } from "react";

const roasts = [
  {
    emoji: "🎂",
    title: "The Cake is Real, Unlike Your Excuses",
    text: "Happy Birthday Nabina! They say age is just a number... but so is your IQ. Good thing you leveled up and left that behind! 🚀",
  },
  {
    emoji: "👑",
    title: "Queen Energy, Always",
    text: "You're aging like fine wine — getting better every year, while you are probably still trying to figure out how to do laundry. Classic. 😂",
  },
  {
    emoji: "🌟",
    title: "Official Glow-Up Certificate",
    text: "This year's theme: Unbothered. Moisturized. Happy. In your lane. Focused. Flourishing. Basically everything your ex is NOT. 💅",
  },
  {
    emoji: "🎯",
    title: "Plot Twist of the Year",
    text: "Spoiler alert: The best thing that happened to you wasn't blowing out candles — it was blowing up that whole situationship. Chef's kiss. 👨‍🍳💋",
  },
  {
    emoji: "🦋",
    title: "Butterfly Era Activated",
    text: "They said you couldn't do better? LOL. Look at you now — thriving, glowing, and eating way better cake than they ever deserved to share with you! 🎂",
  },
  {
    emoji: "🎪",
    title: "No More Clowns Allowed",
    text: "This year you decided to close the circus. No more performing for people who can't even afford a front row seat to your greatness. The show is SOLD OUT. 🎟️",
  },
];

export default function Birthday() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blowCandles = () => {
    setCandlesLit(false);
    setShowMessage(true);
  };

  return (
    <div className="birthday-page">
      <section className="hero-section" style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
        <div className="hero-overlay" />
        <div className="hero-copy">
          <div className="birthday-badge">🎉 April 20, 2026 🎉</div>
          <h1 className="hero-title">
            Happy Birthday
            <br />
            <span>Nabina!</span>
          </h1>
          <p className="hero-subtitle">
            Another year wiser, another year more fabulous ✨
            <span> (and one year further from that questionable chapter of your life 😉)</span>
          </p>
        </div>
      </section>

      <section className="cake-section">
        <div className="section-label">🍰 Your Birthday Cake</div>

        <div className="cake-frame" style={{ transform: `translateY(${scrollY * 0.02}px)` }}>
          <div className="cake">
            <div className="cake-top">
              {new Array(5).fill(null).map((_, index) => (
                <div key={index} className={`candle ${candlesLit ? "lit" : "blown"}`}>
                  <div className="wick" />
                  <div className="flame" />
                </div>
              ))}
            </div>
            <div className="cake-layer top-layer" />
            <div className="cake-layer mid-layer" />
            <div className="cake-layer base-layer" />
          </div>
        </div>

        <button className="blow-button" onClick={blowCandles} disabled={!candlesLit}>
          {candlesLit ? "🌬️ Blow the Candles" : "🎉 Wish Made"}
        </button>

        {showMessage && (
          <div className="wish-message">
            <div className="wish-icon">🥳</div>
            <p>Make a wish! Hope it's something better than your last... 😂</p>
          </div>
        )}
      </section>

      <section className="message-section">
        <div className="message-card">
          <h2>Hey Nabina,</h2>
          <p>
            Today we celebrate YOU — the queen who survived drama, grew through every challenge,
            and somehow still has the energy to look absolutely amazing while doing it. 👸
          </p>
          <p>
            We're not going to talk about the past... except just to say that you clearly upgraded
            your taste in everything this year. Including cake. 🎂
          </p>
        </div>
      </section>

      <section className="roast-section">
        <div className="roast-header">
          <h2>Birthday</h2>
          <p>(All jokes aside — you're genuinely incredible. But also... these are all 100% accurate 😆)</p>
        </div>

        <div className="roast-grid">
          {roasts.map((roast, index) => (
            <article key={index} className="roast-card">
              <div className="roast-emoji">{roast.emoji}</div>
              <h3>{roast.title}</h3>
              <p>{roast.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-section">
        <div className="final-card">
          <div className="final-icon">💖</div>
          <h2>Here's to You!</h2>
          <p>
            May this birthday be the start of the best chapter yet. No more reruns of old stories —
            only new adventures, big laughs, and people who ACTUALLY deserve to be in your story. 📖✨
          </p>
          <p>The world is yours, Nabina. Go claim it! 🌍</p>
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-fireworks">🎆🎇✨🎉🎊🥳🎂🎁🎆</div>
        <h3>Happy Birthday Nabina! 🥳</h3>
        <p>You're one year closer to figuring it all out. (You're basically already there, though. 💯)</p>
        <div className="footer-fireworks">🎂🎉🎊✨🎇🎆🥳🎁🎂</div>
      </footer>
    </div>
  );
}
