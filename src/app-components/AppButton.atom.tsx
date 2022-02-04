import React from 'react'
import { Button } from '@mui/material'
import { ButtonProps } from '@mui/material/Button/Button'
import scss from './AppComponents.module.scss'



const AppButtonAtom = (props: ButtonProps): JSX.Element => {

    return <Button
        color={'info'}
        variant={'outlined'}
        className={scss.button}

        {...props}>{props.children}</Button>
}

export default AppButtonAtom
