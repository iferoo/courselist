import React, { Component } from "react";
import CourseForm from "./components/CourseForm/CourseForm";
import CourseList from "./components/CourseList/CourseList";

class App extends Component {
  state = {
    courses: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "jQuery" },
      { name: "C++" },
    ],
    current: "",
    messegeError: false,
  };

  updateCourse = (e) => {
    this.setState({
      current: e.target.value,
    });
  };

  addCourse = (e) => {
    e.preventDefault();
    let { courses, current } = this.state;
    current === ""
      ? this.setState({ messegeError: !this.state.messegeError })
      : courses.push({ name: current });

    this.setState({ courses, current: "" });
  };

  deleteCourse = (index) => {
    let courses = this.state.courses;
    courses.splice(index, 1);
    this.setState({ courses });
  };

  editCourse = (index, value) => {
    let { courses } = this.state;
    let course = courses[index];
    course["name"] = value;
    this.setState({
      courses,
    });
  };
  render() {
    const { courses } = this.state;
    const courseList = courses.map((course, index) => {
      return (
        <CourseList
          details={course}
          key={index}
          index={index}
          deleteCourse={this.deleteCourse}
          editCourse={this.editCourse}
        />
      );
    });
    return (
      <section className="App">
        <h2>Add Courses</h2>
        {this.state.messegeError === false ? (
          <CourseForm
            updateCourse={this.updateCourse}
            addCourse={this.addCourse}
            current={this.state.current}
          />
        ) : (
          <div><p>There is no value</p>
          <button onClick={() => this.setState({ messegeError: !this.state.messegeError })}>&times;</button>
          </div>
        )}

        <ul>
          {this.state.courses.length === 0 ? (
            <p>There is no Course</p>
          ) : (
            courseList
          )}
        </ul>
      </section>
    );
  }
}

export default App;
