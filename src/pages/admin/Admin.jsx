import { createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";

const Admin = () => {
    const navigate = useNavigate();

    createEffect(() => {
        if (!sessionStorage.getItem('isLogged')) {
            navigate('/login', { replace: true })
        }
    })

    const logOut = () => {
        sessionStorage.removeItem("isLogged")
        navigate('/login', { replace: true })
    }

    return (
        <>
            <h3>Admin page</h3>
            <button type="button" class="btn btn-primary" onClick={logOut}>Log out</button>
        </>
    )
}

export default Admin