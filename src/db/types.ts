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
          nickname: string
        }
        Insert: {
          id: string
          nickname: string
        }
        Update: {
          id?: string
          nickname?: string
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
          authorId: string
          content: string
          cover: string | null
          createdAt: string
          excerpt: string | null
          like: number
          published: boolean
          slug: string
          title: string
          updatedAt: string
        }
        Insert: {
          authorId: string
          content: string
          cover?: string | null
          createdAt?: string
          excerpt?: string | null
          like?: number
          published?: boolean
          slug?: string
          title: string
          updatedAt?: string
        }
        Update: {
          authorId?: string
          content?: string
          cover?: string | null
          createdAt?: string
          excerpt?: string | null
          like?: number
          published?: boolean
          slug?: string
          title?: string
          updatedAt?: string
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
