import type { CustomerData } from "./customer";

export type Training = {
  id: number;
  date: string;
  duration: number;
  activity: string;
};

// Row from /gettrainings: a training with its customer included.
export type TrainingWithCustomer = Training & {
  customer: (CustomerData & { id: number }) | null;
};

// Body for POST /trainings
export type TrainingData = {
  date: string; // ISO-8601
  activity: string;
  duration: number; // minutes
  customer: string; // the customer's _links.self.href
};
