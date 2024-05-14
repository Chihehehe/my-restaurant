import React from 'react'
import {price_title, price_content, price_box, price, check} from '@/styles/Delivery.module.css'
const Delivery = () => {
    return (
        <div class="price_card">
            <div className={price_title}>Delivery Fee</div>
            <div className={price_content}>
                <form>
                    <label className={price_box}>
                        <div className={price}>
                            <input type="radio" name="test" id='input1' />
                            <span className={check}>$0-$5</span>
                        </div>
                    </label>

                    <label className={price_box}>
                        <div className={price}>
                            <input type="radio" name="test" id='input2' />
                            <span className={check}>$5-$10</span>
                        </div>
                    </label>

                    <label className={price_box}>
                        <div className={price}>
                            <input type="radio" name="test" id='input3' />
                            <span className={check}>Over $10</span>
                        </div>
                    </label>

                    <label className={price_box}>
                        <div className={price}>
                            <input type="radio" name="test" id='input4' />
                            <span className={check}>All</span>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Delivery
