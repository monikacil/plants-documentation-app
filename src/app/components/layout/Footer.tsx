import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-transparent w-full flex-none py-3 flex flex-col text-xs text-center border border-t-1 border-x-0 border-b-0 ">
      <Image
        className="self-center"
        src="/images/logo.png"
        width={200}
        height={30}
        alt="Logo"
      />
      <p className="py-2">© 2024 Plants Documentation created by Monika Cilińska</p>
    </footer>
  );
}