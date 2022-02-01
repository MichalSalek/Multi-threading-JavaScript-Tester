import React from 'react'
import { Input } from '@mui/material'
import { InputProps } from '@mui/material/Input/Input'



const AppInputAtom = (props: InputProps): JSX.Element => {

    return <Input
        type={'number'}

        {...props}/>
}

export default AppInputAtom
