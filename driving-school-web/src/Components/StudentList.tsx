import React, { useEffect, useState } from "react";
import { Student } from "../Types/student";
import { Select } from "./Select";
import { EditMark, GetAllStudents, SendEmail } from "../api";
import "../Styles/StudentList.scss";
import { SetExamDate } from "../api";
import DateTimePicker from "react-datetime-picker";

export const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [category, setCategory] = useState<string>("Select Category");
  const [date, setDate] = useState<Date>(new Date());
  const [mark, setMark] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await GetAllStudents();
      setStudents(students);
      console.log(students);
    };
    fetchStudents();
  }, [loading]);

  const getOptions = (students: Student[]): string[] => {
    let options: string[] = ["Select Category"];

    if (students === undefined) {
      return options;
    } else {
      students.forEach((student) => {
        if (!options.includes(student.trainingCategory)) {
          options.push(student.trainingCategory);
        }
      });
      return options;
    }
  };

  const handleSetMarkClick = async (
    student: Student,
    examType: string,
    mark: number
  ) => {
    setLoading(true);
    if (examType === "setDrivingMark") {
      student.drivingMark = mark;
      EditMark(student.id!, ["driving"], mark).then(() => {
        setLoading(false);
      });
    }
    if (examType === "setTheoryMark") {
      student.theoryMark = mark;
      EditMark(student.id!, ["theory"], mark).then(() => {
        setLoading(false);
      });
    }
    setMark(0);
  };

  const handleSetDateClick = async (
    student: Student,
    examType: string,
    date: Date
  ) => {
    setLoading(true);
    if (examType === "setDrivingExam") {
      student.dateOfDrivingExam = date;
      SetExamDate(student.id!, ["driving"], date).then(() => {
        setLoading(false);
      });
    }
    if (examType === "setTheoryExam") {
      student.dateOfTheoryExam = date;
      SetExamDate(student.id!, ["theory"], date).then(() => {
        setLoading(false);
      });
    }
    setDate(new Date());
  };

  return (
    <>
      {students === undefined ? (
        <div> Loading... </div>
      ) : (
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
                              <DateTimePicker
                                onChange={(e) => {
                                  setDate(e as Date);
                                }}
                                value={date}
                              />
                              <button
                                onClick={() => {
                                  handleSetDateClick(
                                    student,
                                    "setDrivingExam",
                                    date
                                  );
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
                              <button
                                onClick={(event) => {
                                  SendEmail(student.id!, ["driving"]).then(
                                    () => {
                                      setLoading(false);
                                    }
                                  );
                                  event.currentTarget.disabled = true;
                                }}>
                                Send Email
                              </button>
                            </div>
                          )}
                        </div>

                        <div>
                          {student.dateOfTheoryExam == undefined ? (
                            <div className="set-button">
                              <DateTimePicker
                                onChange={(e) => setDate(e as Date)}
                                value={date}
                              />
                              <button
                                onClick={() => {
                                  handleSetDateClick(
                                    student,
                                    "setTheoryExam",
                                    date
                                  );
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
                              <button
                                onClick={(event) => {
                                  SendEmail(student.id!, ["theory"]).then(
                                    () => {
                                      setLoading(false);
                                    }
                                  );
                                  event.currentTarget.disabled = true;
                                }}>
                                Send Email
                              </button>
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
                                  setMark(event.target.valueAsNumber!);
                                }}
                              />
                              <button
                                onClick={() => {
                                  handleSetMarkClick(
                                    student,
                                    "setDrivingMark",
                                    mark
                                  );
                                }}>
                                Set Driving mark
                              </button>
                            </div>
                          ) : (
                            <div className="set-button">
                              Driving Mark = {student.drivingMark}
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
                                  setMark(event.target.valueAsNumber!);
                                }}
                              />
                              <button
                                onClick={() => {
                                  handleSetMarkClick(
                                    student,
                                    "setTheoryMark",
                                    mark
                                  );
                                }}>
                                Set theory mark
                              </button>
                            </div>
                          ) : (
                            <div className="set-button">
                              Theory Mark = {student.theoryMark}
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
      )}
    </>
  );
};
