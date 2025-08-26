import { Card } from "@heroui/card";

const StatCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="p-4">
    <div className="flex items-start gap-4">
      <div className="bg-purple-100 text-purple-700 p-3 rounded-lg mt-1">
        {icon}
      </div>
      <div className="w-full">
        <p className="text-gray-500 text-sm truncate">{title}</p>
        {children}
      </div>
    </div>
  </Card>
);

export default StatCard;
