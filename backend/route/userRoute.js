import express from 'express'
import isAuth from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'

import { getCurrentUser, uploadProfile } from '../controllers/userController.js'

const userRouter = express.Router()

// ✅ check route working
userRouter.get("/test", (req, res) => {
  res.send("User route working ✅")
})

// ✅ get current user
userRouter.get("/getcurrentuser", isAuth, getCurrentUser)

// ✅ update profile
userRouter.post(
  "/profile",
  isAuth,
  upload.single("photoUrl"),
  uploadProfile
)

export default userRouter