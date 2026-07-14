"use client"

import React from "react";
import Navbar from "./Navbar";  

interface ILayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
    return (
        <div>
            {children}
        </div>
    );
}

export default Layout;