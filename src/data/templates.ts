import { templateMarketing } from './templateMarketing';
import { templateSystem } from './templateSystem';

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
  {
    id: 2,
    name: 'system',
    title: 'System template',
    value: templateSystem,
  },
];
