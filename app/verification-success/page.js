'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

const VerificationSuccess = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/login"); // Navigate to the login page
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-3">Congratulations</h1>
      <Image src="/path-to-image.png" alt="Email Verified" width={500} height={500} />
      <p className="text-center mt-4">
        Your email is successfully verified. Please press continue to go to the login page.
      </p>
      <button
        onClick={handleContinue}
        className="flex items-center justify-center mt-4 w-1/3 py-3 font-semibold text-white bg-[#2E0D44] rounded-md"
      >
        Continue
      </button>
    </div>
  );
};

export default VerificationSuccess;
