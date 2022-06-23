import { useRouter } from 'next/router';

const SurveyDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Survey: {id}</p>;
};

export default SurveyDetail;
