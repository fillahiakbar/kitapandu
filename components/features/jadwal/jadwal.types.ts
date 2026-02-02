export type schedules = {
  schedule_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
};

export type ClassData = {
  name: string;
  mentor: {
    name: string;
  };
  schedules: schedules[];
};

export type Enrollment = {
  class: ClassData;
};
