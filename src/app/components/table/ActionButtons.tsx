import Link from "next/link";
import BasicButton from "../common/BasicButton";

export default function ActionButtons ({url}: {url: string}) {
  return (
    <div className="flex gap-2">
      <Link href={ `${ url }/edit` } scroll={ false }><BasicButton color="primary">Edit</BasicButton></Link>
      <Link href={ `${ url }/delete` } scroll={ false }><BasicButton color="danger">Delete</BasicButton></Link>
    </div>
  )
}