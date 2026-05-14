import Reveal from "./Reveal";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  const centered = align === "center";

  return (
    <Reveal
      className={[
        "mb-10 md:mb-14",
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      ].join(" ")}
    >
      {eyebrow && (
        <div className={["mb-4 flex items-center gap-3", centered ? "justify-center" : ""].join(" ")}>
          <span className="hero-line h-px w-10 rounded-full" />
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            {eyebrow}
          </p>
        </div>
      )}
      <h2 className="text-3xl font-bold leading-tight text-[color:var(--text)] md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-8 text-[color:var(--muted)] md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
