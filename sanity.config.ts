/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, previewSecretId, projectId } from '::/lib/sanity.api'
import { settingsPlugin, settingsStructure } from '::/sanity/plugins/settings'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schema } from '::/sanity/schemas'
import settingsType from '::/sanity/schemas/settings'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'

export default defineConfig({
  basePath: '/console/studio',
  projectId,
  dataset,
  title,
  schema,
  plugins: [
    deskTool({
      structure: settingsStructure(settingsType),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    settingsPlugin({ type: settingsType.name }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
