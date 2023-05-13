import { useRouter } from "next/navigation";
import { BsArrowLeftCircleFill } from "react-icons/bs";


export const BtmBack = (props: { Url?: any }) => {
  const { push, back } = useRouter();

  const redirect = () => {
    if (props.Url) {
      push(props.Url)
    } else {
      back();
    }
  }

  return (
    <>
      <BsArrowLeftCircleFill
        color="blue"
        cursor={'pointer'}
        size={30}
        onClick={redirect}
      />
    </>
  );
};
