

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { ThemeProvider as DegenProvider } from 'degen'
import { Theme as RadixTheme } from '@radix-ui/themes';

import 'degen/styles'
import '@radix-ui/themes/styles.css';
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {

  return <NextThemesProvider {...props}><RadixTheme><DegenProvider>{children}</DegenProvider></RadixTheme></NextThemesProvider>
}
