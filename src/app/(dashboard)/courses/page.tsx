import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="min-h-[80vh] text-white flex items-center justify-center p-8">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Courses
        </h1>

        <p className="text-xl text-purple-200/90 mb-6">
          Your learning journey starts here! 📖
        </p>

        <Link href="/courses/create">
          <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Create New Course
          </Button>
        </Link>
      </div>
    </div>
  );
}
