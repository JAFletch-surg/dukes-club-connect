const sponsors = [
  "Royal College of Surgeons",
  "ACPGBI",
  "Medtronic",
  "Intuitive Surgical",
  "Ethicon",
  "Stryker",
];

const SponsorsSection = () => {
  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-mono tracking-widest uppercase text-muted-foreground mb-10">
          Our Corporate Sponsors
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {sponsors.map((name) => (
            <div
              key={name}
              className="text-muted-foreground/50 hover:text-foreground transition-colors text-lg font-serif font-semibold"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
