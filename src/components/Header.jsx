"use client";
import { AiOutlineCloud } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
      router.push("/authentication");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const goToDashboard = () => {
    router.push("/");
  };

  return (
    <header className="w-full bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2 text-2xl cursor-pointer" onClick={goToDashboard}>
          <AiOutlineCloud className="text-white" />
          <span className="text-white font-semibold">skyDrive</span>
        </div>
        <button onClick={handleLogout} className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 text-sm font-medium" > Logout </button>
      </div>
    </header>
  );
}
