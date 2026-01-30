export type Schedule = {
  schedule_id: string;
  date: string;
};

export type ClassData = {
  name: string;
  mentor?: {
    name: string;
  };
  schedules: Schedule[];
};

export type Enrollment = {
  class: ClassData;
};
