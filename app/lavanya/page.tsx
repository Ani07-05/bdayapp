export default function LavanyaPage() {
  return (
    <main className="bday-side-layout">
      <div className="confetti-blast">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={`confetti-piece confetti-piece-${i % 8}`}></span>
        ))}
      </div>
      <figure className="bday-photo-figure">
        <div className="bday-photo-confetti">
          <img src="/lavanya.jpeg" alt="Lavanya" className="bday-photo-rect" />
        </div>
        <figcaption className="bday-photo-legend">trying not to laugh at extremely serious situations</figcaption>
      </figure>
      <section className="bday-message-section">
        <h1 className="bday-heading">Happy Birthday, Lavanya!</h1>
        <div className="bday-message-body">
        जन्मदिनस्य हार्दिक शुभाशयाः, लावण्या।<br/>
        ಜನ್ಮದಿನದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು, ಲಾವಣ್ಯಾ।
        THANK YOU FOR ALWAYS BEING GREAT HOMIE,<br/>
        THANK YOU FOR LISTENING — you're never phony!<br/>
        THANK YOU FOR BEING ONE OF THE VERY FEW PEOPLE I COULD EVER ASK FOR,<br/>
        A friend so rare, who opens every door.<br/>
THANK YOU FOR EVERYTHING ELSE — the big and small,
You've been there through it all.
NOT HOPING — but knowing with glee,
AS YOU WILL HAVE AN AMAZING YEAR, wild and free!
AND AN AMAZING DAY, filled with cheer,
ONCE AGAIN HAPPIEST BIRTHDAY!
LAVANYA, MAY THE BOND STAY strong and bright,
Through every season, day and night! :D <br/>
<br></br>
— Aniruddha <br/>
          <span className="devanagari"></span>
        </div>
      </section>
    </main>
  );
} 