import React from 'react'
import {category_title, category_content, box, category, checkmark, } from '@/styles/Category.module.css'
const Category = () => {
    return (
        <div class="cat_card">
            <div className={category_title}>Category</div>
            <div className={category_content}>
                <form>
                    <label className={box}>
                        <div className={category}>
                            <input type="radio" name="test" id='one' />
                            <span className={checkmark}>Cafe</span>
                        </div>
                    </label>

                    <label className={box}>
                        <div className={category}>
                            <input type="radio" name="test" id='two' />
                            <span className={checkmark}>Asian Restaurant</span>
                        </div>
                    </label>

                    <label className={box}>
                        <div className={category}>
                            <input type="radio" name="test" id='three' />
                            <span className={checkmark}>Fish And Chips</span>
                        </div>
                    </label>

                    <label className={box}>
                        <div className={category}>
                            <input type="radio" name="test" id='four' />
                            <span className={checkmark}>All</span>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Category
