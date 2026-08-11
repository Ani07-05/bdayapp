/* eslint-disable @next/next/no-img-element */
import "./rajatha.css";
import ScrollReveal from "./ScrollReveal";
import SoundToggle from "./SoundToggle";
import JourneyRail from "./JourneyRail";
import Oneko from "./Oneko";

export default function RajathaPage() {
  return (
    <main className="rj-page">
      <SoundToggle />
      <JourneyRail />
      <Oneko />

      {/* 01 — Hero */}
      <section className="rj-frame rj-frame--hero">
        <div className="rj-frame-inner">
          <div className="rj-frame-text">
            <ScrollReveal index={0}>
              <h1 className="rj-heading">Happiest 21st,<br />Rajatha.</h1>
              <p className="rj-body">
                This one&rsquo;s for you. Lights out, and away we go.
              </p>
            </ScrollReveal>
          </div>
          <div className="rj-frame-shape">
            <div className="rj-panel">
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className="rj-hero-dot"
                  style={{
                    top: `${12 + ((i * 37) % 76)}%`,
                    left: `${8 + ((i * 53) % 84)}%`,
                    animationDelay: `${i * 0.28}s`,
                  }}
                />
              ))}
              <img src="/rajatha.jpg" alt="Rajatha" className="rj-hero-photo" />
              <div className="rj-champagne" aria-hidden="true">
                <svg viewBox="0 0 40 70" fill="none">
                  <path className="rj-glass-fill" d="M11 8 H29 L21.5 30 H18.5 Z" />
                  <path className="rj-glass-outline" d="M8 4 H32 L22 34 V54 H28 V60 H12 V54 H18 V34 Z" />
                  {Array.from({ length: 5 }).map((_, i) => (
                    <circle
                      key={i}
                      className="rj-bubble"
                      cx={16 + (i % 3) * 4}
                      cy={26 - i * 3}
                      r={i % 2 ? 1 : 1.6}
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Speed / F1 */}
      <section className="rj-frame rj-frame--f1">
        <div className="rj-frame-inner rj-flip">
          <div className="rj-frame-text">
            <ScrollReveal index={0}>
              <h2 className="rj-heading">Lights out,<br />full send.</h2>
              <p className="rj-body">
                To my <strong>bestest friend</strong> you make tough days lighter and good days brighter.
                Here&rsquo;s to more hackathons, more wins, and new tracks, new checkered flags, and
                more <strong>finish lines</strong> to chase together, pit-stop laughs included.
              </p>
            </ScrollReveal>
          </div>
          <div className="rj-frame-shape">
            <div className="rj-panel rj-panel--f1">
              <svg className="rj-track-svg" viewBox="0 0 200 120" fill="none" preserveAspectRatio="none">
                <line className="rj-speedline" x1="0" y1="42" x2="40" y2="42" />
                <line className="rj-speedline" x1="0" y1="58" x2="46" y2="58" style={{ animationDelay: "0.15s" }} />
                <line className="rj-speedline" x1="0" y1="74" x2="34" y2="74" style={{ animationDelay: "0.3s" }} />
                <path className="rj-car-track" d="M0 100 H200" />
              </svg>
              <img src="/rajatha-f1-car.svg" alt="Formula One car" className="rj-car-img" />
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Machine Learning / Pinterest */}
      <section className="rj-frame rj-frame--ml">
        <div className="rj-frame-inner">
          <div className="rj-frame-text">
            <ScrollReveal index={0}>
              <h2 className="rj-heading">A door at<br />Pinterest.</h2>
              <p className="rj-body">
                May a door at <strong>Pinterest</strong> open wide in the form of a Machine Learning Engineer role,
                turning data into meaning, and meaning into something beautiful.
              </p>
            </ScrollReveal>
          </div>
          <div className="rj-frame-shape">
            <div className="rj-panel">
              <svg viewBox="0 0 200 140" fill="none">
                <line className="rj-edge" x1="40" y1="30" x2="100" y2="70" />
                <line className="rj-edge" x1="40" y1="70" x2="100" y2="70" style={{ animationDelay: "0.3s" }} />
                <line className="rj-edge" x1="40" y1="110" x2="100" y2="70" style={{ animationDelay: "0.6s" }} />
                <line className="rj-edge" x1="100" y1="70" x2="160" y2="40" style={{ animationDelay: "0.15s" }} />
                <line className="rj-edge" x1="100" y1="70" x2="160" y2="100" style={{ animationDelay: "0.45s" }} />
                <circle className="rj-packet" r="2.8" style={{ offsetPath: "path('M40,30 L100,70')", animationDelay: "0s" }} />
                <circle className="rj-packet" r="2.8" style={{ offsetPath: "path('M40,70 L100,70')", animationDelay: "0.3s" }} />
                <circle className="rj-packet" r="2.8" style={{ offsetPath: "path('M40,110 L100,70')", animationDelay: "0.6s" }} />
                <circle className="rj-packet" r="2.8" style={{ offsetPath: "path('M100,70 L160,40')", animationDelay: "0.15s" }} />
                <circle className="rj-packet" r="2.8" style={{ offsetPath: "path('M100,70 L160,100')", animationDelay: "0.45s" }} />
                <circle className="rj-node" cx="40" cy="30" r="7" />
                <circle className="rj-node" cx="40" cy="70" r="7" style={{ animationDelay: "0.2s" }} />
                <circle className="rj-node" cx="40" cy="110" r="7" style={{ animationDelay: "0.4s" }} />
                <circle className="rj-node rj-node--hub" cx="100" cy="70" r="9" style={{ animationDelay: "0.1s" }} />
                <circle className="rj-node" cx="160" cy="40" r="7" style={{ animationDelay: "0.3s" }} />
                <circle className="rj-node" cx="160" cy="100" r="7" style={{ animationDelay: "0.5s" }} />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Mind / philosophy */}
      <section className="rj-frame rj-frame--mind">
        <div className="rj-frame-inner rj-flip">
          <div className="rj-frame-text">
            <ScrollReveal index={0}>
              <h2 className="rj-heading">Rajatva.</h2>
              <p className="rj-body">
                Your name means silver, <strong>rajatva</strong>. Not loud about it, just quietly brilliant,
                steady, and real, the exact same way you are with everyone lucky enough to know you.
              </p>
            </ScrollReveal>
          </div>
          <div className="rj-frame-shape">
            <div className="rj-panel">
              <svg viewBox="0 0 160 160" fill="none">
                <circle className="rj-orbit" cx="80" cy="80" r="55" />
                <circle className="rj-orbit rj-orbit--rev" cx="80" cy="80" r="34" />
                <circle cx="80" cy="80" r="4" fill="#1c1a17" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Style / travel */}
      <section className="rj-frame rj-frame--style">
        <div className="rj-frame-inner">
          <div className="rj-frame-text">
            <ScrollReveal index={0}>
              <h2 className="rj-heading">Japan,<br />soon.</h2>
              <p className="rj-body">
                One day soon we&rsquo;ll <u>wander Japan&rsquo;s quiet countryside</u>,
                shrine bells, aesthetic cafés, wind in our faces, pockets broke, hearts full of horizons.
              </p>
            </ScrollReveal>
          </div>
          <div className="rj-frame-shape">
            <div className="rj-panel rj-panel--japan">
              <img src="/japan-map.svg" alt="Map of Japan" className="rj-japan-map" />
            </div>
          </div>
        </div>
      </section>

      {/* 06 — Greeting */}
      <section className="rj-frame rj-frame--greet">
        <div className="rj-frame-inner">
          <ScrollReveal index={0}>
            <p className="rj-greet-text">
              <strong>जन्मदिनस्य हार्दिक शुभाशयाः, <u>रजता</u>।</strong><br />
              <strong>ಜನ್ಮದಿನದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು, <u>ರಜತಾ</u>!</strong>
            </p>
            <div className="rj-greet-rule"></div>
          </ScrollReveal>
        </div>
      </section>

      {/* 07 — Outro */}
      <section className="rj-frame rj-frame--outro">
        <div className="rj-frame-inner">
          <ScrollReveal index={0}>
            <p className="rj-outro-sign">With all my gratitude and love, Aniruddha</p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
