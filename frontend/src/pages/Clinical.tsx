import { useAuth } from '@/context/AuthContext'
import DoctorClinical from './DoctorClinical';
import PatientClinical from './PatientClinical';

const Clinical = () => {
  const { role } = useAuth();
  return (
    role == "doctor" ? <DoctorClinical /> : <PatientClinical />
  )
}

export default Clinical