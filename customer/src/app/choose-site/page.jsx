import React from 'react';
import Link from 'next/link'
import { wrapper, state, buttonContainer, customer, button, button1, button2 } from "@/styles/ChooseSite.module.css"

function ChooseSite() {
    return (
        <div className={wrapper}>
            <div className={state}>LOGIN/ SIGNUP AS...</div>
            <div className={buttonContainer}>
                <div className={customer}>
                    <Link href="/login">
                        <button className={`${button} ${button1}`}>Customer</button>
                    </Link>
                </div>
                <div className="restaurant">
                    <Link href="/login">
                        <button className={`${button} ${button2}`}>Restaurant</button>
                    </Link>
                </div>
            </div >
        </div >
    );
}

export default ChooseSite;