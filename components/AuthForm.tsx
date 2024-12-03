"use client"
import React, { useState } from 'react'
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import Link from 'next/link'
import { createAcount } from '@/lib/actions/user.actions'
import OtpModule from './OtpModule'

type Formtype= 'sing-in' | 'sing-up'


const authformSchema =(formtype:Formtype) => {
   return z.object({
        email: z.string().email(),
        fullname:formtype==='sing-up'?z.string().min(2).max(50): z.string().optional()
    })
     
} 



function AuthForm({type}:{type:Formtype}) {
    const [isLoading, setisLoading] = useState(false)
    const [errorMessage, seterrorMessage] = useState('')
    const [accountid, setaccountid] = useState(null)
    const formSchema = authformSchema(type);    
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
              email: "",
              fullname:""
            },
          })

const onSubmit= async (values: z.infer<typeof formSchema>) =>{
        setisLoading(true)
        seterrorMessage('')
          try {
            const user = await createAcount({email:values.email , fullname :values.fullname || ''})
            setaccountid(user.accountid)
            
          } catch (error) {
            seterrorMessage('field to create account')
            
          }  finally { 
            setisLoading(false)
          }


        }
    return (<>
    
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type==='sing-in' ?'Sign In':'Sign Up'}
          </h1>
{type==='sing-up' && (  <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                <div className="shad-form-item">

                  <FormLabel className="shad-form-label">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full Name" className="shad-input" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message"  />
                </FormItem>
              )}
            />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                <div className="shad-form-item">

                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email" className="shad-input" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message"  />
                </FormItem>
              )}
            />
          
             <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
         
          >{type==='sing-in' ?'Sign In':'Sign Up'} {isLoading && (
            <Image
              src="/assets/icons/loader.svg"
              alt="loader"
              width={24}
              height={24}
              className="ml-2 animate-spin"
            />
          )}</Button>
           {errorMessage && <p className="error-message">*{errorMessage}</p>}

<div className="body-2 flex justify-center">
  <p className="text-light-100">
    {type === "sing-in"
      ? "Don't have an account?"
      : "Already have an account?"}
  </p>
  <Link
    href={type === "sing-in" ? "/sign-up" : "/sign-in"}
    className="ml-1 font-medium text-brand"
  >
    {" "}
    {type === "sing-in" ? "Sign Up" : "Sign In"}
  </Link>
  </div>
          </form>
        </Form>

        {true && <OtpModule email={form.getValues('email')} accountId={accountid}/>}
    </>
      )
    }

export default AuthForm