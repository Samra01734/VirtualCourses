import React, { useEffect, useRef } from 'react'
import {
  FaArrowRight,
  FaLaptopCode,
  FaUserGraduate,
  FaBookOpen,
  FaCertificate,
  FaChalkboardTeacher,
  FaGlobe,
  FaClock,
  FaProjectDiagram
} from 'react-icons/fa'

function ExploreCourses() {

  const cardsRef = useRef([])
  const btnRef = useRef(null)

  // 🍎 Smooth Scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
  }, [])

  // 🧊 3D TILT
  useEffect(() => {
    cardsRef.current.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const rotateX = (y - rect.height / 2) / 15
        const rotateY = (rect.width / 2 - x) / 15

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`
      })
    })
  }, [])

  // 🧲 Magnetic Button
  useEffect(() => {
    const btn = btnRef.current

    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
    })

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0,0)"
    })
  }, [])

  return (
    <div className="bg-[#f6f6f7] relative overflow-hidden">

      {/* 🧊 Noise Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative z-10 w-full min-h-[90vh] flex flex-col lg:flex-row items-center gap-12 px-[20px] md:px-[60px] py-[100px]">

        {/* LEFT */}
        <div className="w-full lg:w-[45%]">

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200">

            <h2 className="text-gray-500 mb-3">Discover Top Courses</h2>

            <h1 className="text-[42px] md:text-[54px] font-bold mb-5 leading-tight">
              <span className="block text-gray-900">Upgrade Your Skills</span>
              <span className="block bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                With Expert Courses
              </span>
            </h1>

            <p className="text-gray-500 mb-6">
              Learn modern skills with high-quality and interactive courses.
            </p>

            <button
              ref={btnRef}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow transition"
            >
              Browse Courses
              <FaArrowRight />
            </button>

          </div>

        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[55%] grid grid-cols-2 md:grid-cols-3 gap-6 perspective-[1000px]">

          {[
            { icon: <FaLaptopCode />, title: "Development" },
            { icon: <FaUserGraduate />, title: "Mentorship" },
            { icon: <FaBookOpen />, title: "Courses" },
            { icon: <FaCertificate />, title: "Certificates" },
            { icon: <FaChalkboardTeacher />, title: "Teachers" },
            { icon: <FaGlobe />, title: "Global" },
            { icon: <FaClock />, title: "Flexible" },
            { icon: <FaProjectDiagram />, title: "Projects" },
            { icon: <FaLaptopCode />, title: "Advanced" }
          ].map((item, i) => (

            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative bg-white/70 backdrop-blur-xl rounded-xl p-6 flex flex-col items-center text-center gap-3 border border-gray-200 shadow-md transition duration-300 cursor-pointer overflow-hidden"
            >

              {/* 🎨 Gradient Hover Fill */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-purple-500/10 to-pink-500/10 transition duration-300"></div>

              <div className="relative z-10">

                <div className="text-[36px] text-purple-500 mb-2 group-hover:scale-110 transition">
                  {item.icon}
                </div>

                <h3 className="text-gray-800 font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-[13px]">
                  Learn and grow with real skills
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default ExploreCourses