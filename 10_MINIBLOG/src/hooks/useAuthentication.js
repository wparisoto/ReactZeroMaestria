import {db} from "../firebase/config"

import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut

} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [canceled, setCanceled] = useState(false)

    const auth = getAuth()


    function checkIfCanceled(){
        if(canceled){
            return;
        }
    }

    const createUser = async (data) =>{
        checkIfCanceled()

        setLoading(true)
        setError(null)

        try{
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user
        } catch(error){
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha deve ter pelo menos 6 caracteres"
            }else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado."
            }else{
                systemErrorMessage = "Ocorreu erro, tente mais tarde"
            }

            setError(systemErrorMessage)
        }

        setLoading(false)
    }

    const logout = () =>{
        checkIfCanceled()

        signOut(auth)
    }

    const login = async(data) => {
        checkIfCanceled()

        setLoading(true)
        setError(false)

        try{
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        }catch(error){
            let systemErrorMessage;

            if(error.message.includes("user-not-found")){
                systemErrorMessage = "Usuario nao encontrado"
            }else if(error.message.includes("wrong-password")){
                systemErrorMessage = "Senha incorreta"
            }else{
                systemErrorMessage = "Erro, tente mais tarde"
            }
            
            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCanceled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}