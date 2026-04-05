import React from 'react'
import Nav from '../component/Nav'
import home from '../assets/home1.jpg'
import { FaGooglePlay, FaArrowRight } from "react-icons/fa";
import ai from '../assets/ai.png'
import ai1 from '../assets/SearchAi.png'
import Logos from '../component/Logos';
import ExploreCourses from '../component/ExploreCourses';

export default function Home() {
  return (
    <div className='w-full overflow-hidden bg-gray-50'>
      
      <div className='w-full lg:h-[100vh] h-auto relative bg-white'>
        
        <Nav/>

        <div className="absolute inset-0 z-0">
          <img 
            src={home} 
            className='w-full h-full object-cover opacity-90' 
            alt='Home background' 
          />
          {/* Modern gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent lg:hidden"></div>
        </div>

        {/* Hero Content */}
        <div className='relative z-10 w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 lg:pt-0'>
          
          <div className="max-w-3xl">
            <span className='inline-block py-1.5 px-4 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-sm font-semibold tracking-wide mb-6 backdrop-blur-md'>
              🚀 Transform Your Future
            </span>
            
            <h1 className='text-[40px] md:text-[60px] lg:text-[75px] leading-[1.1] text-white font-extrabold tracking-tight mb-6 drop-shadow-lg'>
              Grow Your Skills to Advance <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                Your Career Path
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
              Join thousands of learners unlocking their potential with industry-leading courses. Learn at your own pace, anytime, anywhere.
            </p>

            {/* Buttons */}
            <div className='flex items-center gap-4 flex-wrap pb-16 lg:pb-0'>
              
              <button className='px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:-translate-y-1 transition-all duration-300 text-[16px] font-semibold flex items-center gap-3'>
                View All Courses
                <FaArrowRight className='w-4 h-4' />
              </button>

              <button className='px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300 text-[16px] font-semibold flex items-center gap-3 group'>
                Search With AI 
                <img src={ai} className='w-[28px] h-[28px] rounded-full shadow-sm group-hover:scale-110 transition-transform' alt='AI search'/>
              </button>

            </div>
          </div>

        </div>

      </div>

      <div className="py-12 bg-white">
        <Logos/>
        <ExploreCourses/>
      </div>

    </div>
  )
}
