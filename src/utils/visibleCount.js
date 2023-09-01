export const getVisibleCount = () => {
  const width = window.innerWidth;
  if (width < 653) {
    return {loadCards: 5, moreCards: 2}
  } else if (width >= 653 && width < 767) {
    return {loadCards: 8, moreCards: 2}
  } else if (width >= 767 && width < 1200) {
    return {loadCards: 8, moreCards: 2}
  } else if (width >= 1200) {
    return {loadCards: 12, moreCards: 3}
  }
}

