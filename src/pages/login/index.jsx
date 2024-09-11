import { useGoogleLogin } from '@react-oauth/google'

export default function Login() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
  })

  return (
    <div className="login" onClick={() => login()}>
      Login
    </div>
  )
}
