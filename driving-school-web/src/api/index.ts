import axios from "axios";
import { Student } from "../Types/student";


const BASE_URL = "https://localhost:7255/"

export const AddStudent = async (student: Student) => {
    try {
        await axios.put(`${BASE_URL}registration`, student);
    }catch(error){
        console.log(error)
    }
}

export const DeleteStudent = async (id: number) => {
    try {
        await axios.delete(`${BASE_URL}registration/?id=${id}`);
    }catch(error){
        console.log(error)
    }
}

export const EditMark = async (id: number, markTitle: ["theory" | "driving"], mark: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) => {
    try {
        await axios.post(`${BASE_URL}registration/mark?id=${id}&markTitle=${markTitle}&mark=${mark}`);
    }catch(error){
        console.log(error)
    }
}

export const SetExamDate = async (id: number, examTitle: ["theory" | "driving"], date: Date) => {
    try {
        await axios.post(`${BASE_URL}registration/exam?id=${id}&examTitle=${examTitle}&date=${date}`);
    }catch(error){
        console.log(error)
    }
}

export const GetAllStudents = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}registration`);
        return data;
    }catch(error){
        console.log(error)
    }
}