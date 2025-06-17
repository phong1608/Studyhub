import Link from "next/link";

interface ButtonProps {
  name: string;
  link: string
}
const Button = ({ name, link }: ButtonProps) => {
  return (
    <Link
      href={link}
      className={
        "hover:text-[#5755FE] rounded-lg px-6 py-3.5 text-lg "
      }
    >
      {name}
    </Link>
  );
};

export default Button;
