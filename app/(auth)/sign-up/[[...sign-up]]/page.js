import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex items-center min-h-screen justify-center p-3'>
      <SignUp />
    </div>
  )
}