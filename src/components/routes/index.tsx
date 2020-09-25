import React, { Suspense } from 'react'
import { CircleLoader } from 'react-spinners'
import { Route, Switch } from 'react-router-dom'

const AnnotationsTestPage = React.lazy(() => import('./AnnotationsTestPage'))
const ConstructionPage = React.lazy(() => import('./ConstructionPage'))

export default () => {
    return (
        <Suspense fallback={<CircleLoader />}>
            <Switch>
                <Route path='/annotations-test' component={AnnotationsTestPage} />
                <Route path='/' component={ConstructionPage} exact />
            </Switch>
        </Suspense>
    )
}