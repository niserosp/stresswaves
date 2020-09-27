import React, { Suspense } from 'react'
import { CircleLoader } from 'react-spinners'
import { Route, Switch } from 'react-router-dom'
import CenterBox from '../CenterBox'

const AnnotationsTestPage = React.lazy(() => import('./AnnotationsTestPage'))
const ConstructionPage = React.lazy(() => import('./ConstructionPage'))

export default () => {
    return (
        <Suspense fallback={<CenterBox><CircleLoader color='white' /></CenterBox>}>
            <Switch>
                <Route path='/annotations-test' component={AnnotationsTestPage} />
                <Route path='/' component={ConstructionPage} exact />
            </Switch>
        </Suspense>
    )
}