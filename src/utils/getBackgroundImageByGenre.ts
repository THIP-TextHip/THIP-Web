import artBackground from '../assets/genre/artBackground.svg';
import humanityBackground from '../assets/genre/humanityBackground.svg';
import ScienceITBackground from '../assets/genre/ScienceITBackground.svg';
import literatureBackground from '../assets/genre/literatureBackground.svg';
import socialScienceBackground from '../assets/genre/socialScienceBackground.svg';

export const getBackgroundImageByGenre = (genre: string): string => {
  switch (genre) {
    case '문학':
      return literatureBackground;
    case '사회과학':
      return socialScienceBackground;
    case '과학•IT':
      return ScienceITBackground;
    case '예술':
      return artBackground;
    case '인문학':
      return humanityBackground;
    default:
      return literatureBackground;
  }
};
