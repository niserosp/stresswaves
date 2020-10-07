import React from 'react'
import LoadingStrings, { LoadingSuspense } from '../loading/LoadingStrings'

export default function LoadingStringsTestPage() {
    return (
        <LoadingStrings>
            <LoadingSuspense>

            </LoadingSuspense>
        </LoadingStrings>
    )
}