import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

function CreateCourses() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)

  const categories = [
    "Web Development",
    "App Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Graphics Design",
    "Cyber Security",
    "Cloud Computing",
    "Game Development",
    "Other"
  ]

  // ✅ Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !category) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)

    // 👉 API call yahan hogi
    console.log({
      title,
      category
    })

    setTimeout(() => {
      setLoading(false)
      navigate("/courses")
    }, 1000)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f6f7] via-white to-[#f3e8ff] px-4 py-10'>

      <div className='max-w-xl w-[500px] p-6 bg-white shadow-xl rounded-2xl relative border'>

        {/* 🔙 Back */}
        <BiArrowBack
          className='absolute top-5 left-5 text-xl cursor-pointer'
          onClick={() => navigate("/courses")}
        />

        <h2 className='text-2xl font-semibold mb-6 text-center'>
          Create Course
        </h2>

        <form onSubmit={handleSubmit} className='space-y-5'>

          {/* Title */}
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Course Title
            </label>

            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter course title'
              className='w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none'
            />
          </div>

          {/* Category Select */}
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none'
            >
              <option value="">Select Category</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 📊 Selected Data Preview */}
          {(title || category) && (
            <div className='bg-gray-100 rounded-md p-3 text-sm'>
              <p><strong>Title:</strong> {title || "—"}</p>
              <p><strong>Category:</strong> {category || "—"}</p>
            </div>
          )}

          {/* Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md hover:opacity-90'
          >
            {loading ? "Creating..." : "Create Course"}
          </button>

        </form>

      </div>
    </div>
  )
}

export default CreateCourses