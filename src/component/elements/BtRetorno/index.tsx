import { useRouter } from "next/router";
import { BsArrowLeftCircleFill } from "react-icons/bs";

export const BtmRetorno = (props: { Url: string }) => {
  const router = useRouter();
  return (
    <>
      <BsArrowLeftCircleFill
        color="blue"
        cursor={'pointer'}
        size={30}
        onClick={() => router.push(props.Url)}
      />
    </>
  );
};
