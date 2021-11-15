import {useRouter} from "next/router";
import {useAppSelector} from "@/core/hooks";
import {selectIsUserLogIn} from "@/features/user-login/loginSlice";
import {useEffect, useState} from "react";
import {ROUTE_PAGE_LOGIN} from "@/core/consts-and-routes";

const RedirectByLogin = ({children}) => {

	const router = useRouter()

	const isUserLogIn: boolean = useAppSelector(selectIsUserLogIn)

	const [allowRender, setAllowRender] = useState<boolean>(false);

	useEffect(() => {
		// Redirect user to user-login page when he is not logged in
		!isUserLogIn && router.replace(ROUTE_PAGE_LOGIN)

		setAllowRender(true)
		return null
	}, [isUserLogIn]);


	return allowRender ? children : null
}

export default RedirectByLogin
