import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ForgetPassword() {

    const [step , setStep] = useState(1)
    const navigate = useNavigate();
  return (
    <div>
        {/* step 1 */}
        { step == 1 && <div>
            <h2>Forget Your Password</h2>
            <form> 
                <div>
                    <label htmlFor="email">Enter Your Email : </label>
                    <input id='email' type='text' required placeholder='you@example.com' />
                </div>
                <button>Send OTP</button>
                <div onClick={() => navigate("/login")}> Back to Login</div>
            </form>
        </div> }

        {/* step 2 */}
        { step == 2 && <div>
            <h2>Enter OTP</h2>
            <form> 
                <div>
                    <label htmlFor="otp">Enter OTP send to your Email</label>
                    <input id='otp' type='text' required placeholder='* * * *' />
                </div>
                <button>Verify OTP</button>
                <div onClick={() => navigate("/login")}> Back to Login</div>
            </form>
        </div> }

        {/* step 3 */}
        { step == 3 && <div>
            <h2>Reset Your Password</h2>
                    <p>Enter a new Password below to regain access to your account.</p>
            <form> 
                <div>
                    <label htmlFor="password">Enter New Password : </label>
                    <input id='password' type='text' required placeholder='***********' />
                </div>
                <div>
                    <label htmlFor="password">Confirm Password : </label>
                    <input id='password' type='text' required placeholder='***********' />
                </div>
                <button>Reset Password</button>
                <div onClick={() => navigate("/login")}> Back to Login</div>
            </form>
        </div> }

    </div>
  )
}

export default ForgetPassword