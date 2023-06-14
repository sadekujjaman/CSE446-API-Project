export enum Status {
  Running = "running",
  Finished = "finished",
}

export type Bank = {
  id: string;
  name: string;
  secret: string;
  accountNo: string;
};

export type UserInfo = {
  name: string;
  email: string;
  contactNo?: string;
  address?: string;
};

export type User = {
  accountName?: string;
  accountNo?: string;
  secret?: string;
  balance?: number;
  isSupplier?: boolean;
} & UserInfo;

export type Address = {
  city?: string;
  area?: string;
  houseNo?: string;
  phone?: string;
};

export type Order = {
  orderId?: string;
  address?: Address;
  products?: { count: number; product: Product }[];
  transactionId: string;
  amount: number;
  status?: string;
  orderAt?: Date;
  deliveredAt?: Date;
};

export type StudentInfo = {
  id: string | number;
  userId: string | number; // userId
  name: string;
  session?: string;
  registrationNo?: string;
};

export type Student = {
  projects?: Project[];
  courses?: Course[];
} & StudentInfo;

export type ProjectInfo = {
  id: string | number;
  courseId: string | number; // course id
  title: string;
  summary: string;
  content: string;
  active: boolean;
  url?: string | null;
  updatedAt?: string;
  completionDate?: string;
  team?: string | number; // team id
};

export type Product = {
  id: string | number;
  _id?: string | number;
  supplierId?: string | number; // supplier id
  name: string;
  description: string;
  category?: string;
  price?: number;
};

export type Project = {
  courseInfo?: CourseInfo;
  teamInfo?: TeamInfo;
  reviews?: Review[]; // reviews id
} & ProjectInfo;

export interface Review {
  id: number | string;
  userId: number | string;
  userName: string;
  message: string;
}

export type SupplierInfo = {
  id: string | number;
  name: string;
  description: string;
};

export type CourseInfo = {
  id: string | number;
  name: string;
  code: string;
  session: string;
  credit: string;
  description: string;
  joiningCode?: string;
};

export type Course = {
  teachers?: Teacher[];
  projects?: Project[];
  students?: StudentInfo[];
} & CourseInfo;

export type TeacherInfo = {
  id: string | number;
  userId: string | number;
  name: string;
  designation: string;
};

export type Teacher = {
  courses?: Course[];
  projects?: Project[];
} & TeacherInfo;

export interface TeamInfo {
  name: string;
  authors: AuthorData[];
}

export interface AuthorData {
  id: string | number;
  name: string;
}

export interface AutoCompleteData {
  title: string;
  id?: string | number;
}

export interface Team {
  id: string | number;
  name: string;
  members: Array<string>;
}

export type ProjectCreateInfo = {
  id: string | number;
  courseId: string | number; // course id
  title: string;
  summary: string;
  content: string;
  active: boolean;
  url?: string | null;
  updatedAt?: string;
  completionDate?: string;
  teamName?: string;
  members?: Student[];
};
