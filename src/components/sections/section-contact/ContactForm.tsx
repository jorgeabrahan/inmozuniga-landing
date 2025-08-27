import React, { useRef, useState } from "react";
import Input from "src/components/global/fields/Input";
import Select from "src/components/global/fields/Select";
import Textarea from "src/components/global/fields/Textarea";
import MainButton from "src/components/global/MainButton";
import { UtilsFormat } from "@lib/utils/UtilsFormat";
import { toast } from "sonner";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export default function ContactForm() {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const refForm = useRef<HTMLFormElement | null>(null);
  const refUserPhoneIntlInstance = useRef<any | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    setIsSendingEmail(true);
    try {
      const response = await fetch("https://formspree.io/f/mpwjwpra", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        toast.success("¡Tu mensaje fue enviado con éxito!");
        refForm.current?.reset();
      } else {
        toast.error("Error al enviar el mensaje");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error de red al enviar el mensaje");
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <form
      className="w-full flex-1"
      data-id="contact-form"
      onSubmit={handleSubmit}
      ref={refForm}
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
          disabled={isSendingEmail}
          required
        />
        <Input
          id="email"
          type="email"
          label="Correo electrónico"
          placeholder="jorge@gmail.com"
          disabled={isSendingEmail}
          required
        />
        <Select
          id="clientType"
          label="Tipo de cliente"
          options={[
            { value: "particular", label: "Particular" },
            { value: "inversionista", label: "Inversionista" },
          ]}
          disabled={isSendingEmail}
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
          disabled={isSendingEmail}
        />
        <Textarea
          id="message"
          label="Comentario adicional"
          placeholder="Quiero adquirir un terreno para construir mi hogar"
          disabled={isSendingEmail}
        />
      </div>

      <MainButton
        text="Agendar ahora"
        className="ml-auto"
        type="submit"
        disabled={isSendingEmail}
      />
    </form>
  );
}
