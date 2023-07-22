import SectionTitle from "../SectionTitle/SectionTitle";
import { birthDate } from '../../../utils/constants.js';
import getEndLine from '../../../utils/getEndLine.js';
import myPhoto from '../../../images/my_photo.png';

export default function Student() {
  function getAge({ birthDate, dateTitles }) {
    const nowDate = new Date(),
      addOne =
        nowDate.getMonth() - birthDate.getMonth() >= 0 &&
        nowDate.getDate() - birthDate.getDate() >= 0,
      diff = nowDate.getFullYear() - birthDate.getFullYear(),
      res = diff - 1 + (addOne ? 1 : 0);

    return getEndLine(res, dateTitles);
  }

  return (
    <section id="student" className="student">
      <SectionTitle title="Студент" />
      <div className="student__wrapper">
        <div className="student__column">
          <h3 className="student__title">Денис Зыков</h3>
          <p className="student__subtitle">
            Фронтенд-разработчик, {getAge(birthDate)}
          </p>
          <p className="student__text">
            Системный администратор в школе. Фронтенд-разработка моё хобби. С 2022 года занимаюсь веб разработкой.
            Люблю верстать сайты так, как в эти моменты чувствую себя творцом.
          </p>
          <a
            href="https://github.com/Denis-Deonis"
            target="_blank"
            rel="noopener noreferrer"
            className="student__link"
          >
            Github
          </a>
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
