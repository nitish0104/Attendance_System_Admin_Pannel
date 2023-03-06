import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase_config';



const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
	// const [user, setuser] = useState()
	const [QRstate, setQRstate] = useState("");
	const navigate = useNavigate()

	const handleSignup = async (fromstate) => {
		await createUserWithEmailAndPassword(auth, fromstate.email, fromstate.password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				// setuser(user)
				console.log(user)
				console.log(user.uid)
				// ...
			}).then(() => {
				alert("account created sucessfully")
				navigate("/")
			}).catch((err) => {
				console.error(err);
				alert(err)
			})
	}
	const handleLogin = async (fromstate) => {
		await signInWithEmailAndPassword(auth, fromstate.email, fromstate.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);

				// ...
			})
			.then(() => {
				alert("login sucessfully")
				navigate("/main");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
				console.log(errorCode);
			});
	};
	const generateqrcode = (fromstate) => {
		let currentDate = new Date();
		let currentDay = currentDate.getDate()
		let month = currentDate.getMonth() + 1
		let year = currentDate.getFullYear()
		let finalDate = `${currentDay}-${month}-${year}`
		let obj = {

			...fromstate,
			date: finalDate
		}
		let QRstatefinal = JSON.stringify(obj)
		setQRstate(QRstatefinal)
		console.log(QRstatefinal)


	};

	return (
		<AuthContext.Provider value={{ handleSignup, handleLogin, generateqrcode, QRstate }}>
			{children}
		</AuthContext.Provider>
	)
}
const UserAuth = () => {
	return useContext(AuthContext)
}

export { AuthContextProvider, UserAuth } 