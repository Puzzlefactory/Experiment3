import type { Route } from './+types/project-detail-route'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router'
import { Page } from '@/app/layouts/page'
import { getProject } from '@/app/features/projects/projects-api'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { project: await getProject(params.projectId) }
}

export default function ProjectDetailRoute({ loaderData }: Route.ComponentProps) {
  const { project } = loaderData

  return (
    <Page
      eyebrow="Project"
      title={project.name}
      description={project.summary}
      actions={
        <Button component={Link} to="/projects" variant="outlined">
          Back to projects
        </Button>
      }
    >
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
              <Chip label={project.status} />
              <Chip label={project.health} />
            </Stack>
            <Typography>Owner: {project.owner}</Typography>
            <Typography color="text.secondary">
              Updated: {new Date(project.updatedAt).toLocaleString()}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Page>
  )
}
