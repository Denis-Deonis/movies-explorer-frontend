export default function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <ul className="promo__list">
        <li>
          <a href="/#project" className="promo__link">
            О проекте
          </a>
        </li>
        <li>
          <a href="/#techno" className="promo__link">
            Технологии
          </a>
        </li>
        <li>
          <a href="/#student" className="promo__link">
            Студент
          </a>
        </li>
      </ul>
    </section>
  );
}
