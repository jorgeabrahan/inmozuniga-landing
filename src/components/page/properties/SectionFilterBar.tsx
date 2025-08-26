import FilterAltIcon from "@icons/FilterAltIcon";
import Delimiter from "@layouts/Delimiter";
import { manageUrlParam } from "@lib/utils/urlParams";
import { useEffect, useState } from "react";
import { useStorePropertyFilters } from "src/stores/useStorePropertyFilters";

const DEBOUNCE_DELAY = 500;

export default function SectionFilterBar() {
  const query = useStorePropertyFilters((store) => store.query);
  const setQuery = useStorePropertyFilters((store) => store.setQuery);
  const [realTimeQuery, setRealTimeQuery] = useState("");
  const setIsShowingFilters = useStorePropertyFilters(
    (store) => store.setIsShowingFilters,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(realTimeQuery);
      manageUrlParam(
        "search",
        realTimeQuery,
        realTimeQuery.trim().length > 0 ? "set" : "delete",
      );
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [realTimeQuery, setQuery]);
  useEffect(() => {
    if (query.trim() !== realTimeQuery.trim()) {
      setRealTimeQuery(query);
    }
  }, [query]);
  return (
    <div className="lgx:hidden w-full border-y-2 border-harvest-gold-700/20 py-4 sticky top-[93px] md:top-[114px] z-[250] bg-white">
      <Delimiter
        as="form"
        className="flex justify-end items-stretch gap-2"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <div className="relative w-full max-w-[400px] rounded-full shadow-[0_0_10px_#00000020] overflow-hidden border border-harvest-gold-700/20">
          <input
            className="w-full h-full px-4 py-[10px] text-xs"
            placeholder="Busca una propiedad"
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            type="text"
            value={realTimeQuery}
            onChange={(e) => {
              setRealTimeQuery(e.target.value);
            }}
          />
        </div>
        <button
          className="bg-harvest-gold-700 rounded-full p-[10px] shadow-[0_0_10px_#00000020] text-white [&>*]:pointer-events-none"
          type="button"
          onClick={() => {
            document.body.style.overflow = "hidden";
            setIsShowingFilters(true);
          }}
        >
          <FilterAltIcon size={20} />
        </button>
      </Delimiter>
    </div>
  );
}
