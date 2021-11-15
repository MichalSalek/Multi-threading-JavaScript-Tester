import Link from "next/link";
import {NextPage} from "next";

import {useAppDispatch} from "@/core/hooks";
import {logOut} from "@/features/user-login/loginSlice";
import {ROUTE_PAGE_CALCULATIONS, ROUTE_PAGE_DASHBOARD} from "@/core/consts-and-routes";

const IndexPage: NextPage = () => {

    return (<>
        <Link href={ROUTE_PAGE_CALCULATIONS}><button>go to {ROUTE_PAGE_CALCULATIONS} page...</button></Link>
    </>)
}

export default IndexPage
