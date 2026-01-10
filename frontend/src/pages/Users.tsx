import { useEffect, useState } from "react"
import axios from "axios"

interface User {
  id: number
  name: string
  email: string
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios
      .get<User[]>("http://127.0.0.1:8000/users/")
      .then((response) => {
        setUsers(response.data)
      })
      .catch((err) => {
        console.error(err)
        setError("Failed to load users")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="text-center">Loading users...</p>
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-4 text-2xl font-semibold">Users</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="rounded-lg border bg-white p-3 shadow-sm"
          >
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
