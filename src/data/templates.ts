import { templateMarketing } from './templateMarketing';

export interface Template {
  id: number;
  name: string;
  title: string;
  value: string;
}

export const templates: Template[] = [
  {
    id: 1,
    name: 'marketing',
    title: 'Marketing template',
    value: templateMarketing,
  },
];
