import React, { useEffect, useRef } from 'react'
import {
  FaArrowRight,
  FaLaptopCode,
  FaMobileAlt,
  FaBrain,
  FaRobot,
  FaDatabase,
  FaPaintBrush,
  FaShieldAlt,
  FaCloud,
  FaGamepad
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
      if (!card) return

      const handleMove = (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const rotateX = (y - rect.height / 2) / 15
        const rotateY = (rect.width / 2 - x) / 15

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
      }

      const handleLeave = () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`
      }

      card.addEventListener("mousemove", handleMove)
      card.addEventListener("mouseleave", handleLeave)

      return () => {
        card.removeEventListener("mousemove", handleMove)
        card.removeEventListener("mouseleave", handleLeave)
      }
    })
  }, [])

  // 🧲 Magnetic Button
  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const handleMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
    }

    const handleLeave = () => {
      btn.style.transform = "translate(0,0)"
    }

    btn.addEventListener("mousemove", handleMove)
    btn.addEventListener("mouseleave", handleLeave)

    return () => {
      btn.removeEventListener("mousemove", handleMove)
      btn.removeEventListener("mouseleave", handleLeave)
    }
  }, [])

  return (
    <div className="bg-gradient-to-br from-[#f6f6f7] via-white to-[#f3e8ff] relative overflow-hidden">

      {/* ✨ Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-400/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-400/20 rounded-full blur-[120px]" />
      </div>

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
            { icon: <FaLaptopCode />, title: "Web Development" },
            { icon: <FaMobileAlt />, title: "App Development" },
            { icon: <FaBrain />, title: "Artificial Intelligence" },
            { icon: <FaRobot />, title: "Machine Learning" },
            { icon: <FaDatabase />, title: "Data Science" },
            { icon: <FaPaintBrush />, title: "Graphics Design" },
            { icon: <FaShieldAlt />, title: "Cyber Security" },
            { icon: <FaCloud />, title: "Cloud Computing" },
            { icon: <FaGamepad />, title: "Game Development" }
          ].map((item, i) => (

            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative bg-white/70 backdrop-blur-xl rounded-xl p-6 flex flex-col items-center text-center gap-3 border border-gray-200 shadow-md transition duration-300 cursor-pointer overflow-hidden"
            >

              {/* Hover Effect */}
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