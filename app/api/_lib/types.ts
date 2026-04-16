export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
}

export interface Donation {
  id: string;
  name: string;
  amount: number;
  message?: string;
  createdAt: string;
}

export interface HelpRequest {
  id: string;
  name: string;
  email: string;
  description: string;
  createdAt: string;
}
