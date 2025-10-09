// File: backend/shared/utils/helpers.ts
interface Credential {
  name?: string;
  kubeConfig?: string;
  email?: string;
  metadata?: any;
}

export const isValidYaml = (str: string) => {
  // lightweight check — doesn't parse but checks for expected kubeconfig keys
  return /apiVersion|clusters|contexts|users|clusters:/m.test(str);
};

export const normalizeCredential = (input: Partial<Credential>): Partial<Credential> => {
  const out: Partial<Credential> = { ...input };
  if (input.name) out.name = String(input.name).trim();
  if (input.kubeConfig) out.kubeConfig = String(input.kubeConfig).trim();
  return out;
};

export const validateCredentialForCreate = (input: Partial<Credential>) => {
  const errors: string[] = [];
  if (!input.name || String(input.name).trim().length === 0) errors.push('name is required');
  if (!input.kubeConfig || String(input.kubeConfig).trim().length === 0) errors.push('kubeConfig is required');
  else if (!isValidYaml(String(input.kubeConfig))) errors.push('kubeConfig does not look like a kubeconfig');
  return errors;
};

export const parseWorkerId = (workerId?: string) => {
  if (!workerId) return null;
  const parts = workerId.split('-');
  return {
    raw: workerId,
    prefix: parts[0] || null,
    id: parts.slice(1).join('-') || null,
  };
};

export const nowISO = () => new Date().toISOString();
