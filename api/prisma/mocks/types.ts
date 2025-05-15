import { USER_TYPE } from "@prisma/client";

export interface User {
  id: number;
  name: string;
  email: string;
  type: USER_TYPE;
  birthDay: string;
  signatureImage?: string;
  logo?: string;
  address: string;
}

export interface Therapy {
  id: number;
  title: string;
  description: string;
}
