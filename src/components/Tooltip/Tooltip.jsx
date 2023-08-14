export default function Tooltip({ onClose, isSuccess, isUpdated }) {
  return (
    <div className={`popup ${!isSuccess ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{`${isUpdated ? 'Данные профиля изменены!' : 'На сервере произошла ошибка. Попробуйте ещё раз.'}`}</h2>
        <button type="button" className="popup__close-button" onClick={onClose}>
          ОК
        </button>
      </div>
    </div>
  );
}