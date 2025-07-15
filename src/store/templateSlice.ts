import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Template, templates } from '../shared/constants/templates';

interface TemplateState {
  templates: Template[];
}

const initialState: TemplateState = {
  templates,
};

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    addTemplate: (state, action: PayloadAction<Template>) => {
      state.templates.push(action.payload);
    },
    removeTemplate: (state, action: PayloadAction<number>) => {
      state.templates = state.templates.filter(
        (template) => template.id !== action.payload
      );
    },
    setTemplates: (state, action: PayloadAction<Template[]>) => {
      state.templates = action.payload;
    },
  },
});

export const { addTemplate, removeTemplate, setTemplates } =
  templatesSlice.actions;
export default templatesSlice.reducer;
