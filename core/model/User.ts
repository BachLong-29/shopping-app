export interface UserInfo {
  id: string;
  name: string;
  email: string;
  gender: Gender;
  avatar: string;
  birthdate: Date;
  role: Role;
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
