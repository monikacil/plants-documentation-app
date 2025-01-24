import Link from "next/link";
import BasicButton from "../common/BasicButton";

type Props = {
  route: string;
};

export default function ActionButtons({ route }: Props) {
  return (
    <div className='flex gap-2'>
      <Link href={`${route}/edit`} scroll={false}>
        <BasicButton color='primary'>Edit</BasicButton>
      </Link>
      <Link href={`${route}/delete`} scroll={false}>
        <BasicButton color='danger'>Delete</BasicButton>
      </Link>
    </div>
  );
}
