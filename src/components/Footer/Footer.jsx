export default function Footer() {
  function getYear() {
    return new Date().getFullYear();
  }

  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.
      </h2>
      <div className="footer__wrapper">
      <p className="footer__age">&copy;{getYear()}</p>
        <ul className="footer__list">
          <li>
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://github.com/Denis-Deonis"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
