// Simulated auth context — email domain → CRM client mapping

export interface ClientAuthContext {
  email: string;
  domain: string;
  crmClient: string | null;
  allowed: boolean;
}

const domainMap: Record<string, string> = {
  "entel.cl": "ENTEL",
  "f1.services": "ENTEL",
  "movistar.cl": "MOVISTAR",
  "claro.cl": "CLARO",
  "wom.cl": "WOM",
  "mpe.cl": "MPE",
};

const allowedDomains = Object.keys(domainMap);

export function resolveClientAuth(email: string): ClientAuthContext {
  const domain = email.split("@")[1]?.toLowerCase() || "";
  const crmClient = domainMap[domain] || null;
  return {
    email,
    domain,
    crmClient,
    allowed: !!crmClient,
  };
}

export function getSimulatedEmail(): string {
  return "usuario@entel.cl";
}

export { domainMap, allowedDomains };
