import React from 'react'
import { Button } from '@mui/material'



const AppButtonAtom = (props: any): JSX.Element => {

    console.log(props)

    return <Button>{props.children}</Button>
}

export default AppButtonAtom
