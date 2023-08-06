export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      author: {
        Row: {
          id: string
          nickname: string | null
        }
        Insert: {
          id: string
          nickname?: string | null
        }
        Update: {
          id?: string
          nickname?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'author_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      post: {
        Row: {
          authorId: string | null
          content: string
          cover: string | null
          createdAt: string | null
          excerpt: string | null
          like: number | null
          published: boolean
          slug: string | null
          title: string | null
          updatedAt: string | null
        }
        Insert: {
          authorId?: string | null
          content?: string | null
          cover?: string | null
          createdAt?: string | null
          excerpt?: string | null
          like?: number | null
          published: boolean
          slug?: string
          title?: string | null
          updatedAt?: string | null
        }
        Update: {
          authorId?: string | null
          content?: string | null
          cover?: string | null
          createdAt?: string | null
          excerpt?: string | null
          like?: number | null
          published?: boolean
          slug?: string
          title?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'post_authorId_fkey'
            columns: ['authorId']
            referencedRelation: 'author'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
