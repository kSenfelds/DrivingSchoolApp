import React, { useEffect, useState } from "react";
import { Student } from "../Types/student";
import { Select } from "./Select";
import { GetAllStudents } from "../api";
import "../Styles/StudentList.scss";

export const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [category, setCategory] = useState<string>("Select Category");
  let buttonValue: Date = new Date();
  let numberButtonValue: number = 0;

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await GetAllStudents();
      setStudents(students);
      console.log(students);
    };
    fetchStudents();
  }, []);

  const getOptions = (students: Student[]): string[] => {
    let options: string[] = ["Select Category"];
    students.forEach((student) => {
      if (!options.includes(student.trainingCategory)) {
        options.push(student.trainingCategory);
      }
    });
    return options;
  };

  return (
    <>
      <h2>Student List</h2>
      <Select
        label="Select training category"
        options={getOptions(students)}
        selectedValue={category}
        onChange={(value) => {
          setCategory(value);
        }}
      />
      {students.length > 0 ? (
        <ul className="list-group">
          {students
            .filter((student) => {
              return category === "Select Category"
                ? true
                : student.trainingCategory === category;
            })
            .map((student) => {
              return (
                <li className="list-group-item" key={student.id}>
                  <div className="list-item-text">
                    {student.name}
                    <br />
                    {student.lastName}
                    (Category = {student.trainingCategory})
                  </div>
                  <div className="list-item-buttons">
                    <div>
                      {student.dateOfDrivingExam == undefined ? (
                        <div className="set-button">
                          <input
                            type="date"
                            placeholder="select date"
                            onChange={(event) => {
                              buttonValue = event.target.valueAsDate!;
                            }}
                          />
                          <button
                            onClick={() => {
                              student.dateOfDrivingExam = buttonValue;
                              setStudents([...students]);
                            }}>
                            Set Driving exam date
                          </button>
                        </div>
                      ) : (
                        <div className="set-button">
                          Driving exam -{" "}
                          {student.dateOfDrivingExam
                            .toString()
                            .substring(0, 10)}
                          <button onClick={() => {}}>Send Email</button>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      {student.dateOfTheoryExam == undefined ? (
                        <div className="set-button">
                          <input
                            type="date"
                            placeholder="select date"
                            onChange={(event) => {
                              buttonValue = event.target.valueAsDate!;
                            }}
                          />
                          <button
                            onClick={() => {
                              student.dateOfTheoryExam = buttonValue;
                              setStudents([...students]);
                            }}>
                            Set Theory exam date
                          </button>
                        </div>
                      ) : (
                        <div className="set-button">
                          Theory exam -{" "}
                          {student.dateOfTheoryExam
                            .toString()
                            .substring(0, 10)}
                          <button onClick={() => {}}>Send Email</button>
                        </div>
                      )}
                    </div>

                    
                    <div>
                      {student.drivingMark == undefined ? (
                        <div className="set-button">
                          <input
                            type="number"
                            placeholder="driving mark"
                            onChange={(event) => {
                              numberButtonValue = event.target.valueAsNumber!;
                            }}
                          />
                          <button
                            onClick={() => {
                              student.drivingMark = numberButtonValue;
                              setStudents([...students]);
                            }}>
                            Set Driving mark
                          </button>
                        </div>
                      ) : (
                        <div className="set-button">
                          Driving Mark = {" "}
                          {student.drivingMark}
                          <button onClick={() => {}}>Send Email</button>
                        </div>
                      )}
                    </div>
                    <div>
                      {student.theoryMark == undefined ? (
                        <div className="set-button">
                          <input
                            type="number"
                            placeholder="theory mark"
                            onChange={(event) => {
                              numberButtonValue = event.target.valueAsNumber!;
                            }}
                          />
                          <button
                            onClick={() => {
                              student.theoryMark = numberButtonValue;
                              setStudents([...students]);
                            }}>
                            Set theory mark
                          </button>
                        </div>
                      ) : (
                        <div className="set-button">
                          Theory Mark = {" "}
                          {student.theoryMark}
                          <button onClick={() => {}}>Send Email</button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      ) : (
        <div> No students found by category: {category} </div>
      )}
    </>
  );
};
