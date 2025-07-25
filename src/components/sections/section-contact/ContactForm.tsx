import React, { useRef } from "react";
import Input from "src/components/global/fields/Input";
import Select from "src/components/global/fields/Select";
import Textarea from "src/components/global/fields/Textarea";
import MainButton from "src/components/global/MainButton";
import { UtilsFormat } from "@lib/utils/UtilsFormat";
import { toast } from "sonner";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export default function ContactForm() {
  const refUserPhoneIntlInstance = useRef<any | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      name: string;
      phone: string;
      email: string;
      clientType?: string;
      purpose?: string;
      message?: string;
    };
    const userPhone = refUserPhoneIntlInstance.current;
    const countryData = userPhone?.getSelectedCountryData();
    const rawPhone = data.phone;

    if (!userPhone || !countryData || !rawPhone) {
      toast.error("Número de teléfono inválido");
      return;
    }

    const fullPhone = `+${countryData.dialCode}${rawPhone.replace(/\s+/g, "")}`;
    const phoneNumber = parsePhoneNumberFromString(fullPhone);

    if (!phoneNumber || !phoneNumber.isValid()) {
      toast.error("Número de teléfono inválido");
      return;
    }

    const formattedData = {
      ...data,
      name: UtilsFormat.capitalize(data.name),
      email: data.email.trim().toLowerCase(),
      phone: phoneNumber.number,
    };
  };

  return (
    <form
      className="w-full flex-1"
      data-id="contact-form"
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl md:text-5xl font-bold md:leading-[3rem] mb-5">
        Agenda una <span className="text-harvest-gold-600">cita</span>
      </h2>
      <p className="text-black-600 max-w-[800px] sm:text-lg md:text-xl mb-10 lg:mb-14">
        Nuestros agentes están listos para ayudarte en todo lo que necesites,
        agenda una cita y te ayudaremos a encontrar la mejor solución para tus
        necesidades.
      </p>

      <div className="flex flex-col gap-6 mb-4">
        <Input id="name" label="Nombre" placeholder="Jorge Sigüenza" required />
        <Input
          id="phone"
          type="tel"
          label="Teléfono"
          refIntlInputInstance={refUserPhoneIntlInstance}
          required
        />
        <Input
          id="email"
          type="email"
          label="Correo electrónico"
          placeholder="jorge@gmail.com"
          required
        />
        <Select
          id="clientType"
          label="Tipo de cliente"
          options={[
            { value: "particular", label: "Particular" },
            { value: "inversionista", label: "Inversionista" },
          ]}
        />
        <Select
          id="purpose"
          label="Objetivo de la cita"
          options={[
            { value: "vender", label: "Vender" },
            { value: "rentar", label: "Rentar" },
            { value: "comprar", label: "Comprar" },
            { value: "asesoria", label: "Asesoría" },
            { value: "otro", label: "Otro" },
          ]}
        />
        <Textarea
          id="message"
          label="Comentario adicional"
          placeholder="Quiero adquirir un terreno para construir mi hogar"
        />
      </div>

      <MainButton text="Agendar ahora" className="ml-auto" type="submit" />
    </form>
  );
}
