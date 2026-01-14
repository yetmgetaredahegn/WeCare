import { useEffect, useState, type SetStateAction } from "react"
import axios from "axios"
import ProtectedNotice from "@/components/ui/ProtectedNotice"

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
    <ProtectedNotice
      title="Users"
      description="To protect the privacy and security of patient appointments, this section is available only to registered users. Please sign in or create an account to continue."
      ctaText="Login to your account"
      ctaLink="/login"
    />
  )
}

export default Users
