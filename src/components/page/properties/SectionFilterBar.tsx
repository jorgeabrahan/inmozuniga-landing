import FilterAltIcon from "@icons/FilterAltIcon";
import SearchIcon from "@icons/SearchIcon";
import Delimiter from "@layouts/Delimiter";
import { useStorePropertyFilters } from "src/stores/useStorePropertyFilters";

export default function SectionFilterBar() {
  const setIsShowingFilters = useStorePropertyFilters(
    (store) => store.setIsShowingFilters,
  );
  return (
    <div className="lgx:hidden w-full border-y-2 border-harvest-gold-700/20 py-4 sticky top-[94px] md:top-[114px] z-[250] bg-white">
      <Delimiter as="form" className="flex justify-end items-stretch gap-2">
        <div className="relative w-full max-w-[400px] rounded-full shadow-[0_0_10px_#00000044] overflow-hidden">
          <input
            className="w-full h-full px-4 py-[10px] text-xs"
            placeholder="Busca una propiedad por nombre"
            type="text"
          />
          <button className="absolute px-3 right-0 top-0 h-full bg-harvest-gold-700 text-white">
            <SearchIcon size={20} />
          </button>
        </div>
        <button
          className="bg-harvest-gold-700 rounded-full p-[10px] shadow-[0_0_10px_#00000044] text-white [&>*]:pointer-events-none"
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
