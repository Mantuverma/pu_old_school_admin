import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Users',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Users',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Add Users',
        to: '/base/breadcrumbs',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Notices',
    to: '#',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Notices',
        to: '/Notices',
      },
      {
        component: CNavItem,
        name: 'Add Notice',
        to: '/AddNotice',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Events',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Pending Events',
        to: '/PendingEvents',
      },
    ],
  },
]

export default _nav
