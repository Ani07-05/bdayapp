export default function Home() {
  const friends = ["Lavanya", "TBA", "TBA", "TBA", "TBA"];
  return (
    <main className="homepage">
      <div className="inline-names">
        <span className="homepage-title">birthday pages for</span>
        <div className="marquee">
          <span className="marquee-content">
            {friends.map((name, idx) => (
              <span key={name + idx} className="marquee-name">{name}</span>
            ))}
            {/* Repeat for seamless loop */}
            {friends.map((name, idx) => (
              <span key={name + '-repeat-' + idx} className="marquee-name">{name}</span>
            ))}
          </span>
        </div>
      </div>
    </main>
  );
}