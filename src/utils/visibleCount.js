
export const getVisibleCount = () => {
  const width = window.innerWidth;
  if (width < 653) {
    return {loadCards: 5, moreCards: 2}
  } else if (width >= 653 && width < 768) {
    return {loadCards: 8, moreCards: 2}
  } else if (width > 768) {
    return {loadCards: 12, moreCards: 3}
  }
}

