import type { TypeCosmicProperty } from "@lib/types/Database";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "src/components/global/fields/Select";
import useForm from "use-managed-form";
import { UtilsFormat } from "@lib/utils/UtilsFormat";

const financingFundOptions = [
  {
    label: "BANHPROVI - Vivienda social (≈ 4% anual)",
    value: "banhprovi_social",
  },
  {
    label: "BANHPROVI - Clase media (≈ 7% anual)",
    value: "banhprovi_media",
  },
  {
    label: "Fondos propios / Banco privado (≈ 8-9% anual)",
    value: "fondos_propios",
  },
  { label: "RAP (≈ 10% anual)", value: "rap" },
];
const financingFundPercentages = {
  rap: 0.1,
  banhprovi_social: 0.04,
  banhprovi_media: 0.07,
  fondos_propios: 0.085,
};
const loanTermOptions = [
  { label: "30 años", value: "30" },
  { label: "25 años", value: "25" },
  { label: "20 años", value: "20" },
  { label: "15 años", value: "15" },
  { label: "10 años", value: "10" },
  { label: "5 años", value: "5" },
];
export const PropertyQuoter = ({
  property,
}: {
  property: TypeCosmicProperty;
}) => {
  const totalPrice = property.metadata.prices.total;
  const minDownPayment = totalPrice * 0.1;

  const { form, financingFund, loanTerm, downPayment, onChange, setValue } =
    useForm({
      financingFund: financingFundOptions[0].value,
      loanTerm: loanTermOptions[0].value,
      downPayment: minDownPayment,
    });
  const [quoteDetails, setQuoteDetails] = useState({
    requiredSalary: 0,
    monthlyPayment: 0,
  });
  useEffect(() => {
    if (isNaN(downPayment)) return;
    const financedAmount = totalPrice - form.downPayment.value;
    const annualRate =
      financingFundPercentages[
        financingFund as keyof typeof financingFundPercentages
      ] || 0.1;
    const monthlyRate = annualRate / 12;
    const numberOfPayments = Number(loanTerm) * 12;

    const monthlyPayment =
      (financedAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const requiredSalary = monthlyPayment / 0.4;
    setQuoteDetails({
      requiredSalary,
      monthlyPayment,
    });
  }, [financingFund, loanTerm, downPayment]);
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="downPayment" className="font-semibold">
          Prima (Down Payment): ${form.downPayment.value.toLocaleString()}
        </label>
        <Slider
          min={minDownPayment}
          max={totalPrice}
          step={5000}
          value={form.downPayment.value}
          onChange={(value) => setValue(form.downPayment.id, Number(value))}
          trackStyle={{ backgroundColor: "#c58700", height: 6 }}
          handleStyle={{
            borderColor: "#c58700",
            backgroundColor: "#c58700",
            height: 20,
            width: 20,
            marginTop: -7,
          }}
          railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
        />

        <div className="text-sm text-gray-500">
          Monto total de la propiedad: ${totalPrice.toLocaleString()}
        </div>
      </div>

      <Select
        id={form.financingFund.id}
        label="Fondo de financiamiento"
        options={financingFundOptions}
        value={form.financingFund.value}
        onChange={onChange}
      />

      <Select
        id={form.loanTerm.id}
        label="Plazo del préstamo"
        options={loanTermOptions}
        value={form.loanTerm.value}
        onChange={onChange}
      />
      {!isNaN(quoteDetails.monthlyPayment) &&
        quoteDetails.monthlyPayment > 0 && (
          <>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-gray-600">
                La cuota mensual proyectada es de{" "}
                <strong>
                  {UtilsFormat.asCurrency(quoteDetails.monthlyPayment)}
                </strong>
                , lo que sugiere un ingreso mínimo recomendado de{" "}
                <strong>
                  {UtilsFormat.asCurrency(quoteDetails.requiredSalary)} al mes
                </strong>
                .
              </p>
              <p className="text-gray-500 mt-2 text-[10px]">
                Este cálculo es solo una referencia. Asesorate con nuestros
                agentes para encontrar una propiedad que se ajuste mejor a ti.
              </p>
            </div>
          </>
        )}
    </form>
  );
};
