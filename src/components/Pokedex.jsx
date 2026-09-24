import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import PokemonCard from "./Pokemoncard";
import "../components/css/Pokedex.css";

const TYPE_COLORS = {
  normal: "#9099A1", fire: "#FF7C4C", water: "#4D90D5", electric: "#F8CF2C",
  grass: "#63BB5B", ice: "#74CEC0", fighting: "#CE4069", poison: "#AB6AC8",
  ground: "#D97845", flying: "#8FA8DD", psychic: "#F97176", bug: "#90C12C",
  rock: "#C7B78B", ghost: "#5269AC", dragon: "#0A6DC4", dark: "#5A5366",
  steel: "#5A8EA2", fairy: "#EC8FE6",
};

const ALL_TYPES = Object.keys(TYPE_COLORS);
const PAGE_SIZE = 20;
const BASE_URL = "https://pokeapi.co/api/v2";

export default function Pokedex() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState("");
  const [sortBy, setSortBy]         = useState("id");
  const [selectedType, setSelectedType] = useState("all");
  const [page, setPage]             = useState(1);

  // ── Fetch all Pokémon details via axios ──────────────────────────────────
  const fetchAllPokemon = useCallback(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${BASE_URL}/pokemon`, { params: { limit: 151, offset: 0 } })
      .then(({ data }) => {
        // Fire all detail requests in parallel
        const detailRequests = data.results.map((p) => axios.get(p.url));
        return Promise.all(detailRequests);
      })
      .then((responses) => {
        setAllPokemon(responses.map((r) => r.data));
      })
      .catch((err) => {
        const msg =
          err.response
            ? `Error ${err.response.status}: ${err.response.statusText}`
            : err.request
            ? "No response from PokéAPI — check your connection."
            : err.message;
        setError(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchAllPokemon();
  }, [fetchAllPokemon]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [search, sortBy, selectedType]);

  // ── Filtering + sorting with useMemo ────────────────────────────────────
  const filtered = useMemo(() => {
    return allPokemon
      .filter((p) => {
        const q = search.trim().toLowerCase();
        const matchesSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          String(p.id).includes(q);

        const matchesType =
          selectedType === "all" ||
          p.types.some((t) => t.type.name === selectedType);

        return matchesSearch && matchesType;
      })
      .sort((a, b) =>
        sortBy === "name" ? a.name.localeCompare(b.name) : a.id - b.id
      );
  }, [allPokemon, search, sortBy, selectedType]);

  // ── Pagination derived values with useMemo ───────────────────────────────
  const { totalPages, paginated } = useMemo(() => {
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    return { totalPages, paginated };
  }, [filtered, page]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSearchChange   = useCallback((e) => setSearch(e.target.value), []);
  const handleSortChange     = useCallback((e) => setSortBy(e.target.value), []);
  const handleTypeChange     = useCallback((e) => setSelectedType(e.target.value), []);
  const handleClearSearch    = useCallback(() => setSearch(""), []);

  return (
    <div className="pokedex-root">
      <header className="pokedex-header">
        <div className="header-inner">
          <div className="header-title">
            <span className="pokeball-icon">⬤</span>
            <h1>Pokédex</h1>
          </div>
          <p className="header-sub">
            {loading ? "Loading…" : `${filtered.length} Pokémon found`}
          </p>
        </div>
      </header>

      <div className="controls-bar">
        {/* Search */}
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search by name or number…"
            value={search}
            onChange={handleSearchChange}
          />
          {search && (
            <button className="clear-btn" onClick={handleClearSearch}>✕</button>
          )}
        </div>

        {/* Sort */}
        <div className="filter-group">
          <label className="filter-label">Sort by</label>
          <select className="filter-select" value={sortBy} onChange={handleSortChange}>
            <option value="id">Number</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Type */}
        <div className="filter-group">
          <label className="filter-label">Type</label>
          <select
            className="filter-select type-select"
            value={selectedType}
            onChange={handleTypeChange}
            style={
              selectedType !== "all"
                ? { borderColor: TYPE_COLORS[selectedType], color: TYPE_COLORS[selectedType] }
                : {}
            }
          >
            <option value="all">All types</option>
            {ALL_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="state-message">
          <div className="spinner" />
          <p>Catching Pokémon…</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="state-message error">
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchAllPokemon}>Try again</button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="state-message">
          <p className="empty-title">No Pokémon found</p>
          <p className="empty-sub">Try a different name, number, or type.</p>
        </div>
      )}

      {/* Grid + pagination */}
      {!loading && !error && filtered.length > 0 && (
        <>
          <div className="card-grid">
            {paginated.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} typeColors={TYPE_COLORS} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button className="page-btn" disabled={page === 1} onClick={() => setPage(1)}>«</button>
              <button className="page-btn" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>‹</button>
              <span className="page-info">
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </span>
              <button className="page-btn" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>›</button>
              <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(totalPages)}>»</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}