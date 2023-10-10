import { Specialization } from "../Specializations/Specialization";

export interface Class {
  id: number;
  name: string;
  specs: Specialization[];
  image: string;
}
