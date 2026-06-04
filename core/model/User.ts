export interface UserPreferences {
  theme: string;
  language: string;
  orderUpdates: boolean;
  productNews: boolean;
  marketingEmails: boolean;
  publicProfile: boolean;
  showActivity: boolean;
  searchable: boolean;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  gender: Gender;
  avatar?: string;
  birthdate: Date;
  role: Role;
  address: string;
  phone: string;
  bio?: string;
  username?: string;
  title?: string;
  nationality?: string;
  phone2?: string;
  emergency?: string;
  languages?: string[];
  timezone?: string;
  district?: string;
  state?: string;
  city?: string;
  postal?: string;
  country?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  preferences?: UserPreferences;
}

export enum Role {
  User = "user",
  Seller = "seller",
  Admin = "admin",
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
