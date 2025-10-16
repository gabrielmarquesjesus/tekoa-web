import React from "react";


export default function ProtectedRoute({ children, route }: { children: React.ReactNode, route: string }) {
    // const navigate = useNavigate()
    // useEffect(() => {
    //     VerifyAuth(navigate, route)
    // }, [])
    return (<>{ children }</>)
}