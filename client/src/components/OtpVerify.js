import React, { useState } from "react";
import styles from "../styles/Otpverify.module.css";

const OtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  const handleVerify = () => {
    const enteredOTP = otp.join("");
    // Implement your verification logic here
    console.log("Verifying OTP:", enteredOTP);
  };

  const handleResend = () => {
    // Implement resend logic here
    console.log("Resending code");
  };

  return (
    <div className={styles["bg-white"]}>
      <div className={styles["cardBody"]}>
        <h4>Verify</h4>
        <p>OTP is sent to you via email</p>

        <div className={styles["otp-field"]}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="number"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className={styles["otp-input"]}
            />
          ))}
        </div>

        <button className={styles["verifyButton"]} onClick={handleVerify}>
          Verify
        </button>

        <p className={styles["resend"]}>
          Didn't receive code?{" "}
          <button onClick={handleResend}>Try Again</button>
        </p>
      </div>
    </div>
  );
};

export default OtpVerify;
