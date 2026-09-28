import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
      <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
      <p className="text-gray-600 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}
