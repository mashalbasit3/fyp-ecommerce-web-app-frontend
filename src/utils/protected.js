import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function Protected({Component}){
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('jwtToken');
        
        if (!token){
            navigate("/login")
        }
    })

    return (
        <>
            <Component />
        </>
    )

}

export default Protected