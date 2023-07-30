import { Database } from './db/types';

export type DBReturn<T extends (...args: any) => Promise<any>> = Awaited<ReturnType<T>>

type Tables = Database['public']['Tables']

export type Author = Tables['author']['Row']

export type Post = Omit<Tables['post']['Row'], 'content' | 'authorId' | 'published' | 'updatedAt'> & { author: Author | null }

