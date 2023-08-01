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
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const formSchema = z.object({
  email: z
    .string({
      required_error: 'error',
    })
    .email(),
  password: z.string(),
})

export default function Login() {
  const supabase = createClientComponentClient()
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
        error,
      } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setLoading(false)
      } else {
        router.replace('/')
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex justify-center items-center">
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
          <Button variant='secondary' className='w-full' type="submit" disabled={loading}>
            {loading ? 'Logining...' : 'Login'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
