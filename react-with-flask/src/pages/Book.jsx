import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/book.css";
import "../index.css"
function Book() {
    return (
        <div>
            <NavBar />
            <div className="book-container">
                <div className="hero-container">
                    <h1>Book a Class</h1>
                </div>
                <div className="section-container">
                    <div className="section-title">
                        <h1>Class Schedule</h1>
                    </div>
                    <div className="section-info">
                        <h1>Every Sunday</h1>
                        <p>9:00AM - 12:00PM</p>
                        <p>Weekly Sessions • Year-round enrollment</p>
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-title">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="section-form">
                        <div className="student-form">
                            <div className="student-heading">
                                <h2>Student 1</h2>
                                <img className="addremove-student" src="../src/assets/Icons/Book/add-icon.png" alt="add icon"/>
                            </div>
                            <form>
                                <label>First Name
                                    <input type="text">
                                    </input>
                                </label>
                                <label>Last Name
                                    <input type="text">
                                    </input>
                                </label>
                                <label>Age
                                    <input type="text">
                                    </input>
                                </label>
                                <label>Phone Number
                                    <input type="text">
                                    </input>
                                </label>
                                <label className="select-label"> Lesson Type
                                    <select>
                                        <option>Beginner Course</option>
                                        <option>Intermediate Course</option>
                                        <option>Advanced Course</option>
                                        <option>Heritage Speaker</option>
                                        <option>HSK Exam Prep</option>
                                        <option>One-on-One Tutoring</option>
                                    </select>
                                </label>
                            </form>
                        </div>
                        <button className="submit-button">Submit Registration</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Book