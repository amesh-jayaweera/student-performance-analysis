import React, {Suspense} from "react";
import {SideBar} from "../SideBar/SideBar";
import {Switch, Route, Router} from "react-router";
import {createBrowserHistory} from "history";
import {Login} from "../Login/Login";
import { Database } from "../Database/Database";
import { StudentPerformance } from "../Performance/StudentPerformance";
import { StudentPerformanceSubject } from "../Performance/StudentPerformanceSubject";

export const history = createBrowserHistory()

export function Dashboard () {

    const history = createBrowserHistory();

    return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path={'/login'} render={() =>
                            <Suspense fallback={""}>
                                <Login/>
                            </Suspense>
                        }/>
                    </Switch>
                    <Switch>
                        <Route exact path={'/'} render={() =>
                            <Suspense fallback={""}>
                                <SideBar/>
                                <Database/>
                            </Suspense>
                        }/>
                    </Switch>
                    <Switch>
                        <Route exact path={'/student-performance'} render={() =>
                            <Suspense fallback={""}>
                                <SideBar/>
                                <StudentPerformance/>
                            </Suspense>
                        }/>
                    </Switch>
                    <Switch>
                        <Route exact path={'/student-performance-subject'} render={() =>
                            <Suspense fallback={""}>
                                <SideBar/>
                                <StudentPerformanceSubject/>
                            </Suspense>
                        }/>
                    </Switch>
                </Router>
            </div>
    );
}
