import type { Donation, HelpRequest, PublicUser, User } from "./types";

const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@gmail.com",
    password: "123456",
  },
];

const donations: Donation[] = [];
const requests: HelpRequest[] = [];

function publicUser(user: User): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export function getUsers(): PublicUser[] {
  return users.map(publicUser);
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function createUser(name: string, email: string, password: string): PublicUser {
  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
  };

  users.push(newUser);
  return publicUser(newUser);
}

export function verifyUser(email: string, password: string): PublicUser | null {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) return null;
  return publicUser(user);
}

export function getDonations(): Donation[] {
  return donations;
}

export function addDonation(data: Omit<Donation, "id" | "createdAt">): Donation {
  const donation: Donation = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };

  donations.push(donation);
  return donation;
}

export function getRequests(): HelpRequest[] {
  return requests;
}

export function addRequest(data: Omit<HelpRequest, "id" | "createdAt">): HelpRequest {
  const request: HelpRequest = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };

  requests.push(request);
  return request;
}
