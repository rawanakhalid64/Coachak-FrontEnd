import Image from "next/image";
import Navbar from "@/components/Navbar/nav";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-gray-50 to-purple-200">
        {/* Hero Section */}
        <section
  className="container mx-auto px-16 py-12 md:py-20 h-screen flex flex-col md:flex-row items-center gap-8 md:space-x-[40px]"
  style={{
    background: "linear-gradient(180deg, rgba(46, 13, 68, 0.243) 0%, rgba(224, 86, 136, 0.1215) 100%)",
  }}
>
  {/* Left Text */}
  <div className="flex-1 ml-0 md:ml-16">
    <h1 className="text-4xl md:text-[4rem] font-extrabold text-gray-900 leading-[110px]">
      Reach your <br />
      perfect body <br />
      shape using <br />
      our platform
    </h1>
    <p className="mt-4 text-gray-700 max-w-md">
      Coachak is a platform that will give you the opportunity to choose
      between joining us as a trainer or being a trainee and reach your
      goals.
    </p>
  </div>

  {/* Right Image */}
  <div className="flex-1">
    <Image
      src="https://res.cloudinary.com/dvgqyejfc/image/upload/v1730715397/victor-freitas-KIzBvHNe7hY-unsplash_1_a9j6cv.webp"
      alt="Lifting weights"
      width={590}
      height={390}
      className="rounded-lg shadow-lg"
    />
  </div>
</section>


        {/* Why Choosing Us Section */}
        <section className="bg-[#2E0D44] text-white px-16 py-12 md:py-20 h-screen flex flex-col items-center">
  {/* Section Title */}
  <h1 className="font-poppins font-semibold text-[52px] leading-[32px] text-center mb-12">
    Why Choosing Us?
  </h1>

  {/* Content Container */}
  <div className="container mx-auto px-6 flex flex-col md:flex-row items-center md:space-x-[40px] gap-y-8">
  {/* Left Image */}
  <div className="flex-1">
    <Image
      src="https://res.cloudinary.com/dvgqyejfc/image/upload/v1730715405/brooke-lark-nTZOILVZuOg-unsplash_1_v2l5em.webp"
      alt="Healthy foods"
      width={590}
      height={400}
      className="rounded-lg shadow-lg"
    />
  </div>

  {/* Right Text */}
  <div className="flex-1 md:ml-[40px]">
    <p className="text-[36px] font-normal leading-[43.2px] text-left font-poppins">
      We offer a wide variety of sports activities. With your subscription,
      you will receive a personalized training plan and a tailored nutrition
      plan designed to help you achieve your goals.
    </p>
  </div>
</div>

</section>

      </div>
    </>
  );
}
