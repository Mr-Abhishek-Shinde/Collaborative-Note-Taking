import React, { useState } from 'react';
import styles from "../styles/Otpverify.module.css"; // Import the CSS module

const Otpverify = () => {
  const [otp, setOtp] = useState(['', '', '', '', ]);

  const handleChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  const handleVerify = () => {
    const enteredOTP = otp.join('');
    // Implement your verification logic here
    console.log('Verifying OTP:', enteredOTP);
  };

  const handleResend = () => {
    // Implement resend logic here
    console.log('Resending code');
  };

  return (
    <div className={`container-fluid ${styles['bg-body-tertiary']} d-block`}> {/* Use styles object for className */}
      <div className="row justify-content-center">
        <div className={`col-12 col-md-6 col-lg-4 ${styles['minWidth500']}`}> {/* Use styles object for className */}
          <div className={`card ${styles['bg-white']} mb-5 mt-5 border-0`} style={{ boxShadow: '0 12px 15px rgba(0, 0, 0, 0.02)' }}>
            <div className={`card-body p-5 text-center ${styles['cardBody']}`}> {/* Use styles object for className */}
              <h4>Verify</h4>
              <p>Your code was sent to you via email</p>

              <div className={`${styles['otp-field']} mb-4`}> {/* Use styles object for className */}
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="number"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className={styles['otp-input']} 
                  />
                ))}
              </div>

              <button className={`btn btn-primary mb-3 ${styles['verifyButton']}`} onClick={handleVerify}> {/* Use styles object for className */}
                Verify
              </button>

              <p className={`resend text-muted mb-0 ${styles['resend']}`}> {/* Use styles object for className */}
                Didn't receive code? <a href="#" onClick={handleResend}>Request again</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* You can add your footer here */}
    </div>
  );
};

export default Otpverify;
