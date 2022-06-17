import { useRouter } from 'next/router';

const SurveyDetail = () => {
  const router = useRouter();
  const { uid } = router.query;

  return <p>Survey: {uid}</p>;
};

export default SurveyDetail;
