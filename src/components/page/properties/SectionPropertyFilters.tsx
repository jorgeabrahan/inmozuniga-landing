/* eslint-disable react-hooks/exhaustive-deps */
import RulerIcon from "@icons/RulerIcon";
import {
  PROPERTY_AVAILABILITY,
  PROPERTY_AVAILABILITY_KEYS,
  PROPERTY_CATEGORY,
  PROPERTY_CATEGORY_MEASUREMENT_TYPE,
  PROPERTY_MEASUREMENT_TYPE_KEYS,
  PROPERTY_RENT_CATEGORIES,
  PROPERTY_SALE_CATEGORIES,
  PROPERTY_SHARED_CATEGORIES,
  PROPERTY_TRAIT_FILTERS_BY_CATEGORY,
} from "@lib/constants/property";
import type {
  TypePropertyAvailabilityKey,
  TypePropertyCategoryKey,
} from "@lib/types/Application";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import Input from "src/components/global/fields/Input";
import InputCounter from "src/components/global/fields/InputCounter";
import Select from "src/components/global/fields/Select";
import MainButton from "src/components/global/MainButton";
import TabSelector from "src/components/global/TabSelector";
import { useStorePropertyFilters } from "src/stores/useStorePropertyFilters";
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

export default function SectionPropertyFilters({
  className,
  afterSubmit,
}: {
  className?: string;
  afterSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const setFilters = useStorePropertyFilters((store) => store.setFilters);
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
  } = useForm<Form>({
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
  });

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
    const url = new URL(window.location.href);
    const params = url.searchParams;

    const readParam = (
      key: string,
      parser: (v: string | null) => any,
      fallback: any,
    ) => {
      const val = params.get(key);
      return val === null ? fallback : parser(val);
    };

    const finalStatus: TypePropertyAvailabilityKey | "all" = readParam(
      "status",
      (v) => (v && Object.keys(PROPERTY_AVAILABILITY).includes(v) ? v : null),
      "all",
    );

    const finalCategory: TypePropertyCategoryKey | "all" = readParam(
      "category",
      (v) => (v && validateCategoryBasedOnStatus(finalStatus, v) ? v : null),
      "all",
    );

    const categoryTraitFilters =
      PROPERTY_TRAIT_FILTERS_BY_CATEGORY[
        finalCategory as TypePropertyCategoryKey
      ] ?? {};

    setValue(form.status.id, finalStatus);
    setValue(form.category.id, finalCategory);

    ["bedrooms", "bathrooms", "floors", "parkingLots"].forEach((k) => {
      const v = readParam(k, Number, 0);
      setValue(
        k as keyof Form,
        (categoryTraitFilters as Record<string, boolean>)[k] ? v : 0,
      );
    });

    const measurementType =
      PROPERTY_CATEGORY_MEASUREMENT_TYPE[
        finalCategory as TypePropertyCategoryKey
      ];
    setValue(
      "meters",
      measurementType === "meters" ? readParam("meters", String, "") : "",
    );
    setValue(
      "rods",
      measurementType === "rods" ? readParam("rods", String, "") : "",
    );
    setValue(
      "total",
      finalStatus === "sale" ? readParam("total", String, "") : "",
    );
    setValue(
      "installment",
      finalStatus === "rent" ? readParam("installment", String, "") : "",
    );
  }, []);

  useEffect(() => {
    const validate = () => {
      form.clearErrors();
      const m = Number(meters);
      let isValid = true;
      if (meters.trim() && m < 50) {
        setError(form.meters.id, "El mínimo de metros es 50");
        isValid = false;
      }
      const r = Number(rods);
      if (rods.trim() && r < 50) {
        setError(form.rods.id, "El mínimo de vallas es 50");
        isValid = false;
      }
      const t = Number(total);
      if (total.trim() && t < 100000) {
        setError(
          form.total.id,
          "El mínimo costo total permitido es $100,000.00",
        );
        isValid = false;
      }
      const i = Number(installment);
      if (installment.trim() && i < 100) {
        setError(form.installment.id, "La mínima cuota permitida es $100.00");
        isValid = false;
      }
      return isValid;
    };

    if (!validate()) return;

    setFilters({
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
    });

    const url = new URL(window.location.href);
    const params = url.searchParams;

    const setIf = (
      key: string,
      val: string | number,
      skip: boolean | string | number,
    ) =>
      skip || val === "" || val === "null" || val === "undefined"
        ? params.delete(key)
        : params.set(key, String(val));

    setIf("status", status, status === "all");
    setIf("category", category, category === "all");
    setIf("bedrooms", bedrooms, bedrooms === 0);
    setIf("bathrooms", bathrooms, bathrooms === 0);
    setIf("floors", floors, floors === 0);
    setIf("parkingLots", parkingLots, parkingLots === 0);

    const measurementType =
      PROPERTY_CATEGORY_MEASUREMENT_TYPE[category as TypePropertyCategoryKey];
    setIf("meters", meters, measurementType !== "meters" || meters === "");
    setIf("rods", rods, measurementType !== "rods" || rods === "");
    setIf("total", total, status !== "sale" || total === "");
    setIf("installment", installment, status !== "rent" || installment === "");

    window.history.replaceState(
      null,
      "",
      `${url.pathname}?${params.toString()}`,
    );
  }, [
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
  ]);

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
    categoryTraitFilters &&
    (categoryTraitFilters.bedrooms ||
      categoryTraitFilters.bathrooms ||
      categoryTraitFilters.floors ||
      categoryTraitFilters.parkingLots);

  /* ---------------------------------------------------------------------- */
  /* Render ---------------------------------------------------------------- */
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
        setActiveTab={(tabId) =>
          setValue(form.status.id, tabId as TypePropertyAvailabilityKey)
        }
        tabs={availabilityTabs}
      />

      <Select
        label="Categoría"
        options={categoryOptions}
        id={form.category.id}
        value={category}
        onChange={onChange}
      />

      {category !== "all" && categoryMeasurementType === "meters" && (
        <Input
          id={form.meters.id}
          error={form.meters.error}
          value={meters}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
              setValue={(v) => setValue(form.bedrooms.id, v)}
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
              setValue={(v) => setValue(form.bathrooms.id, v)}
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
              setValue={(v) => setValue(form.floors.id, v)}
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
              setValue={(v) => setValue(form.parkingLots.id, v)}
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
