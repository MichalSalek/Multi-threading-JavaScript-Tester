import {useState} from 'react'



export const useSliderRAWValueHandler = (): [number | undefined, (value: number) => void] => {
    const [sliderValue, setSliderValue] = useState<number | undefined>(undefined)


    const handleSliderRAWValue = (newValue: number): void => {
        setSliderValue(newValue)
    }

    return [sliderValue, handleSliderRAWValue]
}
