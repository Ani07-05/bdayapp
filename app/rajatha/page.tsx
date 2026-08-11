/* eslint-disable @next/next/no-img-element */
import "./rajatha.css";
import ScrollReveal from "./ScrollReveal";
import SoundToggle from "./SoundToggle";
import JourneyRail from "./JourneyRail";
import Oneko from "./Oneko";
import Frame from "./Frame";
import StitchIcon from "./StitchIcon";

/* A small transformer stack: three encoder blocks, an attention-head row of
   dots inside the top block, and flow arrows carrying signal upward — reads
   as "transformer architecture" rather than a generic node graph, and gives
   the stitch renderer meatier silhouettes to trace. */
const ML_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200">
  <rect x="20" y="14" width="120" height="38" rx="9" fill="#000" />
  <rect x="20" y="81" width="120" height="38" rx="9" fill="#000" />
  <rect x="20" y="148" width="120" height="38" rx="9" fill="#000" />
  <circle cx="42" cy="33" r="5" fill="#fff" />
  <circle cx="62" cy="33" r="5" fill="#fff" />
  <circle cx="82" cy="33" r="5" fill="#fff" />
  <circle cx="102" cy="33" r="5" fill="#fff" />
  <circle cx="122" cy="33" r="5" fill="#fff" />
  <circle cx="52" cy="100" r="5" fill="#fff" />
  <circle cx="80" cy="100" r="5" fill="#fff" />
  <circle cx="108" cy="100" r="5" fill="#fff" />
  <circle cx="80" cy="167" r="6" fill="#fff" />
  <path d="M80 81 L80 60 M72 68 L80 60 L88 68" stroke="#000" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M80 148 L80 127 M72 135 L80 127 L88 135" stroke="#000" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

export default function RajathaPage() {
  return (
    <main className="rj-page">
      <SoundToggle />
      <JourneyRail />
      <Oneko />

      {/* 01 — Hero */}
      <Frame className="rj-frame--hero">
        <div className="rj-frame-inner">
          <div className="rj-frame-text">
            <ScrollReveal index={0}>
              <h1 className="rj-heading">Happiest 21st,<br />Rajatha.</h1>
            </ScrollReveal>
          </div>
          <div className="rj-frame-shape">
            <div className="rj-panel rj-panel--hero">
              <div className="rj-confetti" aria-hidden="true">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span
                    key={i}
                    className="rj-confetti-piece"
                    style={{
                      left: `${2 + ((i * 37) % 97)}%`,
                      animationDelay: `${i * 0.22}s`,
                      animationDuration: `${4.2 + (i % 5) * 0.4}s`,
                      transform: `rotate(${(i * 53) % 360}deg)`,
                    }}
                  />
                ))}
              </div>
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
      </Frame>

      {/* 02 — Speed / F1 */}
      <Frame className="rj-frame--f1">
        <div className="rj-frame-inner rj-flip">
          <div className="rj-frame-text">
            <ScrollReveal index={0}>
              <h2 className="rj-heading">The OG<br />HG.</h2>
              <p className="rj-body rj-body--big">
                Thank you for turning days that were <span className="rj-num">2</span>x harder into{" "}
                <span className="rj-num">1</span> happy hour with your words.
              </p>
            </ScrollReveal>
          </div>
          <div className="rj-frame-shape">
            <div className="rj-panel rj-panel--bare rj-panel--f1">
              <StitchIcon svgSrc="/matterhorn.svg" threadColor="#c94a3a" cols={60} seed={2} />
            </div>
          </div>
        </div>
      </Frame>

      {/* 03 — Machine Learning / career */}
      <Frame className="rj-frame--ml">
        <div className="rj-frame-inner">
          <div className="rj-frame-text">
            <ScrollReveal index={0}>
              <h2 className="rj-heading">No. 1,<br />no contest.</h2>
              <p className="rj-body rj-body--big">
                I&rsquo;m sure you&rsquo;ll perform better than <span className="rj-num">2</span>x the average
                engineer and stay at that No. <span className="rj-num">1</span> spot wherever you are.
              </p>
            </ScrollReveal>
          </div>
          <div className="rj-frame-shape">
            <div className="rj-panel rj-panel--bare">
              <StitchIcon svgMarkup={ML_ICON_SVG} threadColor="#1c1a17" cols={46} seed={3} />
            </div>
          </div>
        </div>
      </Frame>

      {/* 04 — Style / travel */}
      <Frame className="rj-frame--style">
        <div className="rj-frame-inner">
          <div className="rj-frame-text">
            <ScrollReveal index={0}>
              <h2 className="rj-heading">Japan,<br />soon.</h2>
              <p className="rj-body rj-body--big">
                Along with your restless professional life, don&rsquo;t forget that Japan trip, and remember
                to have <span className="rj-num">2</span>x the fun, because we live this life only{" "}
                <span className="rj-num">1</span>x (once).
              </p>
            </ScrollReveal>
          </div>
          <div className="rj-frame-shape">
            <div className="rj-panel rj-panel--bare rj-panel--japan">
              <StitchIcon svgSrc="/japan-map.svg" threadColor="#1c1a17" cols={60} seed={5} />
            </div>
          </div>
        </div>
      </Frame>

      {/* 06 — Greeting */}
      <Frame className="rj-frame--greet">
        <div className="rj-frame-inner">
          <ScrollReveal index={0}>
            <p className="rj-greet-text">
              <strong>जन्मदिनस्य हार्दिक शुभाशयाः, <u>रजता</u>।</strong><br />
              <strong>ಜನ್ಮದಿನದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು, <u>ರಜತಾ</u>!</strong>
            </p>
            <div className="rj-greet-rule"></div>
            <p className="rj-greet-note">
              Thank you again for this friendship that I will always cherish, no matter what. Have an amazing
              day and an amazing year.
            </p>
          </ScrollReveal>
        </div>
      </Frame>

      {/* 07 — Outro */}
      <Frame className="rj-frame--outro">
        <div className="rj-frame-inner">
          <ScrollReveal index={0}>
            <p className="rj-outro-sign">With the deepest of gratitude and veneration, Aniruddha</p>
          </ScrollReveal>
        </div>
      </Frame>
    </main>
  );
}
