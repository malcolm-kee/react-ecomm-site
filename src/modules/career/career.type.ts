export type Job = {
  _id: string;
  title: string;
  department: string;
  level: 'internship' | 'entry' | 'experienced' | 'manager';
  summary: string;
  descriptions: string[];
  requirements: string[];
};
