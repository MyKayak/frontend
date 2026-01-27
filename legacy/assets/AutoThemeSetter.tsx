"use client"
import React, {useEffect} from 'react'

const AutoThemeSetter = () => {
    useEffect(() => {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        document.documentElement.setAttribute('data-theme', isDark ? 'mocha' : 'latte')
    }, [])
    return (
        <div></div>
    )
}
export default AutoThemeSetter
