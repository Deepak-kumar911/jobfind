import  { useEffect } from 'react'
export const Logout = () => {
    useEffect(() => {
        async function fetch() {
            localStorage.removeItem("token")
            window.location = "/login"
        } fetch()
    }, [])
}