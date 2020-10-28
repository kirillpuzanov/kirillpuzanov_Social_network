import React from "react";

export const FieldRequired = (value: string) => {
    if (value) return undefined
    return 'Field id required'
}

export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value && value.length > maxLength) return `Max length ${maxLength} symbols`
    return undefined
}