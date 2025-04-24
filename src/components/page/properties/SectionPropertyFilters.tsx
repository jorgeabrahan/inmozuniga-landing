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
  const updatePropertyFilters = () => {
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
  };
  useEffect(() => {
    const expectedParams = [
      "status",
      "category",
      "bedrooms",
      "bathrooms",
      "floors",
      "parkingLots",
      "meters",
      "rods",
      "total",
      "installment",
    ];

    const url = new URL(window.location.href);
    const params = url.searchParams;

    let shouldUpdateURL = false;

    // STATUS
    const statusParam = params.get("status");
    const isValidStatus =
      statusParam === "all" ||
      Object.keys(PROPERTY_AVAILABILITY).includes(statusParam ?? "");
    const finalStatus: TypePropertyAvailabilityKey | "all" = isValidStatus
      ? (statusParam as TypePropertyAvailabilityKey | "all")
      : "all";

    setValue("status", finalStatus);
    if (!isValidStatus || !statusParam) {
      params.set("status", finalStatus);
      shouldUpdateURL = true;
    }

    // CATEGORY
    const categoryParam = params.get("category");
    const isValidCategory =
      categoryParam === "all" ||
      validateCategoryBasedOnStatus(finalStatus, categoryParam ?? "");
    const finalCategory: TypePropertyCategoryKey | "all" = isValidCategory
      ? (categoryParam as TypePropertyCategoryKey | "all")
      : "all";

    setValue("category", finalCategory);
    if (!isValidCategory || !categoryParam) {
      params.set("category", finalCategory);
      shouldUpdateURL = true;
    }

    const categoryFilters =
      PROPERTY_TRAIT_FILTERS_BY_CATEGORY[
        finalCategory as TypePropertyCategoryKey
      ] ?? {};

    // TRAIT FILTERS
    const traitParams = [
      "bedrooms",
      "bathrooms",
      "floors",
      "parkingLots",
    ] as const;

    const traitsFinalValues: Record<string, number> = {};
    traitParams.forEach((trait) => {
      const rawValue = params.get(trait);
      const hasFilter = (categoryFilters as Record<string, boolean>)[trait];
      const numeric = Number(rawValue);
      const valid = hasFilter && rawValue != null && !isNaN(numeric);
      const finalValue = valid ? numeric : 0;

      setValue(trait, finalValue);
      traitsFinalValues[trait] = finalValue;
      if (!valid || !rawValue) {
        params.set(trait, finalValue.toString());
        shouldUpdateURL = true;
      }
    });

    // AREA FILTERS
    const measurementType =
      PROPERTY_CATEGORY_MEASUREMENT_TYPE[
        finalCategory as TypePropertyCategoryKey
      ];

    const metersRaw = params.get("meters");
    const metersValue = Number(metersRaw);
    const isMetersValid =
      measurementType === "meters" &&
      metersRaw != null &&
      !isNaN(metersValue) &&
      metersValue > 0;
    const finalMeters = isMetersValid ? metersValue.toString() : "";
    setValue("meters", finalMeters);
    if (!isMetersValid || !metersRaw) {
      params.set("meters", finalMeters);
      shouldUpdateURL = true;
    }

    const rodsRaw = params.get("rods");
    const rodsValue = Number(rodsRaw);
    const isRodsValid =
      measurementType === "rods" &&
      rodsRaw != null &&
      !isNaN(rodsValue) &&
      rodsValue > 0;
    const finalRods = isRodsValid ? rodsValue.toString() : "";
    setValue("rods", finalRods);
    if (!isRodsValid || !rodsRaw) {
      params.set("rods", finalRods);
      shouldUpdateURL = true;
    }

    // PRICE FILTERS
    const totalRaw = params.get("total");
    const totalValue = Number(totalRaw);
    const isTotalValid =
      finalStatus === "sale" &&
      totalRaw != null &&
      !isNaN(totalValue) &&
      totalValue > 0;
    const finalTotal = isTotalValid ? totalValue.toString() : "";
    setValue("total", finalTotal);
    if (!isTotalValid || !totalRaw) {
      params.set("total", finalTotal);
      shouldUpdateURL = true;
    }

    const installmentRaw = params.get("installment");
    const installmentValue = Number(installmentRaw);
    const isInstallmentValid =
      finalStatus === "rent" &&
      installmentRaw != null &&
      !isNaN(installmentValue) &&
      installmentValue > 0;
    const finalInstallment = isInstallmentValid
      ? installmentValue.toString()
      : "";
    setValue("installment", finalInstallment);
    if (!isInstallmentValid || !installmentRaw) {
      params.set("installment", finalInstallment);
      shouldUpdateURL = true;
    }

    // REMOVE UNEXPECTED PARAMS
    Array.from(params.keys()).forEach((key) => {
      if (!expectedParams.includes(key)) {
        params.delete(key);
        shouldUpdateURL = true;
      }
    });

    // UPDATE URL
    if (shouldUpdateURL) {
      window.history.replaceState(
        null,
        "",
        `${url.pathname}?${params.toString()}`,
      );
    }
    setFilters({
      status: finalStatus,
      category: finalCategory,
      bedrooms: traitsFinalValues.bedrooms,
      bathrooms: traitsFinalValues.bathrooms,
      floors: traitsFinalValues.floors,
      parkingLots: traitsFinalValues.parkingLots,
      total: finalTotal,
      installment: finalInstallment,
      meters: finalMeters,
      rods: finalRods,
    });
  }, []);

  const availabilityTabs = useMemo(
    () => [
      {
        id: "all",
        label: "Todas",
      },
      ...Object.entries(PROPERTY_AVAILABILITY).map(([id, label]) => ({
        id,
        label,
      })),
    ],
    [PROPERTY_AVAILABILITY],
  );
  const categoryOptions = useMemo(() => {
    const options: { value: string; label: string }[] = [
      {
        value: "all",
        label: "Todas",
      },
      ...Object.entries(PROPERTY_CATEGORY)
        .filter(([key]) => {
          const categoryKey = key as TypePropertyCategoryKey;
          return validateCategoryBasedOnStatus(form.status.value, categoryKey);
        })
        .map(([key, value]) => ({
          value: key,
          label: value,
        })),
    ];

    const isValidCategory =
      options.find((option) => option.value === form.category.value) != null;

    if (!isValidCategory) {
      setValue(form.category.id, "all");
    }
    return options;
  }, [PROPERTY_CATEGORY, form.status.value]);

  const categoryTraitFilters =
    form.category.value !== "all"
      ? PROPERTY_TRAIT_FILTERS_BY_CATEGORY[form.category.value]
      : null;
  const categoryMeasurementType =
    form.category.value !== "all"
      ? PROPERTY_CATEGORY_MEASUREMENT_TYPE[form.category.value]
      : null;
  const isAtLeastOneTraitFilterVisible =
    categoryTraitFilters != null &&
    (categoryTraitFilters.bedrooms ||
      categoryTraitFilters.bathrooms ||
      categoryTraitFilters.floors ||
      categoryTraitFilters.parkingLots);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = new URL(window.location.href);

    const meters =
      form.meters.value.trim().length > 0 ? Number(form.meters.value) : NaN;
    const rods =
      form.rods.value.trim().length > 0 ? Number(form.rods.value) : NaN;
    const total =
      form.total.value.trim().length > 0 ? Number(form.total.value) : NaN;
    const installment =
      form.installment.value.trim().length > 0
        ? Number(form.installment.value)
        : NaN;

    const measurementType =
      PROPERTY_CATEGORY_MEASUREMENT_TYPE[
        form.category.value as TypePropertyCategoryKey
      ];

    const status = form.status.value;
    const category = form.category.value;

    if (!isNaN(meters) && meters < 50) {
      toast.error("El mínimo de metros es 50");
      return;
    }
    if (!isNaN(total) && total < 100000) {
      toast.error("El mínimo costo total permitido es $100,000.00");
      return;
    }
    if (!isNaN(installment) && installment < 100) {
      toast.error("La mínima cuota permitida es $100.00");
      return;
    }

    url.searchParams.set("status", status);
    url.searchParams.set("category", category);

    url.searchParams.set("bedrooms", form.bedrooms.value.toString());
    url.searchParams.set("bathrooms", form.bathrooms.value.toString());
    url.searchParams.set("floors", form.floors.value.toString());
    url.searchParams.set("parkingLots", form.parkingLots.value.toString());

    // Área
    if (measurementType === PROPERTY_MEASUREMENT_TYPE_KEYS.meters) {
      url.searchParams.set(
        "meters",
        !isNaN(meters) && meters > 0 ? meters.toString() : "",
      );
      url.searchParams.set("rods", "");
    } else if (measurementType === PROPERTY_MEASUREMENT_TYPE_KEYS.rods) {
      url.searchParams.set(
        "rods",
        !isNaN(rods) && rods > 0 ? rods.toString() : "",
      );
      url.searchParams.set("meters", "");
    } else {
      url.searchParams.set("meters", "");
      url.searchParams.set("rods", "");
    }

    // Precio
    if (status === PROPERTY_AVAILABILITY_KEYS.sale) {
      url.searchParams.set(
        "total",
        !isNaN(total) && total > 0 ? total.toString() : "",
      );
      url.searchParams.set("installment", "");
    } else if (status === PROPERTY_AVAILABILITY_KEYS.rent) {
      url.searchParams.set(
        "installment",
        !isNaN(installment) && installment > 0 ? installment.toString() : "",
      );
      url.searchParams.set("total", "");
    } else {
      url.searchParams.set("total", "");
      url.searchParams.set("installment", "");
    }

    // Reemplaza la URL sin recargar
    window.history.replaceState(null, "", url.toString());
    updatePropertyFilters();
  }

  return (
    <form
      className={`space-y-5 ${className}`}
      onSubmit={(e) => {
        handleSubmit(e);
        afterSubmit?.(e);
      }}
      data-close-onclick
    >
      <TabSelector
        activeTab={form.status.value}
        setActiveTab={(tabId) => {
          setValue(form.status.id, tabId as TypePropertyAvailabilityKey);
        }}
        tabs={availabilityTabs}
      />
      <Select
        label="Categoría"
        options={categoryOptions}
        id={form.category.id}
        value={form.category.value}
        onChange={onChange}
      />
      {form.category.value !== "all" &&
        categoryMeasurementType === PROPERTY_MEASUREMENT_TYPE_KEYS.meters && (
          <Input
            id={form.meters.id}
            value={form.meters.value}
            onChange={onChange}
            type="number"
            label={
              <>
                Area mínima de{" "}
                {PROPERTY_CATEGORY[form.category.value].toLowerCase()} (m&sup2;)
              </>
            }
            placeholder="Cualquier área"
            icon={RulerIcon}
          />
        )}
      {form.category.value !== "all" &&
        categoryMeasurementType === PROPERTY_MEASUREMENT_TYPE_KEYS.rods && (
          <Input
            id={form.rods.id}
            value={form.rods.value}
            onChange={onChange}
            type="number"
            label={<>Area mínima del terreno (v&sup2;)</>}
            icon={RulerIcon}
          />
        )}

      {form.status.value === PROPERTY_AVAILABILITY_KEYS.sale && (
        <Input
          id={form.total.id}
          value={form.total.value}
          onChange={onChange}
          type="number"
          label="Costo total maximo ($)"
          placeholder="Cualquier costo"
        />
      )}
      {form.status.value === PROPERTY_AVAILABILITY_KEYS.rent && (
        <Input
          id={form.installment.id}
          value={form.installment.value}
          onChange={onChange}
          type="number"
          label="Cuota maxima ($)"
          placeholder="Cualquier cuota"
        />
      )}
      {isAtLeastOneTraitFilterVisible && (
        <div className="space-y-4">
          {categoryTraitFilters && categoryTraitFilters.bedrooms && (
            <InputCounter
              id={form.bedrooms.id}
              value={form.bedrooms.value}
              label="Habitaciones"
              setValue={(value) => setValue(form.bedrooms.id, value)}
              valueFormatter={(value) =>
                value === 0 ? value.toString() : `${value}+`
              }
              min={0}
              max={8}
            />
          )}
          {categoryTraitFilters && categoryTraitFilters.bathrooms && (
            <InputCounter
              id={form.bathrooms.id}
              value={form.bathrooms.value}
              label="Baños"
              setValue={(value) => setValue(form.bathrooms.id, value)}
              valueFormatter={(value) =>
                value === 0 ? value.toString() : `${value}+`
              }
              min={0}
              max={8}
            />
          )}
          {categoryTraitFilters && categoryTraitFilters.floors && (
            <InputCounter
              id={form.floors.id}
              value={form.floors.value}
              label="Pisos"
              setValue={(value) => setValue(form.floors.id, value)}
              valueFormatter={(value) =>
                value === 0 ? value.toString() : `${value}+`
              }
              min={0}
              max={8}
            />
          )}
          {categoryTraitFilters && categoryTraitFilters.parkingLots && (
            <InputCounter
              id={form.parkingLots.id}
              value={form.parkingLots.value}
              label="Parking"
              setValue={(value) => setValue(form.parkingLots.id, value)}
              valueFormatter={(value) =>
                value === 0 ? value.toString() : `${value}+`
              }
              min={0}
              max={8}
            />
          )}
        </div>
      )}
      <MainButton
        className="w-full text-sm"
        text="Aplicar filtros"
        type="submit"
      />
    </form>
  );
}
