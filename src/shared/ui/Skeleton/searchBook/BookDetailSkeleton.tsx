import Skeleton from '../base/Skeleton';
import {
  BannerSection,
  BookInfo,
  Intro,
  ButtonSection,
  RecruitingGroupButton,
  RightArea,
  WritePostButton,
  SaveButton,
} from '@/pages/searchBook/SearchBook.styled';

const BookDetailSkeleton = () => {
  return (
    <BannerSection>
      <BookInfo>
        <Skeleton.Text width={200} height={24} />
        <div>
          <Skeleton.Text width={150} height={14} />
        </div>
      </BookInfo>

      <Intro style={{ cursor: 'default', marginTop: '20px' }}>
        <Skeleton.Text width={40} height={14} />
        <div>
          <Skeleton.Text lines={2} height={12} gap={8} />
        </div>
      </Intro>

      <ButtonSection>
        <RecruitingGroupButton
          disabled
          style={{ cursor: 'default', pointerEvents: 'none', marginTop: '5px' }}
        >
          <Skeleton.Text width={120} height={14} />
        </RecruitingGroupButton>
        <RightArea>
          <WritePostButton disabled style={{ cursor: 'default', pointerEvents: 'none' }}>
            <Skeleton.Text width={80} height={14} />
          </WritePostButton>
          <SaveButton disabled style={{ cursor: 'default', pointerEvents: 'none' }}>
            <Skeleton.Box width={24} height={24} />
          </SaveButton>
        </RightArea>
      </ButtonSection>
    </BannerSection>
  );
};

export default BookDetailSkeleton;
