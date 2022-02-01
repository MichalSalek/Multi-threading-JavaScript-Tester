import React from 'react'
import { Button } from '@mui/material'
import { ButtonProps } from '@mui/material/Button/Button'



const AppButtonAtom = (props: ButtonProps): JSX.Element => {

    return <Button
        color={'info'}
        variant={'outlined'}

        {...props}>{props.children}</Button>
}

export default AppButtonAtom
