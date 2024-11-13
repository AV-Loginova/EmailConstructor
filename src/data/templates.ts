import { HTMLtemplateEn } from './templateEn';
import { HTMLtemplateEnWithFooter } from './templateEnWithFooter';
import { HTMLtemplate } from './templateWithHtml';
import { HTMLtemplateNewFooter } from './templateNewFooter';
import { templateWithNewFooterV2 } from './templateEnWithNewFooterV2';
import { HTMLtemplateEsWithNoFooter } from './templateEsWithNoFooter';
import { HTMLtemplateEnWithNoFooter } from './templateEnWithNoFooter';
import { HTMLtemplatePtWithNoFooter } from './templatePtWithNoFooter';
import { HTMLtemplateEnLastVerFooter } from './templateEnLastVerFooter';

export interface Template {
  id: number;
  name: string;
  title: string;
  value: string;
}

export const templates: Template[] = [
  {
    id: 1,
    name: 'footerKommo',
    title: 'Template with support footer',
    value: HTMLtemplateEnWithFooter,
  },
  {
    id: 2,
    name: 'footerLogo',
    title: 'Template with logos footer',
    value: HTMLtemplateEn,
  },
  {
    id: 3,
    name: 'withHead',
    title: 'Template head and body',
    value: HTMLtemplate,
  },
  {
    id: 4,
    name: 'newFooter',
    title: 'Template with new footer',
    value: HTMLtemplateNewFooter,
  },
  {
    id: 5,
    name: 'newFooterV2',
    title: 'Template with new footer v2',
    value: templateWithNewFooterV2,
  },
  {
    id: 6,
    name: 'noFooterEs',
    title: 'Template with no footer ES',
    value: HTMLtemplateEsWithNoFooter,
  },
  {
    id: 7,
    name: 'noFooterEn',
    title: 'Template with no footer EN',
    value: HTMLtemplateEnWithNoFooter,
  },
  {
    id: 8,
    name: 'noFooterPt',
    title: 'Template with no footer PT',
    value: HTMLtemplatePtWithNoFooter,
  },
  {
    id: 9,
    name: 'lastVerFooter',
    title: 'LAST VER FOOTER',
    value: HTMLtemplateEnLastVerFooter,
  },
];
