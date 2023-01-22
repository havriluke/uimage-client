import React from 'react'
import './plans.scss'

const Plans = () => {
  return (
    <div className="plans">

    <div className="plan">
        <div className="title">Free</div>
            <div className="duration">1 month</div>
            <div className="price">0.00$ / 1 mo</div>
            <ul className="benefits">
                <li>lorem ipsum dolor sit.</li>
                <li>lorem ipsum dolor sit.</li>
                <li>lorem ipsum dolor sit.</li>
            </ul>
        </div>

        <div className="plan">
            <div className="title">Premium</div>
            <div className="duration">1 month</div>
            <div className="price">5.99$ / 1 mo</div>
            <ul className="benefits">
                <li>lorem ipsum dolor sit.</li>
                <li>lorem ipsum dolor sit.</li>
                <li>lorem ipsum dolor sit.</li>
            </ul>
            <div className="button">5.99$</div>
        </div>
        <div className="plan">
            <div className="title">Premium</div>
            <div className="duration">12 months</div>
            <div className="price">3.99$ / 1 mo</div>
            <ul className="benefits">
                <li>lorem ipsum dolor sit.</li>
                <li>lorem ipsum dolor sit.</li>
                <li>lorem ipsum dolor sit.</li>
            </ul>
            <div className="button">47.88$</div>
        </div>

        <div className="plan">
            <div className="title">Premium</div>
            <div className="duration">36 months</div>
            <div className="price">1.99$ / 1 mo</div>
            <ul className="benefits">
                <li>lorem ipsum dolor sit.</li>
                <li>lorem ipsum dolor sit.</li>
                <li>lorem ipsum dolor sit.</li>
            </ul>
            <div className="button">71.64$</div>
        </div>
    </div>
  )
}

export default Plans