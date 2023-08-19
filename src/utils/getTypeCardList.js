const getTypeCardList = ({ width }) => {
  let settingContainer = null;

  if (width < 653) {
    return settingContainer = {loadCards: 5, moreCards: 2}
  } else if (width >= 653 && width < 1151) {
    return settingContainer = {loadCards: 8, moreCards: 2}
  } else if (width > 1151) {
    return settingContainer = {loadCards: 12, moreCards: 3}
  }

  return settingContainer
}

export default getTypeCardList;
