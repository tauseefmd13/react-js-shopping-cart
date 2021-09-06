import React from 'react';

const Footer = () => {
    return (
        <>
            <footer className="text-dark py-3">
                <p className="text-center">
                    Copyright &copy; {new Date().getFullYear()}. All rights reserved.
                </p>
            </footer>
        </>
    )
}

export default Footer;
