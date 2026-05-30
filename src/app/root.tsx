import type { ReactNode } from 'react'
import type { LinksFunction } from 'react-router'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AppFrame } from './app-frame'
import { appTheme } from './theme'
import '../styles/index.css'

export const links: LinksFunction = () => []

export default function Root() {
  return <DocumentShell />
}

export function HydrateFallback() {
  return (
    <DocumentShell>
      <Box sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h1">Loading workspace</Typography>
          <Typography color="text.secondary">
            Preparing route data through the prototype API boundary.
          </Typography>
        </Stack>
      </Box>
    </DocumentShell>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Something went wrong'
  const message = isRouteErrorResponse(error)
    ? typeof error.data === 'string'
      ? error.data
      : 'The route could not load with the current prototype role.'
    : error instanceof Error
      ? error.message
      : 'The application encountered an unknown error.'

  return (
    <DocumentShell>
      <Box sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Alert severity="warning">{title}</Alert>
          <Typography>{message}</Typography>
          <Button href="/" variant="contained">
            Back to dashboard
          </Button>
        </Stack>
      </Box>
    </DocumentShell>
  )
}

function DocumentShell({ children }: { children?: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <AppFrame>
            {children ?? <Outlet />}
          </AppFrame>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
