import Image from 'next/image';

export default function RajathaPage() {
  return (
    <main className="bday-side-layout no-scroll">
      <div className="confetti-blast" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={`confetti-piece confetti-piece-${i % 8}`}></span>
        ))}
      </div>

      <figure className="bday-photo-figure">
        <div className="bday-photo-confetti">
          <Image
            src="/rajatha.jpg"
            alt="Rajatha"
            className="bday-photo-rect"
            width={600}
            height={800}
            priority
          />
        </div>
        <figcaption className="bday-photo-legend">
          defcon qualifiers reaction to our skill in cybersec <strong></strong>
        </figcaption>
      </figure>

      <section className="bday-message-section">
        <h1 className="bday-heading">
          <strong><u>Happiest Birthday, Rajatha!</u></strong>
        </h1>

        {/* Multilingual wishes (long taa) */}
        <div className="bday-message-body small-message">
          <p>
            <strong>जन्मदिनस्य हार्दिक शुभाशयाः, <u>रजता</u>।</strong><br />
            <strong>ಜನ್ಮದಿನದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು, <u>ರಜತಾ</u>!</strong><br />
            <strong>ಜನ್ಮದಿನ ಶುಭಾಶಯಂಗಳ್, <u>ರಜತಾ</u>!</strong>
          </p>
        </div>

        {/* Short, fully readable poem (fits desktop) */}
        <div className="bday-message-body">
          <p>
            To my <strong>bestest friend</strong> you make tough days lighter and good days brighter.
            Here&rsquo;s to more hackathons, more wins, and more laughs we&rsquo;ll remember for years.
          </p>
          <p>
            One day soon we&rsquo;ll <u>wander Japan&rsquo;s quiet countryside and Europe&rsquo;s busy streets </u>, shrine bells, aesthatic cafes
            with the wind in our faces,
              pockets (broke) but hearts full of horizons.
          </p>
          <p>
            May a door at <strong><u>Pinterest</u></strong> open wide in the form of a <strong>Machine Learning Engineer</strong>,
            turning data into meaning, and meaning into something beautiful.
          </p>
          <p>
            In the words of Vedānta you sometimes portray yourself like the <strong>shupti Rajatha (mistakening of a shell as silver)</strong> a gentle illusion
            born of <em>bhrānti</em> (creating the illusion that you don&rsquo;t know because you stay humble);
            yet in <strong>yathārtha jñāna</strong> (true understanding) you are always THE
            <strong> Rajatha</strong>, <strong>real shine ft academic and intellectual brilliance </strong> yet steady, and inspiring.
          </p>
          <p style={{ marginTop: '0.5rem', color: '#ffe082' }}>
            &mdash; with all my gratitude and love, <strong>Aniruddha</strong>
          </p>
        </div>
      </section>
    </main>
  );
}
