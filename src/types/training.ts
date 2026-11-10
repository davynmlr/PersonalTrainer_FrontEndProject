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
