import Link from "next/link";

interface AuthFormLinkProps {
  question: string;
  linkText: string;
  href: string;
}

export const AuthFormLink = ({
  question,
  linkText,
  href
}: AuthFormLinkProps) => {
  return (
    <p className="text-center text-sm text-gray-500">
      {question}{" "}
      <Link
        href={href}
        className="font-medium text-indigo-600 hover:text-indigo-500"
      >
        {linkText}
      </Link>
    </p>
  );
};
