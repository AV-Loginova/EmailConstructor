import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@store/store';
import { toggleTheme } from '@store/themeSlice';

import TranslationPage from '@pages/TranslationPage/TranslationPage';
import DragAndDropPage from '@pages/DragAndDropPage/DragAndDropPage';
import MainPage from '@pages/MainPage/MainPage';

import Toggle from '@ui/Toggle';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isDark = theme === 'dark';
  const handleOnChange = () => {
    dispatch(toggleTheme());
  };
  return (
    <div data-theme={`${theme === 'dark' ? 'dark' : 'light'}`}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/translate" element={<TranslationPage />} />
        <Route path="/dndtest" element={<DragAndDropPage />} />
      </Routes>
      <section className="absolute bottom-1 left-3">
        <Toggle
          onChange={handleOnChange}
          id="theme"
          isChecked={isDark}
          label={`${isDark ? 'Светлая' : 'Темная'} тема`}
        ></Toggle>
      </section>
    </div>
  );
};

export default App;
