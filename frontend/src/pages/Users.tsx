import { useEffect, useState, type SetStateAction } from "react"
import axios from "axios"

interface User {
  doctor: string
  patient: string
}

const Users = () => {
  // const [users, setUsers] = useState<User | null>(null)
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   axios
  //     .get<User>("http://127.0.0.1:8000/users/")
  //     .then((response: { data: SetStateAction<User | null> }) => {
  //       setUsers(response.data)
  //     })
  //     .catch((err: any) => {
  //       console.error(err)
  //       setError("Failed to load users")
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }, [])

  // if (loading) {
  //   return <p className="text-center">Loading users...</p>
  // }

  // if (error) {
  //   return <p className="text-center text-red-500">{error}</p>
  // }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Users
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Manage your users and their information.
        </p>
      </header>

      {/* Main content placeholder */}
      <div className="rounded-xl border bg-white p-6 shadow-sm
                      dark:border-slate-800 dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-300">
          User management features will appear here.
        </p>
      </div>
    </section>
  )
}

export default Users
