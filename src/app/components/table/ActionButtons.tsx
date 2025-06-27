import Link from "next/link";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";

import { Button } from "../ui/Button";
import { Popover } from "../common/Popover";

type Props = {
  route: string;
};

export function ActionButtons({ route }: Props) {
  return (
    <div className='flex gap-2'>
      <Link
        href={ `${ route }/edit` }
        scroll={ false }
      >
        <Popover content={ <p>Edit</p> }>
          <Button
            color='primary'
            className='px-2'
          >
            <FaPenToSquare />
          </Button>
        </Popover>
      </Link>
      <Link
        href={ `${ route }/delete` }
        scroll={ false }
      >
        <Popover content={ <p>Delete</p> }>
          <Button
            color='danger'
            className='px-2'
          >
            <FaRegTrashCan />
          </Button>
        </Popover>
      </Link>
    </div>
  );
}
