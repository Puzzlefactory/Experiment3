import {
  index,
  route,
  type RouteConfig,
} from '@react-router/dev/routes'

export default [
  index('./routes/dashboard-route.tsx'),
  route('projects', './routes/projects-index-route.tsx'),
  route('projects/:projectId', './routes/project-detail-route.tsx'),
  route('settings', './routes/settings-route.tsx'),
  route('*', './not-found-route.tsx'),
] satisfies RouteConfig
