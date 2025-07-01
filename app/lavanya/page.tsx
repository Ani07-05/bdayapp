export default function LavanyaPage() {
  return (
    <main className="bday-side-layout no-scroll">
      <div className="confetti-blast">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={`confetti-piece confetti-piece-${i % 8}`}></span>
        ))}
      </div>
      <figure className="bday-photo-figure">
        <div className="bday-photo-confetti">
          <img src="/lavanya.jpeg" alt="Lavanya" className="bday-photo-rect" />
        </div>
        <figcaption className="bday-photo-legend">Lavanya at her last birthday celebration</figcaption>
      </figure>
      <section className="bday-message-section">
        <h1 className="bday-heading">Happy Birthday, Lavanya!</h1>
        <div className="bday-message-body">
          जन्मदिनस्य हार्दिक शुभाशयाः, लावण्या।<br/>
          ಜನ್ಮದಿನದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು, ಲಾವಣ್ಯಾ।<br/>
          Wishing you a day filled with joy, love, and laughter.<br/>
          May all your dreams come true!<br/>
          THANK YOU FOR ALWAYS BEING GREAT HOMIE,<br/>
          THANK YOU FOR LISTENING &mdash; you&apos;re never phony!<br/>
          THANK YOU FOR BEING ONE OF THE VERY FEW PEOPLE I COULD EVER ASK FOR,<br/>
          A friend so rare, who opens every door.<br/>
          THANK YOU FOR EVERYTHING ELSE &mdash; the big and small,<br/>
          You&apos;ve been there through it all.<br/>
          NOT HOPING &mdash; but knowing with glee,<br/>
          AS YOU WILL HAVE AN AMAZING YEAR, wild and free!<br/>
          AND AN AMAZING DAY, filled with cheer,<br/>
          ONCE AGAIN HAPPIEST BIRTHDAY!<br/>
          LAVANYA, MAY THE BOND STAY strong and bright,<br/>
          Through every season, day and night! :D <br/>
          <br/>
          &mdash; Aniruddha <br/>
        </div>
      </section>
    </main>
  );
} 