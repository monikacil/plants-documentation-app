import Link from "next/link";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";

import BasicButton from "../common/BasicButton";
import Popover from "../common/Popover";

type Props = {
  route: string;
};

export default function ActionButtons({ route }: Props) {
  return (
    <div className="flex gap-2">
      <Link href={`${route}/edit`} scroll={false}>
        <Popover content={<p>Edit</p>}>
          <BasicButton color="primary" className="px-0">
            <FaPenToSquare />
          </BasicButton>
        </Popover>
      </Link>
      <Link href={`${route}/delete`} scroll={false}>
        <Popover content={<p>Delete</p>}>
          <BasicButton color="danger">
            <FaRegTrashCan />
          </BasicButton>
        </Popover>
      </Link>
    </div>
  );
}
