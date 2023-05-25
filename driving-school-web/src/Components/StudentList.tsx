import React, { useEffect, useState } from 'react'
import { Student } from '../Types/student'
import { Select } from './Select';
import { GetAllStudents } from '../api';
import "../Styles/StudentList.scss";

export const StudentList = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [category, setCategory] = useState<string>('Select Category');
    let buttonValue: Date = new Date();

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
            label= "Select training category"
            options = {getOptions(students)}
            selectedValue = {category}
            onChange={(value) =>
            {
                setCategory(value);
            }}
        />
        {students.length > 0 ? (
            <ul className='student-list'>
                {students
                .filter((student) => {
                    return category === "Select Category"
                    ? true
                    : student.trainingCategory === category;
                }
                )
                .map((student) => {
                    return (
                        <li className= 'student-items' key={student.id}>
                            <div>{student.name}</div>
                            <div>{student.lastName}</div>
                            <div>({student.trainingCategory})</div>
                            <div>{student.dateOfDrivingExam == undefined? <div>
                                <input type="date" placeholder='select date' onChange={
                                    (event) => {
                                        buttonValue = event.target.valueAsDate!;
                                    }
                                }/>
                                <button onClick={
                                () => {
                                    student.dateOfDrivingExam = buttonValue;
                                    setStudents([...students]);
                                }
                            }
                            >Set Driving exam date</button>
                            </div> : student.dateOfDrivingExam.toString().substring(0, 10)}</div>

                            <div>{student.dateOfTheoryExam== undefined? <button>Set Theory exam date</button>: student.dateOfTheoryExam.toString()}</div>
                            <div>{student.theoryMark== undefined? <button>Set Theory Mark</button>: student.theoryMark}</div>
                            <div>{student.drivingMark == undefined? <button>Set Driving Mark</button>: student.drivingMark}</div>                            
                        </li>
                    );
                }
                )}
            </ul>
            ): (
                <div> No students found by category: {category} </div>
            )}
    </>
  )
}