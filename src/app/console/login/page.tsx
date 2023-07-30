'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '::/components/ui'
import { supabase } from '::/db'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cookie } from '::/lib';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'error',
    })
    .email(),
  password: z.string(),
})

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const { email, password } = values
    try {
      const {
        data: { session },
      } = await supabase.auth.signInWithPassword({ email, password })
      if (session) {
        cookie.updateAuth(session)
        router.replace('/console')
      } else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="h-full flex justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" className="w-96" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" className="w-96" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Logining...' : 'Login'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
