import NavArrowDownIcon from "@icons/NavArrowDownIcon";
import { useEffect, useMemo, useState } from "react";
import PropertyCard from "src/components/global/property-card/PropertyCard";
import { ServiceProperties } from "src/services/ServiceProperties";
import { useStoreProperties } from "src/stores/useStoreProperties";
import { useStorePropertyFilters } from "src/stores/useStorePropertyFilters";

const PROPERTIES_PER_PAGE = 15;
const MAX_VISIBLE_PAGES = 4;

export default function SectionProperties() {
  const filters = useStorePropertyFilters((store) => store.filters);
  const allProperties = useStoreProperties((store) => store.properties);
  const isFetched = useStoreProperties((store) => store.isFetched);
  const isLoading = useStoreProperties((store) => store.isLoading);
  const setIsFetched = useStoreProperties((store) => store.setIsFetched);
  const setIsLoading = useStoreProperties((store) => store.setIsLoading);
  const setAllProperties = useStoreProperties((store) => store.setProperties);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isFetched) return;
    if (allProperties.length === 0 && !isLoading) {
      setIsLoading(true);
      ServiceProperties.getAllProperties()
        .then((res) => {
          setAllProperties(res.data);
        })
        .finally(() => {
          setIsLoading(false);
          setIsFetched(true);
        });
    }
  }, [allProperties.length, isLoading]);

  const filteredProperties = useMemo(() => {
    if (allProperties.length === 0) return [];

    return allProperties.filter((prop) => {
      const md = prop.metadata;
      const tr = md.traits ?? {};
      const meas = md.measurements ?? {};
      const price = md.prices ?? {};

      if (filters.status !== "all" && md.availability?.key !== filters.status)
        return false;
      if (filters.category !== "all" && md.category?.key !== filters.category)
        return false;

      if (filters.bedrooms > 0 && (tr.bedrooms ?? 0) < filters.bedrooms)
        return false;
      if (filters.bathrooms > 0 && (tr.bathrooms ?? 0) < filters.bathrooms)
        return false;
      if (filters.floors > 0 && (tr.floors ?? 0) < filters.floors) return false;
      if (
        filters.parkingLots > 0 &&
        (tr.parking_lots ?? 0) < filters.parkingLots
      )
        return false;

      if (
        filters.meters.trim() !== "" &&
        Number.isFinite(+filters.meters) &&
        (meas.meters ?? 0) < +filters.meters
      )
        return false;
      if (
        filters.rods.trim() !== "" &&
        Number.isFinite(+filters.rods) &&
        (meas.rods ?? 0) < +filters.rods
      )
        return false;

      if (
        filters.total.trim() !== "" &&
        Number.isFinite(+filters.total) &&
        (price.total ?? 0) < +filters.total
      )
        return false;
      if (
        filters.installment.trim() !== "" &&
        Number.isFinite(+filters.installment) &&
        (price.installment ?? 0) < +filters.installment
      )
        return false;

      return true;
    });
  }, [allProperties, filters]);

  const totalPages = Math.ceil(filteredProperties.length / PROPERTIES_PER_PAGE);

  const visibleProperties = useMemo(() => {
    const start = (page - 1) * PROPERTIES_PER_PAGE;
    return filteredProperties.slice(start, start + PROPERTIES_PER_PAGE);
  }, [filteredProperties, page]);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
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

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <section className="flex flex-col items-center gap-6 w-full">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] w-full gap-4">
        {visibleProperties.map((property) => (
          <PropertyCard property={property} key={property.slug} />
        ))}
      </div>

      {!isLoading && visibleProperties.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-2xl font-bold">No se encontraron propiedades</h2>
          <p className="text-sm">
            No se encontraron resultados para los filtros aplicados, cámbialos e
            intenta de nuevo.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-end items-stretch w-full gap-2">
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
              className={`px-[14px] font-mono text-sm rounded-full ${
                p === page
                  ? "bg-harvest-gold-700 text-white"
                  : "bg-harvest-gold-700/20"
              }`}
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
