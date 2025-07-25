import RulerIcon from "@icons/RulerIcon";
import {
  DEFAULT_PROPERTY_AVAILABILITY,
  DEFAULT_PROPERTY_CATEGORY,
  PROPERTY_AVAILABILITY,
  PROPERTY_AVAILABILITY_KEYS,
  PROPERTY_CATEGORY,
  PROPERTY_CATEGORY_MEASUREMENT_TYPE,
  PROPERTY_MEASUREMENT_TYPE,
  PROPERTY_RENT_CATEGORIES,
  PROPERTY_SALE_CATEGORIES,
  PROPERTY_SHARED_CATEGORIES,
  PROPERTY_TRAIT_FILTERS_BY_CATEGORY,
} from "@lib/constants/property";
import type {
  TypePropertyAvailabilities,
  TypePropertyAvailabilityKey,
  TypePropertyCategories,
  TypePropertyCategoryKey,
  TypeUrlParam,
} from "@lib/types/Application";
import { manageUrlParams } from "@lib/utils/urlParams";
import { useEffect, useMemo } from "react";
import Input from "src/components/global/fields/Input";
import InputCounter from "src/components/global/fields/InputCounter";
import Select from "src/components/global/fields/Select";
import TabSelector from "src/components/global/TabSelector";
import {
  useStorePropertyFilters,
  type TypePropertyFilter,
} from "src/stores/useStorePropertyFilters";
import useForm from "use-managed-form";

type Form = {
  status: TypePropertyAvailabilityKey | "all";
  category: TypePropertyCategoryKey | "all";
  bedrooms: number;
  bathrooms: number;
  floors: number;
  parkingLots: number;
  meters: string;
  rods: string;
  total: string;
  installment: string;
};

const INITIAL_FILTERS: Form = {
  status: "all",
  category: "all",
  bedrooms: 0,
  bathrooms: 0,
  floors: 0,
  parkingLots: 0,
  meters: "",
  rods: "",
  total: "",
  installment: "",
};

const MIN_VALID_TOTAL = 100000;
const MIN_VALID_INSTALLMENT = 100;

export default function SectionPropertyFilters({
  className,
  afterSubmit,
}: {
  className?: string;
  afterSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const setFilter = useStorePropertyFilters((store) => store.setFilter);
  const setFilters = useStorePropertyFilters((store) => store.setFilters);
  const setAllFilters = useStorePropertyFilters((store) => store.setAllFilters);
  const query = useStorePropertyFilters((store) => store.query);
  const setQuery = useStorePropertyFilters((store) => store.setQuery);

  const {
    form,
    status,
    category,
    bedrooms,
    bathrooms,
    floors,
    parkingLots,
    meters,
    rods,
    total,
    installment,
    onChange,
    setValue,
    setError,
  } = useForm<Form>(INITIAL_FILTERS);
  const validateCategoryBasedOnStatus = (
    status: TypePropertyAvailabilityKey | "all",
    categoryKey: string,
  ) => {
    if (status === PROPERTY_AVAILABILITY_KEYS.sale) {
      return PROPERTY_SALE_CATEGORIES.includes(
        categoryKey as (typeof PROPERTY_SALE_CATEGORIES)[number],
      );
    }
    if (status === PROPERTY_AVAILABILITY_KEYS.rent) {
      return PROPERTY_RENT_CATEGORIES.includes(
        categoryKey as (typeof PROPERTY_RENT_CATEGORIES)[number],
      );
    }
    return PROPERTY_SHARED_CATEGORIES.includes(
      categoryKey as (typeof PROPERTY_SHARED_CATEGORIES)[number],
    );
  };

  useEffect(() => {
    const filters = INITIAL_FILTERS;
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const status: TypePropertyAvailabilities = (() => {
      const paramStatus = params?.[form.status.id];
      const isValidStatus = Object.keys(PROPERTY_AVAILABILITY).includes(
        paramStatus,
      );
      return isValidStatus
        ? (paramStatus as TypePropertyAvailabilities)
        : DEFAULT_PROPERTY_AVAILABILITY;
    })();
    const category: TypePropertyCategories = (() => {
      const paramCategory = params?.[form.category.id];
      const isValidCategory = validateCategoryBasedOnStatus(
        status,
        paramCategory,
      );
      return isValidCategory
        ? (paramCategory as TypePropertyCategories)
        : DEFAULT_PROPERTY_CATEGORY;
    })();

    setValue(form.status.id, status);
    urlSearchParams.set(form.status.id, status);
    filters.status = status;

    setValue(form.category.id, category);
    urlSearchParams.set(form.category.id, category);
    filters.category = category;

    const traitInputKeys = [
      form.bedrooms.id,
      form.bathrooms.id,
      form.floors.id,
      form.parkingLots.id,
    ];
    const traitFiltersByCategory =
      PROPERTY_TRAIT_FILTERS_BY_CATEGORY[category as TypePropertyCategoryKey];
    traitInputKeys.forEach((key) => {
      const paramTrait = Number(params?.[key]);
      if (!isNaN(paramTrait) && paramTrait > 0 && traitFiltersByCategory[key]) {
        setValue(key, paramTrait);
        filters[key] = paramTrait;
      } else {
        // since the trait filter was NOT applied, it should be removed from the url
        urlSearchParams.delete(key);
      }
    });
    const measurementType =
      category === "all" ? null : PROPERTY_CATEGORY_MEASUREMENT_TYPE[category];
    const measurementInputKeys = [form.meters.id, form.rods.id];
    measurementInputKeys.forEach((key) => {
      const paramMeasurement = params?.[key];
      if (paramMeasurement && measurementType === key) {
        setValue(key, paramMeasurement);
        filters[key] = paramMeasurement;
      } else {
        // since the measurement filter was NOT applied, it should be removed from the url
        urlSearchParams.delete(key);
      }
    });
    const priceInputKeys = [form.installment.id, form.total.id];
    priceInputKeys.forEach((key) => {
      const paramPrice = params?.[key];
      const isTotalFilter = key === form.total.id;
      const isInstallmentFilter = key === form.installment.id;
      const isForSale = status === PROPERTY_AVAILABILITY_KEYS.sale;
      const isForRent = status === PROPERTY_AVAILABILITY_KEYS.rent;
      const isValidTotal = isTotalFilter
        ? Number(paramPrice) >= MIN_VALID_TOTAL
        : false;
      const isValidInstallment = isInstallmentFilter
        ? Number(paramPrice) >= MIN_VALID_INSTALLMENT
        : false;
      const isValidFilter =
        (isForSale && isTotalFilter && isValidTotal) ||
        (isForRent && isInstallmentFilter && isValidInstallment);
      if (paramPrice && isValidFilter) {
        setValue(key, paramPrice);
        filters[key] = paramPrice;
      } else {
        // since the price filter was NOT applied, it should be removed from the url
        urlSearchParams.delete(key);
      }
    });

    // load query to local store from the url search params
    if (params?.search && params.search.trim().length > 0) {
      setQuery(params.search);
    } else {
      urlSearchParams.delete("search");
    }

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${urlSearchParams.toString()}`,
    );
    setAllFilters(filters);
  }, []);

  const handleStatusChange = (status: TypePropertyAvailabilityKey | "all") => {
    const updatedUrlParams: TypeUrlParam[] = [
      { key: form.status.id, value: status, operation: "set" },
    ];
    const updatedFilters: TypePropertyFilter[] = [
      { key: form.status.id, value: status },
    ];
    if (status === DEFAULT_PROPERTY_AVAILABILITY) {
      updatedUrlParams.push({ key: form.installment.id, operation: "delete" });
      updatedUrlParams.push({ key: form.total.id, operation: "delete" });
      updatedFilters.push({
        key: form.installment.id,
        value: INITIAL_FILTERS.installment,
      });
      updatedFilters.push({ key: form.total.id, value: INITIAL_FILTERS.total });
    } else if (status === PROPERTY_AVAILABILITY_KEYS.sale) {
      updatedUrlParams.push({ key: form.installment.id, operation: "delete" });
      updatedFilters.push({
        key: form.installment.id,
        value: INITIAL_FILTERS.installment,
      });
    } else if (status === PROPERTY_AVAILABILITY_KEYS.rent) {
      updatedUrlParams.push({ key: form.total.id, operation: "delete" });
      updatedFilters.push({ key: form.total.id, value: INITIAL_FILTERS.total });
    }
    manageUrlParams(updatedUrlParams);
    setFilters(updatedFilters);
  };
  const handleCategoryChange = (category: string) => {
    const updatedUrlParams: TypeUrlParam[] = [
      { key: form.category.id, value: category, operation: "set" },
    ];
    const updatedFilters: TypePropertyFilter[] = [
      { key: form.category.id, value: category },
    ];
    const traitFiltersByCategory =
      PROPERTY_TRAIT_FILTERS_BY_CATEGORY[category as TypePropertyCategoryKey];
    Object.entries(traitFiltersByCategory).map(([key, value]) => {
      if (!value) {
        updatedUrlParams.push({ key, operation: "delete" });
        updatedFilters.push({
          key: key as keyof typeof INITIAL_FILTERS,
          value: INITIAL_FILTERS[key as keyof typeof INITIAL_FILTERS],
        });
      }
    });
    const measurementType =
      PROPERTY_CATEGORY_MEASUREMENT_TYPE[category as TypePropertyCategoryKey];
    if (category === DEFAULT_PROPERTY_CATEGORY) {
      updatedUrlParams.push({ key: form.meters.id, operation: "delete" });
      updatedUrlParams.push({ key: form.rods.id, operation: "delete" });
      updatedFilters.push({
        key: form.meters.id,
        value: INITIAL_FILTERS.meters,
      });
      updatedFilters.push({ key: form.rods.id, value: INITIAL_FILTERS.rods });
    }
    if (measurementType === "meters") {
      updatedUrlParams.push({ key: form.rods.id, operation: "delete" });
      updatedFilters.push({ key: form.rods.id, value: INITIAL_FILTERS.rods });
    }
    if (measurementType === "rods") {
      updatedUrlParams.push({ key: form.meters.id, operation: "delete" });
      updatedFilters.push({
        key: form.meters.id,
        value: INITIAL_FILTERS.meters,
      });
    }
    manageUrlParams(updatedUrlParams);
    setFilters(updatedFilters);
  };
  const handleMeasurementChange = (key: "meters" | "rods", value: string) => {
    const measurement = Number(value);
    const label = PROPERTY_MEASUREMENT_TYPE[key];
    if (measurement >= 50) {
      setError(form[key].id, "");
      manageUrlParams([{ key, value, operation: "set" }]);
      setFilter({ key, value });
      return;
    }
    setError(form[key].id, `El mínimo de ${label} es 50`);
  };
  const handlePriceChange = (key: "installment" | "total", value: string) => {
    const price = Number(value);
    const isInstallment = key === "installment";
    const minPrice = isInstallment ? MIN_VALID_INSTALLMENT : MIN_VALID_TOTAL;
    const isValidPrice = price >= minPrice;
    const invalidMessage = isInstallment
      ? `La mínima cuota permitida es $${minPrice}`
      : `El mínimo costo total permitido es $${minPrice}`;
    if (isValidPrice) {
      setError(form[key].id, "");
      manageUrlParams([{ key, value, operation: "set" }]);
      setFilter({ key, value });
      return;
    }
    setError(form[key].id, invalidMessage);
  };
  const handleTraitChange = (
    key: "bedrooms" | "bathrooms" | "floors" | "parkingLots",
    value: number,
  ) => {
    if (value > 0) {
      manageUrlParams([{ key, value: value.toString(), operation: "set" }]);
    } else {
      manageUrlParams([{ key, operation: "delete" }]);
    }
    setFilter({ key, value });
  };

  const availabilityTabs = useMemo(
    () => [
      { id: "all", label: "Todas" },
      ...Object.entries(PROPERTY_AVAILABILITY).map(([id, label]) => ({
        id,
        label,
      })),
    ],
    [],
  );
  const categoryOptions = useMemo(() => {
    const options = [
      { value: "all", label: "Todas" },
      ...Object.entries(PROPERTY_CATEGORY)
        .filter(([key]) => validateCategoryBasedOnStatus(status, key))
        .map(([value, label]) => ({ value, label })),
    ];

    const validOption = options.find((o) => o.value === category);
    if (!validOption) setValue(form.category.id, "all");
    return options;
  }, [status, category]);
  const categoryTraitFilters =
    category !== "all" ? PROPERTY_TRAIT_FILTERS_BY_CATEGORY[category] : null;
  const categoryMeasurementType =
    category !== "all" ? PROPERTY_CATEGORY_MEASUREMENT_TYPE[category] : null;
  const isAtLeastOneTraitFilterVisible =
    categoryTraitFilters && Object.values(categoryTraitFilters).some((v) => v);
  return (
    <form
      className={`space-y-5 ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        afterSubmit?.(e);
      }}
      data-close-onclick
    >
      <TabSelector
        activeTab={status}
        setActiveTab={(tabId) => {
          setValue(form.status.id, tabId as TypePropertyAvailabilityKey);
          handleStatusChange(tabId as TypePropertyAvailabilityKey);
        }}
        tabs={availabilityTabs}
      />

      <Select
        label="Categoría"
        options={categoryOptions}
        id={form.category.id}
        value={category}
        onChange={(e) => {
          onChange(e);
          handleCategoryChange(e.target.value);
        }}
      />

      {category !== "all" && categoryMeasurementType === "meters" && (
        <Input
          id={form.meters.id}
          error={form.meters.error}
          value={meters}
          onChange={(e) => {
            onChange(e);
            handleMeasurementChange(form.meters.id, e.target.value);
          }}
          type="number"
          label={
            <>
              Area mínima de {PROPERTY_CATEGORY[category].toLowerCase()}{" "}
              (m&sup2;)
            </>
          }
          placeholder="Cualquier área"
          icon={RulerIcon}
        />
      )}

      {category !== "all" && categoryMeasurementType === "rods" && (
        <Input
          id={form.rods.id}
          error={form.rods.error}
          value={rods}
          onChange={(e) => {
            onChange(e);
            handleMeasurementChange(form.rods.id, e.target.value);
          }}
          type="number"
          label={<>Area mínima del terreno (v&sup2;)</>}
          icon={RulerIcon}
        />
      )}

      {status === "sale" && (
        <Input
          id={form.total.id}
          error={form.total.error}
          value={total}
          onChange={(e) => {
            onChange(e);
            handlePriceChange(form.total.id, e.target.value);
          }}
          type="number"
          label="Costo total maximo ($)"
          placeholder="Cualquier costo"
        />
      )}

      {status === "rent" && (
        <Input
          id={form.installment.id}
          error={form.installment.error}
          value={installment}
          onChange={(e) => {
            onChange(e);
            handlePriceChange(form.installment.id, e.target.value);
          }}
          type="number"
          label="Cuota maxima ($)"
          placeholder="Cualquier cuota"
        />
      )}

      {isAtLeastOneTraitFilterVisible && (
        <div className="space-y-4">
          {categoryTraitFilters?.bedrooms && (
            <InputCounter
              id={form.bedrooms.id}
              value={bedrooms}
              label="Habitaciones"
              setValue={(v) => {
                setValue(form.bedrooms.id, v);
                handleTraitChange(form.bedrooms.id, v);
              }}
              valueFormatter={(v) => (v === 0 ? v.toString() : `${v}+`)}
              min={0}
              max={8}
            />
          )}
          {categoryTraitFilters?.bathrooms && (
            <InputCounter
              id={form.bathrooms.id}
              value={bathrooms}
              label="Baños"
              setValue={(v) => {
                setValue(form.bathrooms.id, v);
                handleTraitChange(form.bathrooms.id, v);
              }}
              valueFormatter={(v) => (v === 0 ? v.toString() : `${v}+`)}
              min={0}
              max={8}
            />
          )}
          {categoryTraitFilters?.floors && (
            <InputCounter
              id={form.floors.id}
              value={floors}
              label="Pisos"
              setValue={(v) => {
                setValue(form.floors.id, v);
                handleTraitChange(form.floors.id, v);
              }}
              valueFormatter={(v) => (v === 0 ? v.toString() : `${v}+`)}
              min={0}
              max={8}
            />
          )}
          {categoryTraitFilters?.parkingLots && (
            <InputCounter
              id={form.parkingLots.id}
              value={parkingLots}
              label="Parking"
              setValue={(v) => {
                setValue(form.parkingLots.id, v);
                handleTraitChange(form.parkingLots.id, v);
              }}
              valueFormatter={(v) => (v === 0 ? v.toString() : `${v}+`)}
              min={0}
              max={8}
            />
          )}
        </div>
      )}
    </form>
  );
}
