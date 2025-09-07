import React, { useEffect, useState } from "react"
import axios from "axios"

export default function Profile() {
  const [me, setMe] = useState(null)
  const [bio, setBio] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    fetchMe()
  }, [])

  async function fetchMe() {
    try {
      const token = localStorage.getItem("token")
      if (!token) return
      const payload = JSON.parse(atob(token.split(".")[1]))
      const id = payload.id || payload._id
      const res = await axios.get(`/api/users/${id}`)
      setMe({ user: res.data.user, posts: res.data.posts })
      setBio(res.data.user.bio || "")
    } catch (err) {
      console.error("Error fetching profile:", err)
    }
  }

  async function updateBio() {
    try {
      const token = localStorage.getItem("token")
      await axios.put(
        `/api/users/${me.user._id}/bio`,
        { bio },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchMe()
    } catch (err) {
      console.error("Error updating bio:", err)
    }
  }

  async function updatePassword() {
    try {
      const token = localStorage.getItem("token")
      await axios.put(
        `/api/users/${me.user._id}/password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert("Password updated")
      setOldPassword("")
      setNewPassword("")
    } catch (err) {
      console.error("Error updating password:", err)
    }
  }

  async function uploadAvatar() {
    try {
      const token = localStorage.getItem("token")
      const formData = new FormData()
      formData.append("avatar", avatar)
      await axios.put(`/api/users/${me.user._id}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      })
      fetchMe()
      setAvatar(null)
    } catch (err) {
      console.error("Error uploading avatar:", err)
    }
  }

  if (!me)
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading profile...</span>
        </div>
      </div>
    )

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center gap-6">
        <img
          src={me.user.avatarUrl || "https://via.placeholder.com/80"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{me.user.username}</h2>
          <p className="text-gray-600">{me.user.email}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Update Profile Photo</h3>
        <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
        <button
          onClick={uploadAvatar}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Edit Bio</h3>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border rounded p-2"
        />
        <button
          onClick={updateBio}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save Bio
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border rounded p-2 mb-2"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded p-2 mb-2"
        />
        <button
          onClick={updatePassword}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Change Password
        </button>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">My Posts</h3>
        {me.posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Create your first post!</p>
        ) : (
          <div className="space-y-4">
            {me.posts.map((p) => (
              <div
                key={p._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md"
              >
                <p className="text-gray-700">{p.text}</p>
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt="Post"
                    className="mt-3 max-w-full h-auto rounded-lg"
                  />
                )}
                <div className="mt-2 text-sm text-gray-500">
                  {new Date(p.createdAt).toLocaleString()}
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  👍 {p.likes?.length || 0} | 💬 {p.comments?.length || 0}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
