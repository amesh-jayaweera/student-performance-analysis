import React from "react";


export function SideBarNavigation () {
    return (
        <ul className="sidebar-list">

            <li className="sidebar-list__item">
                <a href={"/"} className="sidebar-list__item-link"
                >
                    <span className="sidebar-list__item-link--icon"><i className="fas fa-database fa-lg"></i></span>
                    <span className="sidebar-list__item-link--text">Student Marks</span>
                </a>
            </li>

            <li className="sidebar-list__item">
                <a href={"/student-performance"} className="sidebar-list__item-link"
                >
                    <span className="sidebar-list__item-link--icon"><i className="fas fa-newspaper fa-lg"></i></span>
                    <span className="sidebar-list__item-link--text">Performance Analysis By Student</span>
                </a>
            </li>

            <li className="sidebar-list__item">
                <a href={"/student-performance-subject"} className="sidebar-list__item-link"
                >
                    <span className="sidebar-list__item-link--icon"><i className="fas fa-newspaper fa-lg"></i></span>
                    <span className="sidebar-list__item-link--text">Performance Analysis By Subject</span>
                </a>
            </li>
        </ul>
    );
}
