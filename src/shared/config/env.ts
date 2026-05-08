type RawEnv = ImportMetaEnv & {
  readonly VITE_OWNER_EMAIL?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
};

const rawEnv = import.meta.env as RawEnv;

function normalize(value?: string) {
  const trimmed = value?.trim();

  return trimmed ? trimmed : "";
}

export const env = {
  ownerEmail: normalize(rawEnv.VITE_OWNER_EMAIL),
  emailjsServiceId: normalize(rawEnv.VITE_EMAILJS_SERVICE_ID),
  emailjsTemplateId: normalize(rawEnv.VITE_EMAILJS_TEMPLATE_ID),
  emailjsPublicKey: normalize(rawEnv.VITE_EMAILJS_PUBLIC_KEY),
  whatsappNumber: normalize(rawEnv.VITE_WHATSAPP_NUMBER),
} as const;

export const envStatus = {
  emailConfigured: Boolean(
    env.ownerEmail && env.emailjsServiceId && env.emailjsTemplateId && env.emailjsPublicKey,
  ),
  whatsappConfigured: Boolean(env.whatsappNumber),
} as const;
