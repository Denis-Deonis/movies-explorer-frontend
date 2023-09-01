import { NavLink, useNavigate } from 'react-router-dom';

export default function Page404() {
  const navigate = useNavigate();
  const handleClickComeBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <main className="page404">
      <h1 className="page404__title">404</h1>
      <p className="page404__subtitle">Страница не найдена</p>
      <NavLink to="#" className="page404__link" onClick={handleClickComeBack}>
        Назад
      </NavLink>
    </main>
  );
}
