import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  colorVariant?: "primary";
}

const colorVariants = {
  primary: {
    card: "bg-white border border-gray-100",
    title: "text-gray-600",
    count: "text-gray-900",
  },
  //TODO: Add more variants as needed
};

export default function Card({
  title,
  count,
  icon,
  colorVariant = "primary",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl shadow-lg p-6 border",
        colorVariants[colorVariant].card
      )}
    >
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              colorVariants[colorVariant].title
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              "text-2xl font-bold",
              colorVariants[colorVariant].count
            )}
          >
            {count}
          </p>
        </div>
      </div>
    </div>
  );
}
