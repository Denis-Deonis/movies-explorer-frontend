import SectionTitle from "../SectionTitle/SectionTitle";
import  {DATE_BIRTH}  from "../../../utils/constants";
import {convertDurationTitle} from "../../../utils/duration";
import myPhoto from "./my_photo.png";

export default function Student() {
  const getAge = ({ birthDate, dateTitles }) => {
    const nowDate = new Date(),
          addOne = nowDate.getMonth() - birthDate.getMonth() >= 0
            && nowDate.getDate() - birthDate.getDate() >= 0,
          diff = nowDate.getFullYear() - birthDate.getFullYear(),
          res = diff - 1 + (addOne ? 1 : 0);

    return convertDurationTitle(res, dateTitles);
  };

  return (
    <section id="student" className="student">
      <SectionTitle title="Студент" />
      <div className="student__wrapper">
        <div className="student__column">
          <h3 className="student__title">Денис Зыков</h3>
          <p className="student__subtitle">
            Фронтенд-разработчик, {getAge(DATE_BIRTH)}
          </p>
          <p className="student__text">
            Системный администратор в школе. Фронтенд-разработка моё хобби. С
            2022 года занимаюсь веб разработкой. Люблю верстать сайты так, как в
            эти моменты чувствую себя творцом.
          </p>
          <p className="student__text">
            Стараюсь постоянно изучать новое: делаю дополнительные проекты на
            курсах, решаю задачки на Codewars. Читаю дополнительные источники,
            мои любимые: learn.javascript.ru, регулярные новости фронтенда на
            Хабре от HTML Academy, классные статьи от CSS Tricks или Josh
            Comeau.
          </p>
          <p className="student__link">
            <a
              className="student__link_text"
              href="https://github.com/Denis-Deonis"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              className="student__link_text"
              href="https://www.codewars.com/users/Denis-Deonis"
              target="_blank"
              rel="noopener noreferrer"
            >
              Codewars
            </a>
          </p>
        </div>
        <img
          className="student__photo"
          alt="Я на форуме в VR-очках"
          src={myPhoto}
        />
      </div>
    </section>
  );
}
