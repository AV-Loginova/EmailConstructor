import { templateMarketing } from '@shared/templates/templateMarketing';
import { templateSales } from '@shared/templates/templateSales';
import { templateSystem } from '@shared/templates/templateSystem';

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
  {
    id: 3,
    name: 'sales',
    title: 'Sales template',
    value: templateSales,
  },
];
