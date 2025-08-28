import type { TypeCosmicProperty } from "@lib/types/Database";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "src/components/global/fields/Select";
import useForm from "use-managed-form";
import { UtilsFormat } from "@lib/utils/UtilsFormat";
import {
  FINANCING_FUND_OPTIONS,
  FINANCING_FUND_PERCENTAGES,
  LOAN_TERM_OPTIONS,
} from "@lib/constants/quoter";

export const FormPropertyQuoter = ({
  property,
}: {
  property: TypeCosmicProperty;
}) => {
  const totalPrice = property.metadata.prices.total;
  const minDownPayment = totalPrice * 0.1;

  const { form, financingFund, loanTerm, downPayment, onChange, setValue } =
    useForm({
      financingFund: FINANCING_FUND_OPTIONS[0].value,
      loanTerm: LOAN_TERM_OPTIONS[0].value,
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
      FINANCING_FUND_PERCENTAGES[
        financingFund as keyof typeof FINANCING_FUND_PERCENTAGES
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
        <div className="px-2">
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
        </div>
        <div className="text-sm text-gray-500">
          Monto total de la propiedad: ${totalPrice.toLocaleString()}
        </div>
      </div>

      <Select
        id={form.financingFund.id}
        label="Fondo de financiamiento"
        options={FINANCING_FUND_OPTIONS}
        value={form.financingFund.value}
        onChange={onChange}
      />

      <Select
        id={form.loanTerm.id}
        label="Plazo del préstamo"
        options={LOAN_TERM_OPTIONS}
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
