import { type SchemaTypeDefinition } from 'sanity'

import { readingTimeType } from '../types/readingTime'

import post from './post'
import author from './author'
import project from './project'
import settings from './settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [readingTimeType, post, author, project, settings],
}
