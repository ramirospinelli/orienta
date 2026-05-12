import { env } from "@/shared/config/env";

const defaultMessage =
  "Hola, quiero conversar sobre los resultados de Orienta y solicitar un turno.";

export function getProfessionalWhatsappUrl(message = defaultMessage) {
  const normalizedPhone = env.whatsappNumber.replace(/\D/g, "");

  if (!normalizedPhone) {
    return "";
  }

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
