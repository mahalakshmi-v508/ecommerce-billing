import { useLocation } from 'react-router-dom'
import UserHeader from './UserHeader'
import WholesalerHeader from './WholesalerHeader'

export default function RoleHeader() {
  const location = useLocation()

  const isWholesaler = location.pathname.startsWith('/wholesaler')

  return isWholesaler ? <WholesalerHeader /> : <UserHeader />
}