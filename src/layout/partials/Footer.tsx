import {useRouter} from "next/router";

const Footer = () => {

    const router = useRouter()

    return (<>
        <hr/>
        <br/>
        <span>I'm footer.</span>
        <br/>		<br/>
        <button onClick={() => router.back()}>Go back</button>

        <hr/>
    </>)
}

export default Footer
