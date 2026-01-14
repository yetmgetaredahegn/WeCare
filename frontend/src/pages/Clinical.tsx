import ProtectedNotice from '@/components/ui/ProtectedNotice'
import React from 'react'

const Clinical = () => {
  return (
    <ProtectedNotice
      title="Clinical"
      description="To protect the privacy and security of patient appointments, this section is available only to registered users. Please sign in or create an account to continue."
      ctaText="Login to your account"
      ctaLink="/login"
    />
  )
}

export default Clinical