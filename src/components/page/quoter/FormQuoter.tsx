import { useEffect } from "react";
import Select from "src/components/global/fields/Select";
import Input from "src/components/global/fields/Input";
import useForm from "use-managed-form";
import {
  FINANCING_FUND_OPTIONS,
  FINANCING_FUND_PERCENTAGES,
  LOAN_TERM_OPTIONS,
} from "@lib/constants/quoter";
import { MainLinkAsButton } from "src/components/global/MainLinkAsButton";
import { WhatsappIcon } from "@icons/WhatsappIcon";
import PhoneIcon from "@icons/PhoneIcon";
import { useStoreQuoter } from "src/stores/useStoreQuoter";
import { useStoreProperties } from "src/stores/useStoreProperties";

export const FormQuoter = () => {
  const isLoading = useStoreProperties((store) => store.isLoading);

  const { form, salary, quotaPercentage, financingFund, loanTerm, onChange } =
    useForm({
      salary: "",
      quotaPercentage: "0.4",
      financingFund: FINANCING_FUND_OPTIONS[0].value,
      loanTerm: LOAN_TERM_OPTIONS[0].value,
    });
  const resetQuoteResult = useStoreQuoter((store) => store.reset);
  const setQuoteResult = useStoreQuoter((store) => store.setQuoteResult);

  useEffect(() => {
    const salaryNum = Number(salary);
    if (isNaN(salaryNum) || salaryNum <= 0) {
      resetQuoteResult();
      return;
    }

    const maxMonthlyPayment = salaryNum * Number(quotaPercentage);

    const annualRate =
      FINANCING_FUND_PERCENTAGES[
        financingFund as keyof typeof FINANCING_FUND_PERCENTAGES
      ] || 0.1;
    const monthlyRate = annualRate / 12;
    const numberOfPayments = Number(loanTerm) * 12;

    const maxLoanAmount =
      maxMonthlyPayment *
      ((Math.pow(1 + monthlyRate, numberOfPayments) - 1) /
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)));

    const minDownPayment = maxLoanAmount * 0.1;
    const maxPropertyPrice = maxLoanAmount + minDownPayment;

    setQuoteResult({
      maxMonthlyPayment,
      maxLoanAmount,
      maxPropertyPrice,
      salary,
    });
  }, [salary, quotaPercentage, financingFund, loanTerm]);

  return (
    <form className="flex flex-col gap-6">
      <Input
        id={form.salary.id}
        type="number"
        label="Salario mensual (USD)"
        placeholder="2000"
        value={form.salary.value}
        onChange={onChange}
        disabled={isLoading}
      />
      <Select
        id={form.quotaPercentage.id}
        label="Porcentaje máximo del salario a usar"
        options={[
          { label: "30%", value: "0.3" },
          { label: "35%", value: "0.35" },
          { label: "40% (recomendado)", value: "0.4" },
        ]}
        value={form.quotaPercentage.value}
        onChange={onChange}
        disabled={isLoading}
      />
      <Select
        id={form.financingFund.id}
        label="Fondo de financiamiento"
        options={FINANCING_FUND_OPTIONS}
        value={form.financingFund.value}
        onChange={onChange}
        disabled={isLoading}
      />
      <Select
        id={form.loanTerm.id}
        label="Plazo del préstamo"
        options={LOAN_TERM_OPTIONS}
        value={form.loanTerm.value}
        onChange={onChange}
        disabled={isLoading}
      />
      <div className="flex items-stretch">
        <MainLinkAsButton
          url={"/"}
          target="_blank"
          text="Contáctanos"
          className="flex-1 rounded-r-none"
          textClassName="flex items-center justify-center gap-2"
        >
          <WhatsappIcon size={"24"} />
        </MainLinkAsButton>
        <a
          href="tel:50497842424"
          className="bg-black rounded-r-xl px-6 text-white flex items-center"
        >
          <PhoneIcon size={"18"} />
        </a>
      </div>
    </form>
  );
};
