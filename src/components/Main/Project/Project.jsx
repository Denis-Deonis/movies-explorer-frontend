import SectionTitle from '../SectionTitle/SectionTitle';

export default function Project() {
  return (
    <section
      id="project"
      className="project">
      <SectionTitle title="О проекте"/>
      <ul className="project__list">
        <li>
          <h3 className="project__title">
            Дипломный проект включал 5&nbsp;этапов
          </h3>
          <p className="project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
          </p>
        </li>
        <li>
          <h3 className="project__title">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </h3>
          <p className="project__text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="project__steps">
        <p className="project__week project__week_accent">
          1 неделя
        </p>
        <p className="project__week">
          4 недели
        </p>
        <p className="project__week-signature">Back-end</p>
        <p className="project__week-signature">Front-end</p>
      </div>
    </section>
  )
}
