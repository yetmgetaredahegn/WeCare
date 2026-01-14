import { useEffect, useState, type SetStateAction } from "react"
import axios from "axios"

interface User {
  doctor: string
  patient: string
}

const Users = () => {
  const [users, setUsers] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios
      .get<User>("http://127.0.0.1:8000/users/")
      .then((response: { data: SetStateAction<User | null> }) => {
        setUsers(response.data)
      })
      .catch((err: any) => {
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
      <h1 className="mb-4 text-2xl font-semibold">User Categories</h1>
      <div className="space-y-2">
        {users && (
          <>
            <a href={users.doctor} className="block p-3 border rounded">Doctor API</a>
            <a href={users.patient} className="block p-3 border rounded">Patient API</a>
          </>
        )}
      </div>
    </div>
  )
}

export default Users
