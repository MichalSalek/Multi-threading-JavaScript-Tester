import Navigation from "@/layout/partials/Navigation";
import Footer from "@/layout/partials/Footer";
import {selectIsUserLogIn} from "@/features/user-login/loginSlice";
import {useAppSelector} from "@/core/hooks";


const Layout = ({children}) => {

	return useAppSelector(selectIsUserLogIn) ?
		(<nav>
			<Navigation/>
			<main>{children}</main>
			<Footer/>
		</nav>) :
		children
}

export default Layout
