import NavArrowDownIcon from "@icons/NavArrowDownIcon";
import type { TypeCosmicProperty } from "@lib/types/Database";
import { useEffect, useState } from "react";
import PropertyCard from "src/components/global/property-card/PropertyCard";
import { ServiceProperties } from "src/services/ServiceProperties";
import { useStorePropertyFilters } from "src/stores/useStorePropertyFilters";

const PROPERTIES_PER_PAGE = 6;
const MAX_VISIBLE_PAGES = 4;

export default function SectionProperties() {
  const filters = useStorePropertyFilters((store) => store.filters);
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<TypeCosmicProperty[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(total / PROPERTIES_PER_PAGE);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const propertyFilters: {
        [key: string]: string;
      } = {};
      if (filters.status !== "all") {
        propertyFilters["availability"] = filters.status;
      }
      if (filters.category !== "all") {
        propertyFilters["category"] = filters.category;
      }
      try {
        const res = await ServiceProperties.getProperties({
          limit: PROPERTIES_PER_PAGE,
          page,
          ...propertyFilters,
        });
        setProperties(res.data);
        setTotal(res.total);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [filters, page]);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getVisiblePages = () => {
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(1, page - half);
    let end = start + MAX_VISIBLE_PAGES - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <section className="flex flex-col items-center gap-6 w-full">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] w-full gap-4">
        {properties.map((property) => (
          <PropertyCard property={property} key={property.slug} />
        ))}
      </div>

      {properties.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-2xl font-bold">No hay propiedades disponibles</h2>
          <p className="text-sm">
            Actualiza tus propiedades o crea una nueva propiedad
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-stretch w-full gap-2">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1 || isLoading}
            className="p-2 rounded-full bg-harvest-gold-700/20 disabled:opacity-50 disabled:cursor-not-allowed [&>*]:pointer-events-none"
          >
            <NavArrowDownIcon size={20} className="rotate-90" />
          </button>

          {getVisiblePages().map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-[14px] font-mono text-sm rounded-full ${p === page ? "bg-harvest-gold-700 text-white" : "bg-harvest-gold-700/20"}`}
              disabled={p === page || isLoading}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages || isLoading}
            className="p-2 rounded-full bg-harvest-gold-700/20 disabled:opacity-50 disabled:cursor-not-allowed [&>*]:pointer-events-none"
          >
            <NavArrowDownIcon size={20} className="-rotate-90" />
          </button>
        </div>
      )}
    </section>
  );
}
