export interface CredentialRequest {
  email: string;
  credentialType: string;
  data: any;
}

export interface CredentialResponse {
  id: string;
  email: string;
  credentialType: string;
  workerId: string;
  issuedAt: Date;
}

export interface VerificationRequest {
  credentialId: string;
}

export interface VerificationResponse {
  valid: boolean;
  workerId?: string;
  timestamp?: Date;
  credential?: any;
}