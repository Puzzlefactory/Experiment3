import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { NavLink, useRevalidator } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FolderIcon from '@mui/icons-material/Folder'
import SettingsIcon from '@mui/icons-material/Settings'
import { RoleSwitcherDialog } from './role-switcher-dialog'
import { usePrototypeSessionStore } from '@/app/shared/state/prototype-session-store'

const drawerWidth = 248

const navItems = [
  { label: 'Dashboard', to: '/', icon: <DashboardIcon fontSize="small" /> },
  { label: 'Projects', to: '/projects', icon: <FolderIcon fontSize="small" /> },
  { label: 'Settings', to: '/settings', icon: <SettingsIcon fontSize="small" /> },
]

interface AppFrameProps {
  children: ReactNode
}

export function AppFrame({ children }: AppFrameProps) {
  const { session, logout } = usePrototypeSessionStore()
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(!session)
  const revalidator = useRevalidator()

  const userLabel = useMemo(() => {
    if (!session) {
      return 'No role selected'
    }

    return `${session.user.name} · ${session.user.role}`
  }, [session])

  function handleLogout() {
    logout()
    setRoleSwitcherOpen(true)
    revalidator.revalidate()
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        color="inherit"
        elevation={0}
        position="fixed"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ gap: 2, justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h3">Prototype Workspace</Typography>
            <Typography color="text.secondary" variant="body2">
              Base layout app for Figma Make extension testing
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Chip color={session ? 'primary' : 'default'} label={userLabel} />
            <Button variant="outlined" onClick={() => setRoleSwitcherOpen(true)}>
              Switch role
            </Button>
            {session ? <Button onClick={handleLogout}>Logout</Button> : null}
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        open
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <Stack spacing={2} sx={{ height: '100%', p: 2 }}>
          <Box>
            <Typography variant="h2">Make Baseline</Typography>
            <Typography color="text.secondary" variant="body2">
              Routing, auth, API, and layout patterns are pre-wired.
            </Typography>
          </Box>
          <Divider />
          <Stack component="nav" spacing={0.5}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                startIcon={item.icon}
                to={item.to}
                sx={{
                  justifyContent: 'flex-start',
                  '&.active': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '& .MuiSvgIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Drawer>

      <Box
        component="main"
        sx={{
          ml: { md: `${drawerWidth}px` },
          minHeight: '100vh',
          pb: 4,
          pt: 13,
        }}
      >
        {children}
      </Box>

      <RoleSwitcherDialog
        open={roleSwitcherOpen}
        onClose={() => setRoleSwitcherOpen(false)}
      />
    </Box>
  )
}
