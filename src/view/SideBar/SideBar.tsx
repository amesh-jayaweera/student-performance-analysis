import React from "react";
import {SideBarHeader} from "./SideBarHeader";
import {SideBarNavigation} from "./SideBarNavigation";
import {SideBarFooter} from "./SideBarFooter";
import {useHistory} from "react-router";

export function SideBar () {
    const email = localStorage.getItem("email");
    const history = useHistory();
    if(email === undefined || email === '' || email === null) {
        history.push("/login");
    }

    return (
        <nav className="sidebar">
            <SideBarHeader/>
            <SideBarNavigation/>
            <SideBarFooter/>
        </nav>
    );
}
