import { PROPERTY_AVAILABILITY_KEYS } from "@lib/constants/property";
import type { TypeCosmicProperty } from "@lib/types/Database";
import { UtilsFormat } from "@lib/utils/UtilsFormat";
import { useEffect, useMemo, useState } from "react";
import PropertyCard from "src/components/global/property-card/PropertyCard";
import { ServiceProperties } from "src/services/ServiceProperties";
import { useStoreProperties } from "src/stores/useStoreProperties";
import { useStoreQuoter } from "src/stores/useStoreQuoter";

const MESSAGES = {
  noSalary: {
    title: "Ingresa tu salario",
    description:
      "Para poder mostrarte las propiedades a las que puedes aplicar debes ingresar tu salario mensual.",
  },
  loading: {
    title: "Cargando propiedades",
    description: "Espera mientras cargamos las propiedades disponibles",
  },
  noResults: {
    title: "No se encontraron propiedades",
    description:
      "No tenemos propiedades disponibles a las que puedas aplicar con el salario ingresado. Este cotizador es solo una referencia, para obtener información mas especifica contacta a uno de nuestros agentes.",
  },
};

export const SectionAvailableProperties = () => {
  const salary = useStoreQuoter((store) => store.salary);
  const maxMonthlyPayment = useStoreQuoter((store) => store.maxMonthlyPayment);
  const maxLoanAmount = useStoreQuoter((store) => store.maxLoanAmount);
  const maxPropertyPrice = useStoreQuoter((store) => store.maxPropertyPrice);
  const allProperties = useStoreProperties((store) => store.properties);
  const isFetched = useStoreProperties((store) => store.isFetched);
  const isLoading = useStoreProperties((store) => store.isLoading);
  const setIsFetched = useStoreProperties((store) => store.setIsFetched);
  const setIsLoading = useStoreProperties((store) => store.setIsLoading);
  const setAllProperties = useStoreProperties((store) => store.setProperties);

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
  const isValidSalary = salary.trim().length > 0 && !isNaN(Number(salary));
  const filteredProperties = useMemo(() => {
    if (allProperties.length === 0 || maxPropertyPrice === 0) return [];
    return allProperties.filter((prop) => {
      const md = prop.metadata;
      const price = md.prices ?? {};

      // solo se consideran las propiedades que esten en venta
      if (md.availability?.key !== PROPERTY_AVAILABILITY_KEYS.sale) {
        return false;
      }
      // solo se consideran las propiedades con un precio menor al precio maximo que el usuario puede pagar
      if (
        Number.isFinite(+maxPropertyPrice) &&
        (price.total ?? 0) > +maxPropertyPrice
      ) {
        return false;
      }

      return true;
    });
  }, [allProperties, maxPropertyPrice]);
  const messageToDisplay = (() => {
    if (!isValidSalary) return MESSAGES.noSalary;
    if (isLoading) return MESSAGES.loading;
    if (filteredProperties.length === 0) return MESSAGES.noResults;
    return null;
  })();
  return (
    <section className="flex flex-col items-center gap-6 w-full">
      {isValidSalary && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-gray-700">
            Con un salario de{" "}
            <strong>{UtilsFormat.asCurrency(Number(salary))}</strong>, podrías
            acceder a una cuota mensual de hasta{" "}
            <strong>{UtilsFormat.asCurrency(maxMonthlyPayment)}</strong>.
          </p>
          <p className="mt-2 text-gray-700">
            Eso te permitiría financiar un préstamo de aproximadamente{" "}
            <strong>{UtilsFormat.asCurrency(maxLoanAmount)}</strong>, lo que
            equivale a propiedades de hasta{" "}
            <strong>{UtilsFormat.asCurrency(maxPropertyPrice)}</strong> dando{" "}
            <strong>{UtilsFormat.asCurrency(maxLoanAmount * 0.1)}</strong> de
            prima.
          </p>
          <p className="text-gray-500 mt-2 text-[10px]">
            Este cálculo es solo una referencia. Contáctanos para obtener
            detalles especificos a tu caso.
          </p>
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] w-full gap-4">
        {filteredProperties.map((property) => (
          <PropertyCard property={property} key={property.slug} />
        ))}
      </div>
      {messageToDisplay != null && (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-2xl font-bold">{messageToDisplay.title}</h2>
          <p className="text-sm">{messageToDisplay.description}</p>
        </div>
      )}
    </section>
  );
};
