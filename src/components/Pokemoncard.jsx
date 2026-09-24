import { useState, useCallback, useMemo } from "react";

const STAT_ABBR = { hp: "HP", attack: "ATK", defense: "DEF", speed: "SPD" };
const DISPLAY_STATS = ["hp", "attack", "defense", "speed"];

export default function PokemonCard({ pokemon, typeColors }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = useCallback(() => setFlipped((f) => !f), []);
  const handleKeyDown = useCallback(
    (e) => { if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f); },
    []
  );

  // Derive stable values with useMemo so they don't recompute on every render
  const sprite = useMemo(
    () =>
      pokemon.sprites?.other?.["official-artwork"]?.front_default ||
      pokemon.sprites?.front_default ||
      null,
    [pokemon.sprites]
  );

  const accentColor = useMemo(() => {
    const primaryType = pokemon.types[0]?.type.name;
    return typeColors[primaryType] ?? "#9099A1";
  }, [pokemon.types, typeColors]);

  const displayStats = useMemo(
    () => pokemon.stats.filter((s) => DISPLAY_STATS.includes(s.stat.name)),
    [pokemon.stats]
  );

  const formattedId = useMemo(
    () => `#${String(pokemon.id).padStart(3, "0")}`,
    [pokemon.id]
  );

  const height = useMemo(() => (pokemon.height / 10).toFixed(1), [pokemon.height]);
  const weight = useMemo(() => (pokemon.weight / 10).toFixed(1), [pokemon.weight]);

  return (
    <div
      className={`poke-card${flipped ? " flipped" : ""}`}
      style={{ "--accent": accentColor }}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${pokemon.name}, ${formattedId} — press Enter to see stats`}
      aria-pressed={flipped}
    >
      <div className="card-inner">

        {/* ── Front ── */}
        <div className="card-face card-front">
          <div className="card-number">{formattedId}</div>
          <div className="card-sprite-wrap">
            {sprite ? (
              <img
                src={sprite}
                alt={pokemon.name}
                className="card-sprite"
                loading="lazy"
              />
            ) : (
              <div className="card-sprite-placeholder">?</div>
            )}
          </div>
          <div className="card-info">
            <h2 className="card-name">{pokemon.name}</h2>
            <div className="card-types">
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className="type-badge"
                  style={{ background: typeColors[type.name] ?? "#aaa" }}
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Back ── */}
        <div className="card-face card-back">
          <div className="card-number">{formattedId}</div>
          <h2 className="card-name back-name">{pokemon.name}</h2>
          <div className="card-stats">
            {displayStats.map((s) => (
              <div key={s.stat.name} className="stat-row">
                <span className="stat-label">
                  {STAT_ABBR[s.stat.name] ?? s.stat.name}
                </span>
                <div className="stat-bar-wrap">
                  <div
                    className="stat-bar"
                    style={{ width: `${Math.min((s.base_stat / 160) * 100, 100)}%` }}
                  />
                </div>
                <span className="stat-val">{s.base_stat}</span>
              </div>
            ))}
          </div>
          <div className="card-meta">
            <span>{height} m</span>
            <span>{weight} kg</span>
          </div>
          <p className="card-flip-hint">click to flip back</p>
        </div>

      </div>
    </div>
  );
}