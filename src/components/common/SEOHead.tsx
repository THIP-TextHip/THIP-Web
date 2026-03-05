import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
}

const DEFAULT_TITLE = 'THIP, 독서를 기록하는 가장 힙한 방법';
const DEFAULT_DESC = '커뮤니티형 독서 기록 플랫폼 THIP';

const SEOHead = ({ title, description }: SEOHeadProps) => {
  const fullTitle = title ? `${title} - THIP` : DEFAULT_TITLE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description ?? DEFAULT_DESC} />
    </Helmet>
  );
};

export default SEOHead;
