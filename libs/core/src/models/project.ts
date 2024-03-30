export interface Project {
  title: string;
  name: string;
  dueDate: Date;
  startDate: Date;
  status: string;

  country: string;
  city: string;
  street: string;
  streetNumber?: string;

  description: string;
  employers: [];
  employees: [];
}
