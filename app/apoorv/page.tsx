export default function ApoorvPage() {
  return (
    <main className="bday-side-layout">
      <div className="confetti-blast">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={`confetti-piece confetti-piece-${i % 8}`}></span>
        ))}
      </div>
      <figure className="bday-photo-figure">
        <div className="bday-photo-confetti">
          <img src="/apoorv.jpg" alt="Apoorv" className="bday-photo-rect" />
        </div>
        <figcaption className="bday-photo-legend">if there was a certificate for being good at everything and great at things you love</figcaption>
      </figure>
      <section className="bday-message-section">
        <h1 className="bday-heading">Happy Birthday, Apoorv!</h1>
        <div className="bday-message-body small-message">
          <p>जन्मदिनस्य हार्दिक शुभाशयाः, अपूर्व।<br/>ಜನ್ಮದಿನದ ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು, ಅಪೂರ್ವ್।</p>
          <p>Wishing you a day filled with joy, success, and endless possibilities!</p>
          <p>Thank you for being an incredible co-founder and friend. Your vision and drive for Pure Athera know no end. Your academic brilliance never fails to inspire, and your programming skills keep setting the bar higher.</p>
          <p>The way you see financials with such clarity and might helps keep our business dreams perfectly in sight. Thank you for all the brainstorming sessions we&apos;ve had, each one making our vision more ironclad.</p>
          <p>As we build Pure Athera, brick by brick, your insights and dedication make everything click. May this year bring you exponential growth in every venture and goal you approach!</p>
          <p>Here&apos;s to more code, more success, and more dreams as we continue building amazing things as a team!</p>
          <p style={{marginTop: '0.5rem', color: '#ffe082'}}>&mdash; Aniruddha</p>
        </div>
      </section>
    </main>
  );
} 