import { useState } from "react";
import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
          alert("Please verify your email first before logging in.");
          await signOut(auth);
          return;
        }

        // ✅ Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          localStorage.setItem("firstName", userData.firstName);
        }

        alert("Login successful!");
        navigate("/");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);

        await setDoc(doc(db, "users", user.uid), {
          firstName,
          lastName,
          contactNumber,
          address,
          email,
          createdAt: new Date(),
        });

        await signOut(auth);

        alert(
          "Signup successful! Please check your email and click the verification link before logging in."
        );

        setIsLogin(true);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setContactNumber("");
        setAddress("");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            className="auth-form"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2>Login</h2>
            <form onSubmit={handleAuth}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            <p>
              Don’t have an account?{" "}
              <button onClick={() => setIsLogin(false)}>Sign up here</button>
              <br />
              <span className="forgot-password" onClick={handleForgotPassword}>
                Forgot password?
              </span>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            className="auth-form"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2>Signup</h2>
            <form onSubmit={handleAuth}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)}>Login here</button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
