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
