import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'
import FAQ from '../components/Faq';
import '../styles/home.css'

function Home() {
    return (
        <div>
            <NavBar />
            <div className="home-container">
                <div className="hero-section">
                    <img className="hero-img" src="../src/assets/home-landing.png" alt="hero img" />
                    <div className='hero-text'>
                        <h1>Looking to improve your child's English level?</h1>
                        <hr className='rounded' />
                        <h2>Expert English tuition that helps children build confidence, improve their skills, and enjoy learning.</h2>
                    </div>
                </div>
                <div className="offer-section">
                    <div className='offer'>
                        <img src='../src/assets/Icons/Home/rocket.png' alt='rocket' />
                        <div className='offer-text'>
                            <h3>Fast Progress</h3>
                            <p>Structured lessons designed to help your child build confidence and improve their Mandarin skills step by step.</p>
                        </div>
                    </div>
                    <div className='offer'>
                        <img src='../src/assets/Icons/Home/award.png' alt='award' />
                        <div className='offer-text'>
                            <h3>Rewarding Progress</h3>
                            <p>Regular feedback and encouragement ensure your child stays motivated and proud of their achievements.</p>
                        </div>
                    </div>
                    <div className='offer'>
                        <img src='../src/assets/Icons/Home/id.png' alt='id' />
                        <div className='offer-text'>
                            <h3>Qualified Teaching</h3>
                            <p>Lessons are delivered by experienced educators who understand how to make Mandarin engaging and accessible.</p>
                        </div>
                    </div>
                    <div className='offer'>
                        <img src='../src/assets/Icons/Home/idea.png' alt='idea' />
                        <div className='offer-text'>
                            <h3>Inspiring Curiosity</h3>
                            <p>We encourage children to ask questions, explore new ideas, and develop a genuine interest in learning Mandarin.</p>
                        </div>
                    </div>
                    <div className='offer'>
                        <img src='../src/assets/Icons/Home/notebook.png' alt='notebook' />
                        <div className='offer-text'>
                            <h3>Structured Learning</h3>
                            <p>Carefully planned lessons that develop speaking, listening, reading, and writing skills at a pace that suits your child.</p>
                        </div>
                    </div>
                    <div className='offer'>
                        <img src='../src/assets/Icons/Home/phone.png' alt='phone' />
                        <div className='offer-text'>
                            <h3>Ongoing Support</h3>
                            <p>Questions don't stop when the lesson ends. We're here to provide guidance and support throughout your child's learning journey.</p>
                        </div>
                    </div>
                </div>
                <div className='journey-section'>
                    <h1>Learning Journey</h1>
                    <img src='../src/assets/progress.png' alt='progress' />
                </div>
                <FAQ />
            </div>
            <Footer />
        </div>

    )
}

export default Home