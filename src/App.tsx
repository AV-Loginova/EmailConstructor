import { RootState } from './store/store';
import { Route, Routes } from 'react-router-dom';
import Translate from './Translate/Translate';
import MainPage from './main/MainPage';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './store/themeSlice';
import Toggle from './components/Toggle';

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
        <Route path="/translate" element={<Translate />} />
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
