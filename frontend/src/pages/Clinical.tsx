import ProtectedNotice from '@/components/ui/ProtectedNotice'
import { useAuth } from '@/context/AuthContext'
import React from 'react'
import DoctorClinical from './DoctorClinical';
import PatientClinical from './PatientClinical';

const Clinical = () => {
  const { role } = useAuth();
  return (
    role == "doctor" ? <DoctorClinical /> : <PatientClinical />
  )
}

export default Clinical